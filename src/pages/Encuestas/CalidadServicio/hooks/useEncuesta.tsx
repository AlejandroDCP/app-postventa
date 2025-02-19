import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import {
  sliceGetDropdownsRespuestas,
  sliceGetEncuestas,
  sliceGetPreguntasByID,
  slicePostEncuestas,
} from "../slices/encuestaSlice";
import showToastFuncionPura from "../../../../utilitis/showToastFuncionPura";

interface EncuestasInterface {
  idcatEncuestaMaestro: number;
  nombreEncuesta: string;
  preguntas: number;
  respondido: number;
  respuestas: number;
}

interface HeaderPreguntasInterface {
  categoria: string;
  preguntas: PreguntasInterface[];
}

interface PreguntasInterface {
  categoria: string;
  concepto: string;
  idCategoria: number;
  idConcepto: number;
  idcatEncuestaMaestro: number;
}

interface RespuestasInterface {
  idcatRespuestasEncuestas: number;
  respuesta: string;
}

interface CalificacionInterface {
  idConcepto: number;
  idcatRespuestasEncuestas: number;
}

export const useEncuesta = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [changeView, setChangeView] = useState<boolean>(false);
  const [calificacion, setCalificacion] = useState<CalificacionInterface[]>([]);
  const [cantidadPreguntas, setCantidadPreguntas] = useState<number>(0);

  const [encuestas, setEncuestas] = useState<EncuestasInterface[]>([]);
  const [loadingEncuestas, setLoadingEncuestas] = useState<boolean>(false);

  const [preguntas, setPreguntas] = useState<HeaderPreguntasInterface[]>([]);
  const [loadingPreguntas, setLoadingPreguntas] = useState<boolean>(false);

  const [respuestas, setRespuestas] = useState<RespuestasInterface[]>([]);

  const functionToGetEncuestas = async () => {
    setLoadingEncuestas(true);
    try {
      const response = await dispatch(sliceGetEncuestas()).unwrap();
      const { data, message, error } = response;

      if (error) {
        console.log("message: ", message);
        showToastFuncionPura(
          <i className="fas fa-exclamation-circle text-red-600"></i>,
          message,
          "Error al obtener las encuestas"
        );
        return;
      }

      setEncuestas(data);
    } catch (error: unknown) {
      setEncuestas([]);
      const errorMessage = (error as { message: string }).message;
      showToastFuncionPura(
        <i className="fas fa-exclamation-circle text-red-600"></i>,
        errorMessage,
        "Error al obtener las encuestas"
      );
      console.log("errorMessage: ", errorMessage);
    } finally {
      setLoadingEncuestas(false);
    }
  };

  const functionToGetPreguntasById = async (id: number) => {
    setLoadingPreguntas(true);
    try {
      const response = await dispatch(sliceGetPreguntasByID(id)).unwrap();
      const { data, message, error } = response;

      if (error) {
        showToastFuncionPura(
          <i className="fas fa-exclamation-circle text-red-600"></i>,
          message,
          "Error al obtener las preguntas"
        );
        console.log("message: ", message);
        return;
      }

      setCantidadPreguntas(data.length);

      const newArray: { [key: string]: PreguntasInterface[] } = {};
      data.forEach((element) => {
        const { categoria } = element;
        if (!newArray[categoria]) {
          newArray[categoria] = [];
        }
        newArray[categoria].push(element);
      });

      const formattedArray = Object.keys(newArray).map((key) => {
        return {
          categoria: key,
          preguntas: newArray[key],
        };
      });

      setPreguntas(formattedArray);
    } catch (error: unknown) {
      const errorMessage = (error as { message: string }).message;
      showToastFuncionPura(
        <i className="fas fa-exclamation-circle text-red-600"></i>,
        errorMessage,
        "Error al obtener las preguntas"
      );
      console.log("errorMessage: ", errorMessage);
      return;
    } finally {
      setLoadingPreguntas(false);
    }
  };

  const functionToGetDropdownsRespuestas = async () => {
    try {
      const response = await dispatch(sliceGetDropdownsRespuestas()).unwrap();
      const { data, message, error } = response;

      if (error) {
        console.log("message: ", message);
        return;
      }

      setRespuestas(data);
    } catch (error: unknown) {
      const errorMessage = (error as { message: string }).message;
      console.log("errorMessage: ", errorMessage);
    }
  };

  const handleChangeView = () => {
    setChangeView(!changeView);
  };

  const handleCalificacion = (
    idConcepto: number,
    idcatRespuestasEncuestas: number
  ) => {
    const existIdConcepto = calificacion.some(
      (element) => element.idConcepto === idConcepto
    );

    const isCatRespuestaEqualConcepto = calificacion.some(
      (element) =>
        element.idConcepto === idConcepto &&
        element.idcatRespuestasEncuestas === idcatRespuestasEncuestas
    );

    if (existIdConcepto) {
      if (isCatRespuestaEqualConcepto) {
        const newCalificacion = calificacion.filter(
          (element) =>
            element.idConcepto !== idConcepto ||
            element.idcatRespuestasEncuestas !== idcatRespuestasEncuestas
        );
        setCalificacion(newCalificacion);
      } else {
        const newCalificacion = calificacion.map((element) => {
          if (element.idConcepto === idConcepto) {
            return {
              idConcepto,
              idcatRespuestasEncuestas,
            };
          }
          return element;
        });
        setCalificacion(newCalificacion);
      }
    } else {
      setCalificacion([
        ...calificacion,
        {
          idConcepto,
          idcatRespuestasEncuestas,
        },
      ]);
    }
  };

  const functionToPostEncuesta = async (
    cantidadPreguntas: number,
    calificacion: CalificacionInterface[],
    handleReset: () => void,
    functionToGetEncuestas: () => void
  ) => {
    try {
      if (cantidadPreguntas !== calificacion.length) {
        console.log("Favor de calificar todas las preguntas");
        return;
      }

      const dataToSend = {
        respuestas: calificacion,
      };

      const response = await dispatch(slicePostEncuestas(dataToSend)).unwrap();
      console.log("response: ", response);
      const { message, error } = response;
      if (error) {
        showToastFuncionPura(
          <i className="fas fa-exclamation-circle text-red-600"></i>,
          message,
          "Error al enviar la encuesta"
        );
        console.log("message: ", message);
        return;
      }

      showToastFuncionPura(
        <i className="fas fa-check-circle text-green-600"></i>,
        message,
        "Encuesta enviada"
      );
      console.log("message: ", message);
      handleReset();
      functionToGetEncuestas();
    } catch (error: unknown) {
      const errorMessage = (error as { message: string }).message;
      showToastFuncionPura(
        <i className="fas fa-exclamation-circle text-red-600"></i>,
        errorMessage,
        "Error al enviar la encuesta"
      );
      console.log("errorMessage: ", errorMessage);
      return;
    }
  };

  const handleReset = () => {
    setChangeView(false);
    setLoadingPreguntas(false);
    setCantidadPreguntas(0);
    setCalificacion([]);
    setPreguntas([]);
    setRespuestas([]);
  };

  return {
    loadingEncuestas,
    encuestas,
    functionToGetEncuestas,

    loadingPreguntas,
    preguntas,
    functionToGetPreguntasById,

    respuestas,
    functionToGetDropdownsRespuestas,

    changeView,
    handleChangeView,

    cantidadPreguntas,
    calificacion,
    handleCalificacion,

    functionToPostEncuesta,
    handleReset,
  };
};
