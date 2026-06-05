import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

export default function SelectInput({ label, value, defaultValue, options = [], fullWidth = true, onChange, disabled, ...rest }) {
  return (
    <TextField select label={label} value={value} defaultValue={defaultValue} fullWidth={fullWidth} onChange={onChange} disabled={disabled} {...rest}>
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </TextField>
  )
}
