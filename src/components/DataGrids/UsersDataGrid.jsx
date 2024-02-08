'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
  { field: '_id', headerName: 'ID', width: 90 },
  {
    field: 'username',
    headerName: 'username',
    width: 150,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Pełne imię',
    width: 150,
    editable: true,
  },
  {
    field: 'class',
    headerName: 'Klasa',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'email',

    width: 150,
    editable: true,
  },

  {
    field: 'createdAt',
    headerName: 'Data dołączenia',
    width: 150,
    editable: true,
    type: 'date',
    // renderCell: (params) => {
    //   return params.value.slice(0, 7)
    // },
  },

  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
]

export default function UsersDataGrid({ rows }) {
  // console.log(rows)

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
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  )
}
