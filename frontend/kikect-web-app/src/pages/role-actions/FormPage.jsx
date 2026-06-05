import { useParams, useNavigate, useLocation } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Box from '@mui/material/Box'
import TextInput from '../../components/inputs/TextInput'
import TextareaInput from '../../components/inputs/TextareaInput'
import ReadOnlyInput from '../../components/inputs/ReadOnlyInput'
import FormButtons from '../../components/inputs/FormButtons'
import CodeHeader from '../../components/inputs/CodeHeader'
import Button from '@mui/material/Button'
import { roleActions } from '../../data/sampleData'

export default function RoleActionsFormPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const isNew = id === 'nuevo' || location.pathname.endsWith('/nuevo')
  const roleAction = isNew ? null : roleActions.find((item) => item.id === Number(id))

  if (!isNew && !roleAction) {
    return (
      <section className="space-y-6">
        <PageHeader title="Permiso no encontrado" />
        <Button variant="contained" onClick={() => navigate('/permisos')}>
          Volver
        </Button>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <PageHeader title={isNew ? 'Crear Permiso' : 'Editar Permiso'} />
      <Box component="form" noValidate autoComplete="off" sx={{ display: 'grid', gap: 2 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 2, width: '100%', maxWidth: 1120, mx: 'auto', overflowY: 'auto', p: 3, bgcolor: 'background.paper', borderRadius: 3, border: 1, borderColor: 'divider' }}>
          <CodeHeader value={isNew ? 'Nuevo' : roleAction.code} sx={{ gridColumn: 'span 2', justifySelf: 'start' }} />
          <TextInput label="Rol" defaultValue={isNew ? '' : roleAction.role?.name} disabled />
          <TextInput label="Acción" defaultValue={isNew ? '' : roleAction.action?.name} disabled />
          <TextareaInput label="Comentarios" defaultValue={isNew ? '' : ''} />
          <ReadOnlyInput label="Creado" value={isNew ? '' : roleAction.create_date} />
          <ReadOnlyInput label="Actualizado" value={isNew ? '' : roleAction.update_date} />
          <Box sx={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'center', mt: 2 }}>
            <FormButtons onCancel={() => navigate('/permisos')} />
          </Box>
        </Box>
      </Box>
    </section>
  )
}
