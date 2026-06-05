import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import ModelTable from '../../components/ModelTable'
import { roles } from '../../data/sampleData'
import CreateButton from '../../components/CreateButton'

const columns = [
  { field: 'code', header: 'Código' },
  { field: 'name', header: 'Rol' },
  { field: 'level', header: 'Nivel', style: { width: '8rem' } },
  { field: 'create_date', header: 'Creado' },
  { field: 'update_date', header: 'Actualizado' },
]

export default function RolesListPage() {
  const navigate = useNavigate()

  return (
    <section className="space-y-6">
      <PageHeader title="Roles" action={<CreateButton label="Crear Rol" onClick={() => navigate('/roles/nuevo')} />} />
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <ModelTable value={roles} columns={columns} rows={8} onRowClick={(row) => navigate(`${row.id}`)} />
      </div>
    </section>
  )
}
