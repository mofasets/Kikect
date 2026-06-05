import Button from "@mui/material/Button";

export default function CancelButton({ onClick, label = "Descartar" }) {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      accessKey="d"
      aria-keyshortcuts="Alt+D"
      sx={{
        color: "primary.main",
        borderColor: "primary.main",
        fontWeight: 700,
        "&:hover": { borderColor: "primary.main", color: "primary.main" },
      }}
    >
      {label}
    </Button>
  );
}
