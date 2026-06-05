import { useParams, useNavigate, useLocation } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Box from '@mui/material/Box'
import TextInput from '../../components/inputs/TextInput'
import TextareaInput from '../../components/inputs/TextareaInput'
import ReadOnlyInput from '../../components/inputs/ReadOnlyInput'
import FormButtons from '../../components/inputs/FormButtons'
import CodeHeader from '../../components/inputs/CodeHeader'
import Button from '@mui/material/Button'
import { actions } from '../../data/sampleData'

export default function ActionsFormPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const isNew = id === 'nuevo' || location.pathname.endsWith('/nuevo')
  const action = isNew ? null : actions.find((item) => item.id === Number(id))

  if (!isNew && !action) {
    return (
      <section className="space-y-6">
        <PageHeader title="Acción no encontrada" />
        <Button variant="contained" onClick={() => navigate('/actions')}>
          Volver
        </Button>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <PageHeader title={isNew ? 'Crear Acción' : 'Editar Acción'} />
      <Box component="form" noValidate autoComplete="off" sx={{ display: 'grid', gap: 2 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 2, width: '100%', maxWidth: 1120, mx: 'auto', overflowY: 'auto', p: 3, bgcolor: 'background.paper', borderRadius: 3, border: 1, borderColor: 'divider' }}>
          <CodeHeader value={isNew ? 'Nuevo' : action.code} sx={{ gridColumn: 'span 2', justifySelf: 'start' }} />
          <TextInput label="Nombre" defaultValue={isNew ? '' : action.name} />
          <TextareaInput label="Descripción" defaultValue={isNew ? '' : action.description} />
          <ReadOnlyInput label="Creado" value={isNew ? '' : action.create_date} />
          <ReadOnlyInput label="Actualizado" value={isNew ? '' : action.update_date} />
          <Box sx={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'center', mt: 2 }}>
            <FormButtons onCancel={() => navigate('/actions')} />
          </Box>
        </Box>
      </Box>
    </section>
  )
}
