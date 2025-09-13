import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"
import { Home } from "./pages/Home"
import { Categorias } from "./pages/Categorias"
import { Usuarios } from "./pages/Usuarios"
import { Sobre } from "./pages/Sobre"
import GerenciarUsuarios from "./pages/Usuarios/Gerenciar"

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/categorias/:id"
                    element={<Categorias />}
                />
                <Route
                    path="/usuarios"
                    element={<Usuarios />}
                />
                <Route
                    path="/sobre/:id"
                    element={<Sobre />}
                />
                <Route path="/usuarios/:id"
                    element={<GerenciarUsuarios />}

                />

                <Route
                    path="*"
                    element={<h1>404</h1>}
                />
            </Routes>
        </BrowserRouter >
    )
}