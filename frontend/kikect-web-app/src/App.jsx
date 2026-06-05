import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import DashboardPage from "./pages/DashboardPage"
import TicketsPage, { FormPage as TicketsFormPage } from "./pages/tickets"
import UsersPage, { FormPage as UsersFormPage } from "./pages/users"
import RolesPage, { FormPage as RolesFormPage } from "./pages/roles"
import ActionsPage, { FormPage as ActionsFormPage } from "./pages/actions"
import TicketHistoryPage, { FormPage as TicketHistoryFormPage } from "./pages/ticket-history"
import RoleActionsPage, { FormPage as RoleActionsFormPage } from "./pages/role-actions"
import NotFoundPage from "./pages/NotFoundPage"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "./theme"


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="tickets" element={<TicketsPage />} />
            <Route path="tickets/nuevo" element={<TicketsFormPage />} />
            <Route path="tickets/:id" element={<TicketsFormPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users/nuevo" element={<UsersFormPage />} />
            <Route path="users/:id" element={<UsersFormPage />} />
            <Route path="roles" element={<RolesPage />} />
            <Route path="roles/nuevo" element={<RolesFormPage />} />
            <Route path="roles/:id" element={<RolesFormPage />} />
            <Route path="actions" element={<ActionsPage />} />
            <Route path="actions/nuevo" element={<ActionsFormPage />} />
            <Route path="actions/:id" element={<ActionsFormPage />} />
            <Route path="historial" element={<TicketHistoryPage />} />
            <Route path="historial/nuevo" element={<TicketHistoryFormPage />} />
            <Route path="historial/:id" element={<TicketHistoryFormPage />} />
            <Route path="permisos" element={<RoleActionsPage />} />
            <Route path="permisos/nuevo" element={<RoleActionsFormPage />} />
            <Route path="permisos/:id" element={<RoleActionsFormPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
};

export default App;
