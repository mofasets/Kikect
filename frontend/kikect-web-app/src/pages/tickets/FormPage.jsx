import { useParams, useNavigate, useLocation } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Box from '@mui/material/Box'
import TextInput from '../../components/inputs/TextInput'
import TextareaInput from '../../components/inputs/TextareaInput'
import ReadOnlyInput from '../../components/inputs/ReadOnlyInput'
import FormButtons from '../../components/inputs/FormButtons'
import CodeHeader from '../../components/inputs/CodeHeader'
import Button from '@mui/material/Button'
import { tickets } from '../../data/sampleData'

export default function TicketsFormPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const isNew = id === 'nuevo' || location.pathname.endsWith('/nuevo')
  const ticket = isNew ? null : tickets.find((item) => item.id === Number(id))

  if (!isNew && !ticket) {
    return (
      <section className="space-y-6">
        <PageHeader title="Ticket no encontrado" />
        <Button variant="contained" onClick={() => navigate('/tickets')}>
          Volver
        </Button>
      </section>
    )
  }

    return (
      <section className="space-y-6">
        <PageHeader title={isNew ? 'Crear Ticket' : 'Editar Ticket'} />
        <Box component="form" noValidate autoComplete="off" sx={{ display: 'grid', gap: 2 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 2, width: '100%', maxWidth: 1120, mx: 'auto', overflowY: 'auto', p: 3, bgcolor: 'background.paper', borderRadius: 3, border: 1, borderColor: 'divider' }}>
            <CodeHeader value={isNew ? 'Nuevo' : ticket.code} sx={{ gridColumn: 'span 2', justifySelf: 'start' }} />
            <TextInput label="Asunto" defaultValue={isNew ? '' : ticket.name} />
            <TextareaInput label="Descripción" defaultValue={isNew ? '' : ticket.description} />
            <TextInput label="Solicitante" defaultValue={isNew ? '' : ticket.requester?.name} disabled />
            <TextInput label="Técnico" defaultValue={isNew ? '' : ticket.technical?.name} disabled />
            <TextInput label="Estado" defaultValue={isNew ? '' : ticket.state} />
            <Box sx={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'center', mt: 2 }}>
              <FormButtons onCancel={() => navigate('/tickets')} />
            </Box>
          </Box>
        </Box>
      </section>
    )
}
