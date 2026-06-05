import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export default function CodeHeader({ value, sx }) {
  return (
    <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 3, textAlign: 'left', width: 'fit-content', ...sx }}>
      <Typography component="h1" variant="h5" sx={{ fontWeight: 700, letterSpacing: '0.02em' }}>
        {value}
      </Typography>
    </Box>
  )
}
