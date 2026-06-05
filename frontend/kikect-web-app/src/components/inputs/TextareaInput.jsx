import TextField from '@mui/material/TextField'

export default function TextareaInput({ label, defaultValue, rows = 4, fullWidth = true, onChange, disabled, ...rest }) {
  return (
    <TextField label={label} defaultValue={defaultValue} multiline rows={rows} fullWidth={fullWidth} onChange={onChange} disabled={disabled} {...rest} />
  )
}
