import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import MenuIcon from '@mui/icons-material/Menu'
import Logo from '../assets/logo.png'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import PeopleIcon from '@mui/icons-material/People'
import WorkIcon from '@mui/icons-material/Work'
import SettingsIcon from '@mui/icons-material/Settings'
import HistoryIcon from '@mui/icons-material/History'
import LockIcon from '@mui/icons-material/Lock'

const drawerWidth = 240
const collapsedWidth = 72

const navItems = [
  { label: 'Resumen', to: '/', icon: DashboardIcon },
  { label: 'Tickets', to: '/tickets', icon: ConfirmationNumberIcon },
  { label: 'Usuarios', to: '/users', icon: PeopleIcon },
  { label: 'Roles', to: '/roles', icon: WorkIcon },
  { label: 'Acciones', to: '/actions', icon: SettingsIcon },
  { label: 'Historial', to: '/historial', icon: HistoryIcon },
  { label: 'Permisos', to: '/permisos', icon: LockIcon },
]

export default function Sidebar({ open = true, onToggle }) {
  const location = useLocation()
  const width = open ? drawerWidth : collapsedWidth

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width,
            boxSizing: 'border-box',
            transition: (theme) => theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
          },
        }}
      >
        <Toolbar sx={{ justifyContent: open ? 'space-between' : 'center', px: 2 }}>
          {open ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                component="img"
                sx={{ height: 40, width: 'auto' }}
                alt="Logo de la empresa"
                src={Logo}
              />
              <Typography variant="h6" noWrap component="div" sx={{ color: 'primary.main' }}>
                Kikect
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>  </Box>
          )}

          <Tooltip title={open ? 'Cerrar menú' : 'Abrir menú'}>
            <IconButton onClick={onToggle} edge="end" size="small" sx={{ justifyContent: 'center' }}>
              {open ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>

        <List>
          {navItems.map((item) => (
            <ListItem key={item.to} disablePadding sx={{ display: 'block' }}>
              <Tooltip title={open ? '' : item.label} placement="right" disableHoverListener={open}>
                <ListItemButton
                  component={NavLink}
                  to={item.to}
                  selected={location.pathname === item.to}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    alignItems: 'center',
                    px: 2,
                    color: 'primary.listItem',
                    '&.Mui-selected': { 
                      bgcolor: 'primary.main', 
                      color: 'common.white' ,
                      '&:hover': { bgcolor: 'primary.listItemHover', color: 'primary.listItem' },
                    },
                    '&:hover': {
                      bgcolor: 'primary.listItemHover'
                   },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 0, mr: open ? 3 : '0px', justifyContent: 'center' }}>
                    {(() => {
                      const IconComp = item.icon && (item.icon.default || item.icon)
                      return IconComp ? <IconComp /> : null
                    })()}
                  </ListItemIcon>
                  {open && (
                    <ListItemText 
                      primary={item.label} 
                      sx={{ 
                        opacity: 1, 
                        transition: 'opacity 0.2s',
                      }} 
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>

        <Box sx={{ px: 2, py: 1, mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: open ? 2 : 0, justifyContent: open ? 'flex-start' : 'center' }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>K</Avatar>
            <Box sx={{ opacity: open ? 1 : 0, transition: 'opacity 0.2s', width: open ? 'auto' : 0, overflow: 'hidden' }}>
              <Typography variant="h6">Kikect</Typography>
              <Typography variant="caption" color="text.secondary">
                Administrador
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  )
}
