import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      min: 3,
      max: 40,
    },
    fullName: {
      type: String,

      min: 3,
      max: 40,
    },
    desc: {
      type: String,

      min: 3,
    },

    class: {
      type: String,

      max: 10,
    },
    tags: {
      type: Array,
    },

    password: {
      type: String,
      required: true,
      min: 6,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)
const workSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    desc: {
      type: String,
    },
    tags: {
      type: Array,
    },

    link: {
      type: String,
      min: 6,
    },
    img: {
      type: Array,
    },
    userId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)
export const User = mongoose.models.User || mongoose.model('User', userSchema)
export const Work = mongoose.models.Work || mongoose.model('Work', workSchema)
