import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import ModelTable from '../../components/ModelTable'
import { roleActions } from '../../data/sampleData'
import CreateButton from '../../components/CreateButton'

const columns = [
  { field: 'code', header: 'Código' },
  { field: 'role.name', header: 'Rol' },
  { field: 'action.name', header: 'Acción' },
  { field: 'create_date', header: 'Creado' },
  { field: 'update_date', header: 'Actualizado' },
]

export default function RoleActionsListPage() {
  const navigate = useNavigate()

  return (
    <section className="space-y-6">
      <PageHeader title="Permisos" action={<CreateButton label="Crear Permiso" onClick={() => navigate('/permisos/nuevo')} />} />
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <ModelTable value={roleActions} columns={columns} rows={8} onRowClick={(row) => navigate(`${row.id}`)} />
      </div>
    </section>
  )
}
