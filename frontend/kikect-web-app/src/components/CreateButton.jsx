import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function CreateButton({ label = "Crear", onClick }) {
  return (
    <Button
      variant="contained"
      size="small"
      onClick={onClick}
      sx={{
        backgroundColor: "primary.main",
        color: "#fff",
        fontWeight: 700,
        "&:hover": { backgroundColor: "primary.dark" },
      }}
      startIcon={<AddIcon />}
    >
      {label}
    </Button>
  );
}
