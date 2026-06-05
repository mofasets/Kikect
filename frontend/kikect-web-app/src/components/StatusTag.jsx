import Chip from "@mui/material/Chip";

const stateColor = {
  NUEVO: "info",
  "EN PROCESO": "warning",
  PENDIENTE: "secondary",
  RESUELTO: "success",
  RECHAZADO: "error",
};

export function ticketStateBody(rowData) {
  const color = stateColor[rowData.state] || "default";
  return (
    <Chip
      label={rowData.state}
      sx={{ backgroundColor: `states.${color}`, fontWeight: 700, color: '#fff' }}
      size="small"

    />
  );
}

export function activeBody(rowData) {
  return (
    <Chip
      label={rowData.is_active ? "Activo" : "Inactivo"}
      sx={{ backgroundColor: `states.${rowData.is_active ? "success" : "error"}`, fontWeight: 700, color: '#fff' }}
      size="small"
    />
  );
}
