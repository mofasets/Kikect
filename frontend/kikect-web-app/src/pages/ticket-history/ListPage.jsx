import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import ModelTable from '../../components/ModelTable'
import { ticketHistories } from '../../data/sampleData'
import CreateButton from '../../components/CreateButton'

const columns = [
  { field: 'code', header: 'Código' },
  { field: 'ticket.name', header: 'Ticket' },
  { field: 'user.name', header: 'Usuario' },
  { field: 'previous_state', header: 'Estado previo' },
  { field: 'new_state', header: 'Estado nuevo' },
  { field: 'comments', header: 'Comentarios' },
]

export default function TicketHistoryListPage() {
  const navigate = useNavigate()

  return (
    <section className="space-y-6">
      <PageHeader title="Historial de tickets" action={<CreateButton label="Crear Registro" onClick={() => navigate('/historial/nuevo')} />} />
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <ModelTable value={ticketHistories} columns={columns} rows={8} onRowClick={(row) => navigate(`${row.id}`)} />
      </div>
    </section>
  )
}
