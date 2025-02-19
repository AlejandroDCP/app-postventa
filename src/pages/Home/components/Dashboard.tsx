import { useSelector } from "react-redux";
import { useAuth } from "../../../hooks/useAuth";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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

const dinamicPrompts: {
  [key: string]: {
    title: string;
    subtitle: string;
    icon: string;
    ruta: string;
  };
} = {
  Usuarios: {
    title: "Usuarios",
    subtitle: "ver Detalles",
    icon: "fas fa-users text-green-600 fa-xl pr-2",
    ruta: "/usuarios",
  },
  Reportes: {
    title: "Reportes",
    subtitle: "Reportar detalles",
    icon: "fas fa-house-circle-exclamation text-red-600 fa-xl pr-2",
    ruta: "/reportes",
  },
  Documentos: {
    title: "Documentos",
    subtitle: "Gestion de inquilinos",
    icon: "fas fa-folder-open text-black/70 fa-xl pr-2",
    ruta: "/documentos",
  },
  Encuestas: {
    title: "Encuestas",
    subtitle: "Ver manuales",
    icon: "fas fa-heart text-pink-600 fa-xl pr-2",
    ruta: "/encuestas",
  },
  Inquilinos: {
    title: "Inquilinos",
    subtitle: "Calidad de servicios",
    icon: "fas fa-users-gear text-blue-600 fa-xl pr-2",
    ruta: "/inquilinos",
  },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const session = useSelector(
    (state: RootState) => state.session
  ) as SessionState;
  const { usuario, menus } = session;
  const { signout } = useAuth();

  return (
    <section className="w-full h-full bg-transparent overflow-auto p-4 sm:p-4 flex flex-col gap-4">
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-4">
          <span className=" text-black font-medium leading-none text-xl">
            {usuario.nombreCompleto}
          </span>{" "}
          <div className="flex flex-col justify-between gap-4">
            <div className="flex flex-row items-center gap-2">
              <span className="text-black/70 text-sm min-w-[70px]">
                <i className="fas fa-user mr-2"></i>
                Usuario
              </span>
              <span className=" text-black text-base">
                {usuario.nombreUsuario}
              </span>
            </div>

            <div className="flex flex-row items-center gap-2">
              <span className="text-black/70 text-sm min-w-[70px]">
                <i className="fas fa-user-tag mr-1"></i>
                Tipo
              </span>
              <span className=" text-black text-base">
                {usuario.tipoUsuario}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center">
          <button
            onClick={signout}
            className="bg-black/70 hover:bg-black text-white flex flex-row items-center justify-center text-sm gap-2 rounded-lg px-3 py-2"
          >
            <i className="fas fa-arrow-right-from-bracket"></i>
            Salir de la aplicacion
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col gap-1">
          <span className="text-black/70 text-sm">
            <i className="fas fa-clipboard-list mr-2"></i>
            Modulos disponibles
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {menus.map((menu, index) =>
              menu.menu == "Inicio" ? null : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3, delay: index * 0.1 }}
                  key={index}
                  className="flex flex-row items-center justify-center bg-white/70 rounded-lg p-4 cursor-pointer border-2 hover:border-black/10"
                  onClick={() =>
                    navigate(dinamicPrompts[menu.menu]?.ruta || "")
                  }
                >
                  <i className={`${dinamicPrompts[menu.menu]?.icon || ""}`}></i>
                  <div className="flex flex-col">
                    <span className="text-black text-lg">
                      {dinamicPrompts[menu.menu]?.title || ""}
                    </span>
                    <span className="text-black/70 text-base leading-none">
                      {dinamicPrompts[menu.menu]?.subtitle || ""}
                    </span>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
