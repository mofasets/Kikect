import { useParams, useNavigate, useLocation } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Box from '@mui/material/Box'
import TextInput from '../../components/inputs/TextInput'
import ReadOnlyInput from '../../components/inputs/ReadOnlyInput'
import FormButtons from '../../components/inputs/FormButtons'
import CodeHeader from '../../components/inputs/CodeHeader'
import Button from '@mui/material/Button'
import { roles } from '../../data/sampleData'

export default function RolesFormPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const isNew = id === 'nuevo' || location.pathname.endsWith('/nuevo')
  const role = isNew ? null : roles.find((item) => item.id === Number(id))

  if (!isNew && !role) {
    return (
      <section className="space-y-6">
        <PageHeader title="Rol no encontrado" />
        <Button variant="contained" onClick={() => navigate('/roles')}>
          Volver
        </Button>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <PageHeader title={isNew ? 'Crear Rol' : 'Editar Rol'} />
      <Box component="form" noValidate autoComplete="off" sx={{ display: 'grid', gap: 2 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 2, width: '100%', maxWidth: 1120, mx: 'auto', overflowY: 'auto', p: 3, bgcolor: 'background.paper', borderRadius: 3, border: 1, borderColor: 'divider' }}>
          <CodeHeader value={isNew ? 'Nuevo' : role.code} sx={{ gridColumn: 'span 2', justifySelf: 'start' }} />
          <TextInput label="Nombre" defaultValue={isNew ? '' : role.name} />
          <TextInput label="Nivel" defaultValue={isNew ? '' : role.level} />
          <ReadOnlyInput label="Creado" value={isNew ? '' : role.create_date} />
          <ReadOnlyInput label="Actualizado" value={isNew ? '' : role.update_date} />
          <Box sx={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'center', mt: 2 }}>
            <FormButtons onCancel={() => navigate('/roles')} />
          </Box>
        </Box>
      </Box>
    </section>
  )
}
