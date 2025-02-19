import { AxiosError } from "axios"; // Importamos AxiosError
import createAppAsyncThunk from "../../../../slices/createAppAsyncThunk";
import { postRequest, postFormData } from "../../../../services/axiosClient";

interface GetMaestro {
  descripcion: string;
  idpvPrereporteFallasMaestro: number;
}

interface formDataReportesFallas {
  archivo: File;
  idpvPrereporteFallasMaestro: number;
  descripcion: string;
}

export const slicePostMaestro = createAppAsyncThunk<
  {
    data: GetMaestro;
    error: boolean;
    message: string;
  },
  Record<string, unknown>
>("fallas/POST_MAESTRO", async (data, { rejectWithValue }) => {
  try {
    const response = await postRequest<GetMaestro>(
      `reportes/E/reporteMaestro`,
      data
    );

    if (response.error) {
      return rejectWithValue({
        data: null,
        error: response.error,
        message: response.message,
      });
    }

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

export const slicePostFormdataReportesFallas = createAppAsyncThunk<
  {
    data: formDataReportesFallas;
    error: boolean;
    message: string;
  },
  Record<string, unknown>
>("fallas/POST_REPORTE_FALLAS", async (data, { rejectWithValue }) => {
  try {
    const response = await postFormData<formDataReportesFallas>(
      "reportes/E/reporteMaestro/partida",
      data
    );
    if (response.error) {
      return rejectWithValue({
        data: null,
        error: response.error,
        message: response.message,
      });
    }

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
