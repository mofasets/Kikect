import TextField from '@mui/material/TextField'

export default function TextInput({ label, defaultValue, fullWidth = true, onChange, disabled, ...rest }) {
  return (
    <TextField label={label} defaultValue={defaultValue} fullWidth={fullWidth} onChange={onChange} disabled={disabled} {...rest} />
  )
}
