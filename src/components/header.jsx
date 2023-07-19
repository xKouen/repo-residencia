import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";

export default function SelectUser({ value, onChange }) {
  return (
    <FormControl variant="outlined" size="small" fullWidth>
      <InputLabel htmlFor="user-role">Seleccionar Rol</InputLabel>
      <Select
        onChange={onChange}
        name="role"
        value={value}
        label="Seleccionar Rol"
        id="user-role"
      >
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="manager">Manager</MenuItem>
        <MenuItem value="user">Usuario</MenuItem>
      </Select>
    </FormControl>
  );
}
