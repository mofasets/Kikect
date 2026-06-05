import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import ModelTable from '../../components/ModelTable'
import { ticketStateBody } from '../../components/StatusTag'
import { tickets } from '../../data/sampleData'
import CreateButton from '../../components/CreateButton'

const columns = [
  { field: 'code', header: 'Código' },
  { field: 'name', header: 'Asunto' },
  { field: 'state', header: 'Estado', body: ticketStateBody },
  { field: 'requester.name', header: 'Solicitante' },
  { field: 'technical.name', header: 'Técnico' },
  { field: 'create_date', header: 'Creado' },
]

export default function TicketsListPage() {
  const navigate = useNavigate()

  return (
    <section className="space-y-6">
      <PageHeader title="Tickets" action={<CreateButton label="Crear Ticket" onClick={() => navigate('/tickets/nuevo')} />} />
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <ModelTable value={tickets} columns={columns} rows={8} onRowClick={(row) => navigate(`${row.id}`)} />
      </div>
    </section>
  )
}
