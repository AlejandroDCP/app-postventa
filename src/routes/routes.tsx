import { lazy } from "react";

interface Route {
  path: string;
  element?: React.LazyExoticComponent<React.ComponentType<unknown>>; // Usar unknown en lugar de any
}

export const routes: Route[] = [
  {
    path: "/inicio",
    element: lazy(() => import("../pages/Home/components/Dashboard")),
  },
  {
    path: "/reportes",
    element: lazy(() => import("../pages/Reportes/Fallas/FallasPage")),
  },
  {
    path: "/documentos",
    element: lazy(() => import("../pages/Documentos/Manuales/ManualesPage")),
  },
  {
    path: "/encuestas",
    element: lazy(
      () => import("../pages/Encuestas/CalidadServicio/CalidadServicioPage")
    ),
  },
  {
    path: "/inquilinos",
    element: lazy(
      () => import("../pages/Inquilinos/GestionInquilinos/GestionInquilinos")
    ),
  },
];
