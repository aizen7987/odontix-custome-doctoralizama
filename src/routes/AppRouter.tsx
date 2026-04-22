import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Usuarios from "../pages/Usuarios";
import Layout from "../components/Layout";
import Register from "../pages/Register";
import PacienteHome from "../pages/PacienteHome";
//import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";
import PublicRoute from "./PublicRoute";
import Perfil from "../pages/Perfil";
import CitasPage from "../pages/CitasPage";
import AtenderCitaPage from "../pages/AtenderCitaPage";
import DoctorCitasPage from "../pages/DoctorCitasPage";
import PacientesPage from "../pages/PacientesPage";
import PacienteDetallePage from "../pages/PacienteDetallePage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />

                <Route path="/register" element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                } />

                <Route path="/paciente" element={
                    <Layout>
                        <RoleRoute role="paciente">
                            <PacienteHome />
                        </RoleRoute>
                    </Layout>
                } />

                <Route path="/perfil" element={
                    <Layout>
                        <RoleRoute role="paciente">
                            <Perfil />
                        </RoleRoute>
                    </Layout>
                } />

                <Route path="/citas" element={
                    <Layout>
                        <RoleRoute role="paciente">
                            <CitasPage />
                        </RoleRoute>
                    </Layout>
                } />

                <Route path="/dashboard" element={
                    <Layout>
                        <RoleRoute role={["admin", "doctor"]}>
                            <Dashboard />
                        </RoleRoute>
                    </Layout>
                } />

                <Route path="/doctor/citas" element={
                    <Layout>
                        <RoleRoute role={["doctor", "admin"]}>
                            <DoctorCitasPage />
                        </RoleRoute>
                    </Layout>
                } />

                <Route path="/doctor/citas/:id/atender" element={
                    <Layout>
                        <RoleRoute role={["doctor", "admin"]}>
                            <AtenderCitaPage />
                        </RoleRoute>
                    </Layout>
                } />

                <Route path="/usuarios" element={
                    <RoleRoute role="admin">
                        <Layout><Usuarios /></Layout>
                    </RoleRoute>
                } />

                <Route path="/doctor/pacientes" element={
                    <Layout>
                        <RoleRoute role={["doctor", "admin"]}>
                            <PacientesPage />
                        </RoleRoute>
                    </Layout>
                } />

                <Route path="/doctor/pacientes/:id" element={
                    <Layout>
                        <RoleRoute role={["doctor", "admin"]}>
                            <PacienteDetallePage />
                        </RoleRoute>
                    </Layout>
                } />
            </Routes>
        </BrowserRouter>
    );
}