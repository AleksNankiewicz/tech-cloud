'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'

// export async function getServerData() {
//   const rows = await getUsers()
//   console.log(rows)
//   return rows
// }
import { Button } from '@mui/material'
import { removeWork } from '@/lib/data'

export default function WorksDataGrid({ rows, setRows }) {
  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'Tutuł',
      width: 150,
    },
    {
      field: 'author',
      headerName: 'Autor',
      width: 150,
    },

    {
      field: 'createdAt',
      headerName: 'Data publikacji',
      width: 150,

      type: 'date',
    },
    {
      field: 'actions', // Field for the button cell
      headerName: 'Actions',
      width: 150,
      renderCell: (
        params // Define the button cell's content
      ) => (
        <Button
          className="text-red-600"
          onClick={() => handleButtonClick(params.row._id)}
        >
          Usuń
        </Button>
      ),
    },
  ]

  const handleButtonClick = async (id) => {
    // Handle button click here
    await removeWork(id)
  }

  const rowsWithId = rows.map((row) => ({
    ...row,
    id: row._id,
  }))
  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rowsWithId}
        columns={columns}
        style={{ backgroundColor: 'white' }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 9,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  )
}
