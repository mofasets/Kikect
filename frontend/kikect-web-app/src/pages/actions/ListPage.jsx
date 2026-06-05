import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import ModelTable from '../../components/ModelTable'
import { actions } from '../../data/sampleData'
import CreateButton from '../../components/CreateButton'

const columns = [
  { field: 'code', header: 'Código' },
  { field: 'name', header: 'Acción' },
  { field: 'description', header: 'Descripción' },
  { field: 'create_date', header: 'Creado' },
  { field: 'update_date', header: 'Actualizado' },
]

export default function ActionsListPage() {
  const navigate = useNavigate()

  return (
    <section className="space-y-6">
      <PageHeader title="Acciones" action={<CreateButton label="Crear Acción" onClick={() => navigate('/actions/nuevo')} />} />
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <ModelTable value={actions} columns={columns} rows={8} onRowClick={(row) => navigate(`${row.id}`)} />
      </div>
    </section>
  )
}
