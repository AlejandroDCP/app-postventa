import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import PrivateRoute from "../../routes/PrivateRoute";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "../../routes/routes";
import TemplateMenu from "../../components/TemplateMenu";
import NotFoundPage from "../../components/NotFoundPage";
import { RootState } from "../../redux/store";
import { Toaster } from "react-hot-toast";
import showToastFuncionPura from "../../utilitis/showToastFuncionPura";

interface Submenu {
  id_submenu: number;
  menu: string;
  id_menu: number;
  icono: string | null;
  submenu_url: string;
  submenu_path: string;
}

interface Menu {
  id_menu: number;
  menu: string;
  icono: string | null;
  id_modulo: number;
  modulo: string;
  menu_path: string;
  menu_url: string;
  submenus: Submenu[];
}

interface Permission {
  menu: string;
  menu_path: string;
  submenus: { menu: string; submenu_path: string }[];
}

interface RouteType {
  path: string;
  element: React.ElementType | null;
}

const Home: React.FC = () => {
  const auth = useAuth();
  const userPermissions: Permission[] = useSelector<RootState, Menu[]>(
    (state) => state.session.menus || []
  ).map((menu) => ({
    menu: menu.menu,
    menu_path: menu.menu_path,
    submenus: menu.submenus.map((submenu) => ({
      menu: submenu.menu,
      submenu_path: submenu.submenu_path,
    })),
  }));

  // (1) Usar useMemo para memorizar el cálculo de allowedRoutes
  const allowedRoutes = useMemo<RouteType[]>(() => {
    let tempAllowedRoutes: RouteType[] = [];

    userPermissions.forEach((permission) => {
      const isAssigned = routes.some(
        (route) => route.path === permission.menu_path
      );

      if (isAssigned) {
        tempAllowedRoutes = [
          ...tempAllowedRoutes,
          ...routes
            .filter((route) => route.path === permission.menu_path)
            .map((route) => ({
              ...route,
              element: route.element || NotFoundPage,
            })),
        ];
      }

      if (permission.submenus.length > 0) {
        permission.submenus.forEach((submenu) => {
          const exist = tempAllowedRoutes.some(
            (allowedRoute) => allowedRoute.path === submenu.submenu_path
          );

          if (!exist) {
            tempAllowedRoutes = [
              ...tempAllowedRoutes,
              ...routes
                .filter((route) => route.path === submenu.submenu_path)
                .map((route) => ({
                  ...route,
                  element: route.element || NotFoundPage,
                })),
            ];
          }
        });
      }
    });

    return tempAllowedRoutes;
    // (2) Dependencia: si userPermissions cambia, recomputa.
  }, [userPermissions]);

  if (!auth.isAuth) {
    return <Navigate to="/" replace />;
  }

  return <TemplateMenu>{renderRoutes(allowedRoutes)}</TemplateMenu>;
};

const renderRoutes = (allowedRoutes: RouteType[]) => (
  <Routes>
    {allowedRoutes.map((route) => (
      <Route
        key={route.path}
        path={route.path}
        element={
          <PrivateRoute>
            {route.element ? <route.element /> : <NotFoundPage />}{" "}
            <button
              className="text-gray-500 text-[12px] font-semibold cursor-default"
              style={{
                position: "fixed",
                bottom: "0",
                right: "15px",
                zIndex: 9999,
              }}
              onClick={() => {
                showToastFuncionPura("🚀", "Versión", "v0.0.01");
              }}
            >
              v0.0.01
            </button>
            <Toaster />
          </PrivateRoute>
        }
      />
    ))}
    <Route
      path="*"
      element={
        <PrivateRoute>
          <NotFoundPage />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default Home;
