import { useEffect } from 'react'
import Stack from '@mui/material/Stack'
import CancelButton from '../CancelButton'
import SaveButton from '../SaveButton'

export default function FormButtons({ onCancel = () => {}, onSave = () => {}, cancelLabel = 'Descartar', saveLabel = 'Guardar' }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!event.altKey || event.repeat) return
      const key = event.key.toLowerCase()
      if (key === 's') {
        event.preventDefault()
        event.stopPropagation()
        onSave()
      }
      if (key === 'd') {
        event.preventDefault()
        event.stopPropagation()
        onCancel()
      }
    }

    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [onCancel, onSave])

  return (
    <Stack direction="row" justifyContent="flex-end" spacing={2}>
      <CancelButton onClick={onCancel} label={cancelLabel} />
      <SaveButton onClick={onSave} label={saveLabel} />
    </Stack>
  )
}
