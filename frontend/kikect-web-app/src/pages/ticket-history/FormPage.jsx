import { useParams, useNavigate, useLocation } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Box from '@mui/material/Box'
import TextInput from '../../components/inputs/TextInput'
import TextareaInput from '../../components/inputs/TextareaInput'
import ReadOnlyInput from '../../components/inputs/ReadOnlyInput'
import FormButtons from '../../components/inputs/FormButtons'
import CodeHeader from '../../components/inputs/CodeHeader'
import Button from '@mui/material/Button'
import { ticketHistories } from '../../data/sampleData'

export default function TicketHistoryFormPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const isNew = id === 'nuevo' || location.pathname.endsWith('/nuevo')
  const history = isNew ? null : ticketHistories.find((item) => item.id === Number(id))

  if (!isNew && !history) {
    return (
      <section className="space-y-6">
        <PageHeader title="Registro no encontrado" />
        <Button variant="contained" onClick={() => navigate('/historial')}>
          Volver
        </Button>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <PageHeader title={isNew ? 'Crear Historial' : 'Editar Historial'} />
      <Box component="form" noValidate autoComplete="off" sx={{ display: 'grid', gap: 2 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 2, width: '100%', maxWidth: 1120, mx: 'auto', overflowY: 'auto', p: 3, bgcolor: 'background.paper', borderRadius: 3, border: 1, borderColor: 'divider' }}>
          <CodeHeader value={isNew ? 'Nuevo' : history.code} sx={{ gridColumn: 'span 2', justifySelf: 'start' }} />
          <TextInput label="Ticket" defaultValue={isNew ? '' : history.ticket?.name} disabled />
          <TextInput label="Usuario" defaultValue={isNew ? '' : history.user?.name} disabled />
          <TextInput label="Estado previo" defaultValue={isNew ? '' : history.previous_state} />
          <TextInput label="Estado nuevo" defaultValue={isNew ? '' : history.new_state} />
          <TextareaInput label="Comentarios" defaultValue={isNew ? '' : history.comments} />
          <Box sx={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'center', mt: 2 }}>
            <FormButtons onCancel={() => navigate('/historial')} />
          </Box>
        </Box>
      </Box>
    </section>
  )
}
