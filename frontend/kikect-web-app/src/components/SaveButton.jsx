import Button from "@mui/material/Button";

export default function SaveButton({ onClick, label = "Guardar" }) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      accessKey="s"
      aria-keyshortcuts="Alt+S"
      sx={{
        backgroundColor: "primary.main",
        color: "#fff",
        fontWeight: 700,
        "&:hover": { backgroundColor: "primary.dark" },
      }}
    >
      {label}
    </Button>
  );
}
