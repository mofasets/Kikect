import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function PageHeader({ title, subtitle, action }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', gap: 2, alignItems: 'flex-end', mb: 3 }}>
      <Box>
        <Typography variant="subtitle2" sx={{ color: 'primary.listItem' }} fontWeight={700}>
          {subtitle}
        </Typography>
        <Typography variant="h4" fontWeight={700} sx={{ color: 'primary.listItem' }}>
          {title}
        </Typography>
      </Box>
      {action && (
        <Box sx={{ ml: 'auto' }}>
          {action}
        </Box>
      )}
    </Box>
  )
}
