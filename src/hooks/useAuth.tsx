import {
  useEffect,
  useState,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logout,
  getMenus,
  unregisterServiceWorker,
} from "../slices/sessionSlice";
import toast from "react-hot-toast";
import { RootState, AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import showToastFuncionPura from "../utilitis/showToastFuncionPura";

interface AuthContextType {
  isAuth: boolean;
  loading: boolean;
  signin: (data: Record<string, unknown>) => Promise<void>;
  signout: () => Promise<void>;
}

const authContext = createContext<AuthContextType | undefined>(undefined);

interface ProviderAuthProps {
  children: ReactNode;
}

export const ProviderAuth: React.FC<ProviderAuthProps> = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un ProviderAuth");
  }
  return context;
};

function useProvideAuth(): AuthContextType {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const userLogged = useSelector((state: RootState) => state.session.isAuth);

  useEffect(() => {
    if (userLogged) {
      setIsAuth(true);
      handleGetMenus();
    }
  }, [userLogged]); // eslint-disable-line react-hooks/exhaustive-deps

  const signin = async (data: Record<string, unknown>) => {
    setLoading(true);
    const id = toast.loading("Validando datos...");

    try {
      await dispatch(login(data)).unwrap();
      toast.dismiss(id);
      showToastFuncionPura("✅", "Inicio de sesión exitoso", "Login");
      setLoading(false);
      setTimeout(() => {
        navigate("/inicio", { replace: true });
      }, 500);
    } catch (error: unknown) {
      const errorMessage = (error as { message: string }).message;
      console.log("errorMessage: ", errorMessage);
      toast.dismiss(id);
      setLoading(false);
    }
  };

  const handleGetMenus = async () => {
    try {
      const response = await dispatch(getMenus()).unwrap();
      localStorage.setItem(
        "nombreCompleto",
        response.data.user.nombreCompleto || "Error al obtener nombre"
      );
      localStorage.setItem(
        "nombreUsuario",
        response.data.user.nombreUsuario || "Error al obtener usuario"
      );
      localStorage.setItem(
        "tipoUsuario",
        response.data.user.tipoUsuario || "Error al obtener tipo de usuario"
      );
      localStorage.setItem(
        "idUsuario",
        response.data.user.idUsuario || "Error al obtener el id del usuario"
      );
      localStorage.setItem(
        "forzarCambioPassword",
        response.data.user.forzarCambioPassword ? "true" : "false"
      );
    } catch (error: unknown) {
      const errorMessage = (error as { message: string }).message;
      showToastFuncionPura("❌", "Error", errorMessage);
    }
  };

  const signout = async () => {
    if ("serviceWorker" in navigator) {
      await dispatch(unregisterServiceWorker()).unwrap();
    }
    dispatch(logout());
  };

  return { isAuth, loading, signin, signout };
}
