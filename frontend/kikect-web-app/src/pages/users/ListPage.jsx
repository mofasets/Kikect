import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import ModelTable from '../../components/ModelTable'
import { activeBody } from '../../components/StatusTag'
import { users } from '../../data/sampleData'
import CreateButton from '../../components/CreateButton'

const columns = [
  { field: 'code', header: 'Código' },
  { field: 'name', header: 'Nombre' },
  { field: 'email', header: 'Email' },
  { field: 'role.name', header: 'Rol' },
  { field: 'identification_id', header: 'Cédula' },
  { header: 'Activo', body: activeBody, style: { width: '8rem' } },
]

export default function UsersListPage() {
  const navigate = useNavigate()

  return (
    <section className="space-y-6">
      <PageHeader title="Usuarios" action={<CreateButton label="Crear Usuario" onClick={() => navigate('/users/nuevo')} />} />
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <ModelTable value={users} columns={columns} rows={8} onRowClick={(row) => navigate(`${row.id}`)} />
      </div>
    </section>
  )
}
