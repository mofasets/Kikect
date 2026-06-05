import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import {React, useState} from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import HomeIcon from '@mui/icons-material/Home'
import { tickets, users, roles, actions, ticketHistories, roleActions } from '../data/sampleData'

const drawerWidth = 240
const collapsedWidth = 72
const breadcrumbNameMap = {
  '': 'Inicio',
  tickets: 'Tickets',
  users: 'Usuarios',
  roles: 'Roles',
  actions: 'Acciones',
  historial: 'Historial',
  permisos: 'Permisos',
  nuevo: 'Nuevo',
}

const breadcrumbItemsBySegment = {
  tickets,
  users,
  roles,
  actions,
  historial: ticketHistories,
  permisos: roleActions,
}

const findCodeForId = (segment, id) => {
  const items = breadcrumbItemsBySegment[segment]
  if (!items) return null
  const item = items.find((record) => record.id === Number(id))
  return item?.code || null
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const currentWidth = sidebarOpen ? drawerWidth : collapsedWidth
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${currentWidth}px)`, ml: `${currentWidth}px`, backgroundColor: '#fff', color: 'text.primary' }}
        elevation={1}
      >
        <Toolbar 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            justifyContent: 'center', 
            gap: 1, 
            py: 1 
          }}
        >

          <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'text.secondary' }}>
            <Link component={RouterLink} to="/" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
              <HomeIcon sx={{ mr: 0.5, fontSize: 18, color: 'secondary.main'}} />
            </Link>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1
              const to = `/${pathnames.slice(0, index + 1).join('/')}`
              const previous = pathnames[index - 1]
              const isIdSegment = /^\d+$/.test(value)
              const name = isIdSegment ? findCodeForId(previous, value) || value : breadcrumbNameMap[value] || value
              return last ? (
                <Typography key={to} color="text.secondary">
                  {name}
                </Typography>
              ) : (
                <Link key={to} component={RouterLink} to={to} color="secondary.main" underline='none'>
                  {name}
                </Link>
              )
            })}
          </Breadcrumbs>
        </Toolbar>
      </AppBar>

      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((open) => !open)} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${currentWidth}px)`, backgroundColor: 'primary.background' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}
