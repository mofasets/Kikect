import React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

function getNestedValue(object, field) {
  if (!field || !object) return null
  return field.split('.').reduce((item, key) => (item ? item[key] : undefined), object)
}

export default function ModelTable({ value, columns, paginator = true, rows = 10, onRowClick }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '100%',
        overflowX: 'auto',
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <Table size="small" sx={{ minWidth: 650, tableLayout: 'auto' }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.field ?? column.header}
                sx={{
                  ...column.style,
                  typography: 'subtitle2',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  px: 3,
                  py: 1.5,
                  borderBottom: 1,
                  borderColor: 'divider',
                  bgcolor: 'primary.listItemHover',
                  color: 'text.primary',
                }}
              >
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {value.slice(0, paginator ? rows : value.length).map((row, rowIndex) => (
            <TableRow
              key={row.id ?? row.name ?? rowIndex}
              hover
              onClick={() => onRowClick?.(row)}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                cursor: onRowClick ? 'pointer' : 'default',
              }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.field ?? column.header}
                  sx={{
                    ...column.style,
                    typography: 'body2',
                    px: 3,
                    py: 1.5,
                    borderBottom: 1,
                    borderColor: 'divider',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {column.body ? column.body(row) : getNestedValue(row, column.field)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
