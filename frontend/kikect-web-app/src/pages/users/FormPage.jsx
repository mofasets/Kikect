import { useParams, useNavigate, useLocation } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Box from '@mui/material/Box'
import TextInput from '../../components/inputs/TextInput'
import SelectInput from '../../components/inputs/SelectInput'
import ReadOnlyInput from '../../components/inputs/ReadOnlyInput'
import FormButtons from '../../components/inputs/FormButtons'
import CodeHeader from '../../components/inputs/CodeHeader'
import Button from '@mui/material/Button'
import { users } from '../../data/sampleData'

export default function UsersFormPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const isNew = id === 'nuevo' || location.pathname.endsWith('/nuevo')
  const user = isNew ? null : users.find((item) => item.id === Number(id))

  if (!isNew && !user) {
    return (
      <section className="space-y-6">
        <PageHeader title="Usuario no encontrado" />
        <Button variant="contained" onClick={() => navigate('/users')}>
          Volver
        </Button>
      </section>
    )
  }

  const roleOptions = [
    { value: 'admin', label: 'Administrador' },
    { value: 'support', label: 'Soporte' },
    { value: 'user', label: 'Usuario' },
  ]

  return (
    <section className="space-y-6">
      <PageHeader title={isNew ? 'Crear Usuario' : 'Editar Usuario'} />
      <Box component="form" noValidate autoComplete="off" sx={{ display: 'grid', gap: 2 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 2, width: '100%', maxWidth: 1120, mx: 'auto', overflowY: 'auto', p: 3, bgcolor: 'background.paper', borderRadius: 3, border: 1, borderColor: 'divider' }}>
          <CodeHeader value={isNew ? 'Nuevo' : user.code} sx={{ gridColumn: 'span 2', justifySelf: 'start' }} />
          <TextInput label="Nombre" defaultValue={isNew ? '' : user.name} />
          <TextInput label="Email" type="email" defaultValue={isNew ? '' : user.email} />
          <TextInput label="Cédula" defaultValue={isNew ? '' : user.identification_id} />
          <SelectInput label="Rol" options={roleOptions} defaultValue={isNew ? '' : user.role?.name} />
          <ReadOnlyInput label="Activo" value={isNew ? '' : user.is_active ? 'Sí' : 'No'} />
          <Box sx={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'center', mt: 2 }}>
            <FormButtons onCancel={() => navigate('/users')} />
          </Box>
        </Box>
      </Box>
    </section>
  )
}
