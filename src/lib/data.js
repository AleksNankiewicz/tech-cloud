'use server'
import { redirect } from 'next/dist/server/api-utils'
import { User, Work } from './models'
import { connectToDb } from './utils'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { app } from './firebase'

import { signIn } from 'next-auth/react'

import { unstable_noStore as noStore } from 'next/cache'

import bcrypt from 'bcrypt'

export const getWorks = async () => {
  noStore()
  try {
    connectToDb()
    const works = await Work.find()
    return works
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch works!')
  }
}

export const getWork = async (slug) => {
  try {
    connectToDb()

    const work = await Work.findOne({ slug })
    return work
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch single work!')
  }
}
export const getUserByUsername = async (username) => {
  try {
    connectToDb()
    const user = await User.findOne({ username })
    return user
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch single user by name!')
  }
}

export const getUser = async (id) => {
  try {
    connectToDb()
    const user = await User.findById(id)
    return user || null
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch user!')
  }
}
export const getUsers = async () => {
  noStore()

  try {
    connectToDb()
    const users = await User.find()
    return users
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch works!')
  }
}

export const getUserWorks = async (id) => {
  try {
    connectToDb()
    const user = await Work.find({ userId: id })
    return user
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch single user by name!')
  }
}

export const getUserByEmail = async (emial) => {
  try {
    connectToDb()
    const user = await User.find({ email: emial })
    return user
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch user by email!')
  }
}

export const addUser = async (formData) => {
  'use server'
  const { username, fullName, password } = Object.fromEntries(formData)

  try {
    connectToDb()

    const user = new User({
      username,
      fullName,
      password,
    })

    await user.save()
    console.log('saved to db')
  } catch (err) {
    console.log(err)
  }
}

export const removeUser = async (formData) => {
  'use server'

  const { username } = Object.fromEntries(formData)

  try {
    connectToDb()
    await User.findOneAndDelete({ username })

    console.log('user delated')
  } catch (err) {
    console.log(err)
  }
}
export const removeWork = async (id) => {
  'use server'

  try {
    connectToDb()
    await Work.findByIdAndDelete(id)

    console.log('work delated')
  } catch (err) {
    console.log(err)
  }
}

export const addWork = async (previousState, formData) => {
  'use server'
  const {
    title,
    desc,
    userId,
    slug,
    img1,
    img2,
    img3,
    img4,
    img5,
    tag1,
    tag2,
    tag3,
    tag4,
    tag5,
    tag6,
    tag7,
    tag8,
    tag9,
    tag10,
  } = Object.fromEntries(formData)

  const images = [img1, img2, img3, img4, img5].filter(
    (img) => img.name !== 'undefined' && img !== ''
  )

  console.log(images)

  const tags = [
    tag1,
    tag2,
    tag3,
    tag4,
    tag5,
    tag6,
    tag7,
    tag8,
    tag9,
    tag10,
  ].filter((tag) => tag !== null && tag !== '')

  if (!title) return { error: 'Praca musi zawierać tytuł' }
  if (title.length < 3 || title.length > 30) {
    return {
      error: 'Tutuł musi zkładać się od 3 do 30 liter',
    }
  }

  const storage = getStorage(app)

  const imgUpload = (img) => {
    const storageRef = ref(storage, img.name + Math.floor(Math.random * 999))
    const uploadTask = uploadBytesResumable(storageRef, img)

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          reject(error)
        },
        async () => {
          try {
            const imgUrl = await getDownloadURL(uploadTask.snapshot.ref)
            console.log(imgUrl)
            resolve(imgUrl)
          } catch (error) {
            reject(error)
          }
        }
      )
    })
  }

  try {
    let imgUrls = images && (await Promise.all(images.map(imgUpload)))

    console.log(imgUrls)

    connectToDb()

    const work = new Work({
      title,
      desc,
      userId,
      slug: Math.floor(Math.random() * 9999999999999),
      img: imgUrls,
      tags: tags,
    })
    await work.save()
    console.log('work created')

    return { succes: 'Praca Stworzona' }
  } catch (err) {
    console.log(err)
  }
}

export const editUser = async (previousState, formData) => {
  const {
    fullName,
    password,
    userId,
    img,
    desc,
    tag1,
    tag2,
    tag3,
    tag4,
    tag5,
    tag6,
    tag7,
    tag8,
    tag9,
    tag10,
  } = Object.fromEntries(formData)
  if (password) {
    if (password.length < 5) {
      return { error: 'Hasło musi się składać z minimum 5 znaków' }
    }
  }

  const tags = [
    tag1,
    tag2,
    tag3,
    tag4,
    tag5,
    tag6,
    tag7,
    tag8,
    tag9,
    tag10,
  ].filter((tag) => tag !== null && tag !== '')

  const storage = getStorage(app)
  const storageRef = ref(storage, img.name + Math.floor(Math.random * 999))
  const uploadTask = uploadBytesResumable(storageRef, img)

  let imgUrl = ''

  const imgUpload = () => {
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          reject(error)
        },
        async () => {
          try {
            imgUrl = await getDownloadURL(uploadTask.snapshot.ref)

            resolve(imgUrl)
          } catch (error) {
            reject(error)
          }
        }
      )
    })
  }

  try {
    if (img.name !== 'undefined') {
      await imgUpload()
    }
    connectToDb()
    const user = await User.findById(userId)

    if (password) {
      if (password.length < 5) {
        return { error: 'Hasło musi się składać z minimum 5 znaków' }
      }

      const salt = await bcrypt.genSalt(10) // Generate salt asynchronously

      const hashedPassword = await bcrypt.hash(password, salt)

      user.password = hashedPassword
    }
    if (desc) user.desc = desc
    if (img.name !== 'undefined') user.img = imgUrl
    if (tags) user.tags = tags
    if (fullName) user.fullName = fullName
    await user.save()

    //  return user

    return { succes: 'Konto edytowane' }
  } catch (err) {
    console.log(err)
    throw new Error('eafaewfdea ')
  }
}

export const register = async (previousState, formData) => {
  const { username, password, email } = Object.fromEntries(formData)

  if (username.length < 5) {
    return { error: 'Nazwa użytkownika musi składać się z minimum 5 znaków' }
  }
  if (password.length < 5) {
    return { error: 'Hasło musi składać się z minimum 5 znaków' }
  }
  if (email.length < 5) {
    return { error: 'Błędny email' }
  }

  const isUsername = await getUserByUsername(username)

  if (isUsername) {
    return { error: 'Użytkownik o tej nazwie już istnieje' }
  }

  try {
    connectToDb()

    const salt = await bcrypt.genSalt(10) // Generate salt asynchronously

    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    console.log('account created')

    return { succes: 'Teraz możesz się zalogować!' }

    console.log('user logged')
  } catch (err) {
    console.log('cannot create account')
    throw new Error(err)
  }
}
