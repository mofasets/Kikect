import TextField from '@mui/material/TextField'

export default function ReadOnlyInput({ label, value, fullWidth = true, ...rest }) {
  return (
    <TextField label={label} value={value} fullWidth={fullWidth} InputProps={{ readOnly: true }} {...rest} />
  )
}
