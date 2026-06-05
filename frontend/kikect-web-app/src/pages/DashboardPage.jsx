import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import CreateButton from '../components/CreateButton'
import SummaryGrid from '../components/SummaryGrid'
import ModelTable from '../components/ModelTable'
import PageHeader from '../components/PageHeader'
import { ticketStateBody } from '../components/StatusTag'
import { tickets, users, roles, actions, ticketHistories, roleActions } from '../data/sampleData'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import PeopleIcon from '@mui/icons-material/People'
import WorkIcon from '@mui/icons-material/Work'
import SettingsIcon from '@mui/icons-material/Settings'
import HistoryIcon from '@mui/icons-material/History'
import LockIcon from '@mui/icons-material/Lock'

export default function DashboardPage() {
  const summary = [
    { label: 'Tickets', value: tickets.length, icon: <ConfirmationNumberIcon fontSize="small" />, color: 'cyan' },
    { label: 'Usuarios', value: users.length, icon: <PeopleIcon fontSize="small" />, color: 'teal' },
    { label: 'Roles', value: roles.length, icon: <WorkIcon fontSize="small" />, color: 'purple' },
    { label: 'Acciones', value: actions.length, icon: <SettingsIcon fontSize="small" />, color: 'orange' },
    { label: 'Historial', value: ticketHistories.length, icon: <HistoryIcon fontSize="small" />, color: 'blue' },
    { label: 'Permisos', value: roleActions.length, icon: <LockIcon fontSize="small" />, color: 'pink' },
  ]

  const columns = [
    { field: 'code', header: 'Código' },
    { field: 'name', header: 'Ticket' },
    { field: 'state', header: 'Estado', body: ticketStateBody },
    { field: 'requester.name', header: 'Solicitante' },
    { field: 'technical.name', header: 'Técnico' },
  ]

  return (
    <Box sx={{ display: 'grid', gap: 4 }}>
      <PageHeader title="Resumen del sistema"  />
      <SummaryGrid items={summary} />

      <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', xl: '1.2fr 1fr' } }}>
        <Card sx={{ borderRadius: 3, border: 1, borderColor: 'divider', boxShadow: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Actividad reciente
            </Typography>
            <Typography color="text.secondary" paragraph>
              Vistas de ejemplo para los modelos de FastAPI con datos de prueba.
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="Dashboard con métricas rápidas." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Tablas para cada entidad con Material UI." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Estructura modular de componentes y páginas." />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3, border: 1, borderColor: 'divider', boxShadow: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Tickets recientes
            </Typography>
            <ModelTable value={tickets.slice(0, 5)} columns={columns} paginator={false} rows={5} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
