import UsersDataGrid from '@/components/DataGrids/UsersDataGrid'
import { getUsers } from '@/lib/data'
import React from 'react'

const ShowUsersPage = async () => {
  const rows = await getUsers()

  return (
    <div>
      <UsersDataGrid rows={rows} />
    </div>
  )
}

export default ShowUsersPage
