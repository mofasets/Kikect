import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#03bcb2', // Tu color primario (ejemplo: morado)
      listItem: '#5f5e5e', // Color para los íconos
      listItemHover: '#dfdddd', // Color para los íconos al hacer hover
      background: '#f4fbf9', // Color de fondo para la aplicación
    },
    secondary: {
      main: '#ff9263', // Tu color secundario
      pageHeader: '#ffc4aa', // Color para los títulos de las páginas
    },
    states: {
        info: '#03bcb2', // Azul para NUEVO
        warning: '#03bcb2', // Naranja para EN PROCESO
        secondary: '#03bcb2', // Morado para PENDIENTE
        success: '#42ab49', // Verde para RESUELTO
        error: '#FF746C', // Rojo para RECHAZADO
    }
  },
});