import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

const colorMap = {
  cyan: 'info.main',
  teal: 'success.main',
  purple: 'primary.main',
  orange: 'warning.main',
  blue: 'secondary.main',
  pink: 'error.main',
}

export default function SummaryGrid({ items }) {
  return (
    <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
      {items.map((item) => (
        <Card key={item.label} sx={{ borderRadius: 3, border: 1, borderColor: 'divider', boxShadow: 1 }}>
          <CardContent>
            <Stack direction="row" spacing={3} alignItems="center">
              <Avatar sx={{ bgcolor: colorMap[item.color] ?? 'grey.700', width: 56, height: 56 }}>
                {item.icon}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="h4" fontWeight={700} color="text.primary">
                  {item.value}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
