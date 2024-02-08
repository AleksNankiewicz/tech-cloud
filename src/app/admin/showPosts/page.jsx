'use client'
import WorksDataGrid from '@/components/DataGrids/WorksDataGrid'
import { getUsers, getWorks } from '@/lib/data'
import { useState, useEffect } from 'react'

const ShowWorksPage = () => {
  const [rows, setRows] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedRows = await getWorks()
      const fetchedUsers = await getUsers()

      setRows(fetchedRows)
      setUsers(fetchedUsers)
    }

    fetchData()
  }, [])

  const newRows = rows.map((row) => {
    const author = users.find((user) => user._id === row.userId)
    return {
      ...row,
      author: author ? author.fullName : '', // If author exists, set fullName, otherwise set an empty string
    }
  })
  console.log(rows[0])
  console.log(newRows[0])

  return (
    <div>
      <WorksDataGrid rows={newRows} />
    </div>
  )
}

export default ShowWorksPage
