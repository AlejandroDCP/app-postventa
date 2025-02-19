import React, { ReactNode, useMemo, useState } from "react";
import imagen1 from "../assets/imagenes/login/9.jpg";
import { motion } from "framer-motion";
import ModuloButton from "./ModuloButton";
import RutasPermitidasButtons from "./RutasPermitidasButtons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { routes } from "../routes/routes";
import { RootState } from "../redux/store";
import RutasPermitidasButtonsMobile from "./RutasPermitidasButtonsMobile";

interface TemplateMenuProps {
  children: ReactNode;
}
interface User {
  nombreCompleto?: string;
  nombreUsuario?: string;
  tipoUsuario?: string;
  descPerfil?: string;
  idRol?: string;
  idPerfil?: string;
  idUsuario?: string;
  idIntranet?: string;
  externo?: boolean;
  forzarCambioPassword?: boolean;
}
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
interface SessionState {
  usuario: User;
  menus: Menu[];
  isAuth: boolean;
}
interface RouteType {
  path: string;
  element: React.ElementType | null;
}

const TemplateMenu: React.FC<TemplateMenuProps> = ({ children }) => {
  const [expandSidebar, setExpandSidebar] = useState(false);
  const isMobile = window.innerWidth < 640;
  const navigate = useNavigate();
  const session = useSelector(
    (state: RootState) => state.session
  ) as SessionState;
  const { usuario, menus, isAuth } = session;
  const { nombreUsuario } = usuario;
  const { signout } = useAuth();

  const allowedRoutes = useMemo<RouteType[]>(() => {
    const tempAllowedRoutes: RouteType[] = [];

    menus.forEach((menu) => {
      const isAssigned = routes.some((route) => route.path === menu.menu_path);
      if (isAssigned) {
        tempAllowedRoutes.push(
          ...routes
            .filter((route) => route.path === menu.menu_path)
            .map((route) => ({
              ...route,
              element: route.element || null,
            }))
        );
      }

      if (menu.submenus.length > 0) {
        menu.submenus.forEach((submenu) => {
          const exist = tempAllowedRoutes.some(
            (allowedRoute) => allowedRoute.path === submenu.submenu_path
          );
          if (!exist) {
            tempAllowedRoutes.push(
              ...routes
                .filter((route) => route.path === submenu.submenu_path)
                .map((route) => ({
                  ...route,
                  element: route.element || null,
                }))
            );
          }
        });
      }
    });

    return tempAllowedRoutes;
  }, [menus]);

  if (!isAuth) {
    return null;
  }

  const verifyRoute = (path: string): boolean => {
    return allowedRoutes.some((route) => route.path === path);
  };

  return (
    <section className="relative w-screen h-screen bg-white z-0 flex justify-center items-center overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0 bg-black z-10 overflow-hidden">
        <img
          src={imagen1}
          alt="imagen1"
          className="w-full h-full object-cover"
        />
      </div>

      {isMobile ? (
        <div className="absolute inset-0 z-10 bg-transparent flex justify-center items-center overflow-hidden">
          <div className="w-full h-full backdrop-blur-sm overflow-hidden flex flex-col">
            <div className="w-full flex justify-between items-center bg-white px-2 py-1">
              <div className="w-full overflow-x-auto overflow-y-hidden">
                <RutasPermitidasButtonsMobile
                  expandSidebar={expandSidebar}
                  verifyRoute={verifyRoute}
                  navigate={navigate}
                />
              </div>
            </div>
            <div className="w-full h-full bg-white/60 overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 z-10 bg-transparent flex justify-center items-center sm:m-2 lg:m-6 overflow-hidden">
          <div className="w-full h-full max-w-[1440px] overflow-hidden flex flex-row justify-center items-center gap-2">
            <motion.div
              className="w-[65px] min-w-[65px] h-full bg-white/60 backdrop-blur-lg rounded-xl flex flex-col justify-between py-2 max-h-[1440px]"
              initial={{ width: 65 }}
              animate={{ width: expandSidebar ? 250 : 65 }}
              transition={{ duration: 0.5 }}
            >
              <div id="top" className="">
                <ModuloButton
                  title="Inicio"
                  subtitle="ver Detalles"
                  icon={
                    expandSidebar
                      ? "fas fa-rectangle-xmark text-black/70 fa-2xl"
                      : "fas fa-bars text-black/70 fa-lg"
                  }
                  onClick={() => setExpandSidebar(!expandSidebar)}
                  isExpanded={expandSidebar}
                  noSubtitle={true}
                  noText={true}
                />
                <div id="line" className="h-[2px] bg-black/10 mx-3"></div>
                <div className="w-full h-[calc(100vh-190px)] overflow-x-hidden overflow-y-auto">
                  <RutasPermitidasButtons
                    expandSidebar={expandSidebar}
                    verifyRoute={verifyRoute}
                    navigate={navigate}
                    nombreUsuario={nombreUsuario || ""}
                  />
                </div>
              </div>

              <div id="bottom" className="">
                <ModuloButton
                  title="Cerrar Sesion"
                  subtitle="Salir de la aplicacion"
                  icon="fas fa-arrow-right-from-bracket text-black/70 fa-lg pl-5 px-2"
                  onClick={() => signout()}
                  isExpanded={expandSidebar}
                  noSubtitle={false}
                  noText={false}
                />
              </div>
            </motion.div>
            <div className="w-full h-full bg-white/60 backdrop-blur-lg rounded-xl max-h-[1440px]">
              {children}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TemplateMenu;
