import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { AxiosError } from "axios"; // Importamos AxiosError
import createAppAsyncThunk from "./createAppAsyncThunk";
import { postRequest, getRequest } from "../services/sessionClient";

const NAME_TOKEN = import.meta.env.VITE_POSTVENTA_APP_NAME_TOKEN as string;
const TOKEN = Cookies.get(NAME_TOKEN) || "";

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

interface UserResponse {
  token: string;
  idToken: number;
  timeStamp: string;
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

interface Submenu {
  id_submenu: number;
  menu: string;
  id_menu: number;
  icono: string | null;
  submenu_url: string;
  submenu_path: string;
}

interface MenuResponse {
  user: User;
  menus: Menu[];
}

interface SessionState {
  usuario: User;
  menus: Menu[];
  token: string;
  isAuth: boolean;
  onSuccess: boolean;
}

const INITIAL_STATE: SessionState = {
  usuario: {},
  menus: [],
  token: TOKEN,
  isAuth: !!TOKEN,
  onSuccess: false,
};

export const login = createAppAsyncThunk<
  { data: UserResponse; error: boolean; message: string },
  Record<string, unknown>
>("session/login", async (user, { rejectWithValue }) => {
  try {
    // Realizamos la solicitud con `postRequest`
    const response = await postRequest<UserResponse>(
      "autenticacion/password",
      user
    );
    // Verificamos si es un error basado en la presencia de `error`
    if (response.error) {
      return rejectWithValue({
        data: null,
        error: response.error,
        message: response.message,
      });
    }

    // Si no es un error, devolvemos directamente la respuesta exitosa
    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const { message, data, error: errorFlag } = error.response.data || {};
      return rejectWithValue({
        data: data || null,
        error: errorFlag || true,
        message: message || "Error desconocido",
      });
    }
    return rejectWithValue({
      data: null,
      error: true,
      message: "Error desconocido",
    });
  }
});

export const getMenus = createAppAsyncThunk<{
  data: MenuResponse;
  error: boolean;
  message: string;
}>("session/getMenus", async (_, { rejectWithValue }) => {
  try {
    const response = await getRequest<MenuResponse>("informacion/sobre-mi", {
      idModulo: import.meta.env.VITE_POSTVENTA_APP_ID_MODULO || "",
    });

    // Verificamos si es un error basado en la presencia de `error`
    if (response.error) {
      return rejectWithValue({
        data: null,
        error: response.error,
        message: response.message,
      });
    }

    // Si no es un error, devolvemos directamente la respuesta exitosa
    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const { message, data, error: errorFlag } = error.response.data || {};
      return rejectWithValue({
        data: data || null,
        error: errorFlag || true,
        message: message || "Error desconocido",
      });
    }
    return rejectWithValue({
      data: null,
      error: true,
      message: "Error desconocido",
    });
  }
});

export const unregisterServiceWorker = createAppAsyncThunk<void, void>(
  "session/unregisterServiceWorker",
  async (_, { rejectWithValue }) => {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      registrations.forEach((registration) => {
        registration.unregister();
      });
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { message, data, error: errorFlag } = error.response.data || {};
        return rejectWithValue({
          data: data || null,
          error: errorFlag || true,
          message: message || "Error desconocido",
        });
      }
      return rejectWithValue({
        data: null,
        error: true,
        message: "Error desconocido",
      });
    }
  }
);

export const sessionSlice = createSlice({
  name: "session",
  initialState: INITIAL_STATE,
  reducers: {
    logout: (state) => {
      Cookies.remove(NAME_TOKEN);
      localStorage.clear();
      Object.assign(state, INITIAL_STATE);
      window.location.href = "/";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        login.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: UserResponse;
            error: string | boolean;
            message: string;
          }>
        ) => {
          const { token } = action.payload.data; // Extraer `token` del campo `data`
          Cookies.set(NAME_TOKEN, token, { expires: 1 }); // Guardar el token en las cookies
          state.token = token; // Asignar el token al estado
          state.isAuth = true;
        }
      )
      .addCase(
        getMenus.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: MenuResponse;
            error: boolean;
            message: string;
          }>
        ) => {
          const { user, menus } = action.payload.data;
          state.usuario = user;
          state.menus = menus;
        }
      );
  },
});

export const { logout } = sessionSlice.actions;

export default sessionSlice.reducer;
