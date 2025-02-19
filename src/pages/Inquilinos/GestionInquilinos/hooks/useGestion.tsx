import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import {
  sliceGetInquilinos,
  slicePostInquilinos,
  slicePutInquilino,
} from "../slices/gestionSlice";
import showToastFuncionPura from "../../../../utilitis/showToastFuncionPura";

interface InquilinoInformation {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  nombreUsuario: string;
  idUsuariosExternos: string;
  activo: string;
  isEdit: boolean;
}

interface Inquilino {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  nombreUsuario: string;
  idUsuariosExternos: number;
  activo: number;
}

interface GetInquilinos {
  inquilinosActivos: Inquilino[];
  inquilinosInactivos: Inquilino[];
}

export const useGestion = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [secondaryView, setSecondaryView] = useState<boolean>(false);
  const [insumosInformation, setInsumosInformation] =
    useState<InquilinoInformation>({
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      correo: "",
      nombreUsuario: "",
      idUsuariosExternos: "",
      activo: "",
      isEdit: false,
    });
  const [inquilinos, setInquilinos] = useState<GetInquilinos>({
    inquilinosActivos: [],
    inquilinosInactivos: [],
  });
  const [loadingInquilinos, setLoadingInquilinos] = useState<boolean>(false);
  const [
    loadingActivateOrDeactivateInquilino,
    setLoadingActivateOrDeactivateInquilino,
  ] = useState<boolean>(false);

  const functionToGetInquilinos = async () => {
    try {
      setLoadingInquilinos(true);
      const response = await dispatch(sliceGetInquilinos()).unwrap();
      const { data, message, error } = response;

      if (error) {
        showToastFuncionPura(
          <i className="fas fa-exclamation-circle text-red-600"></i>,
          message,
          "Error al obtener los inquilinos"
        );
        console.log("message: ", message);
        setLoadingInquilinos(false);
        return;
      }

      setInquilinos(data);
      setLoadingInquilinos(false);
    } catch (error: unknown) {
      setInquilinos({
        inquilinosActivos: [],
        inquilinosInactivos: [],
      });
      setLoadingInquilinos(false);
      const errorMessage = (error as { message: string }).message;
      showToastFuncionPura(
        <i className="fas fa-exclamation-circle text-red-600"></i>,
        errorMessage,
        "Error al obtener los inquilinos"
      );
      console.log("errorMessage: ", errorMessage);
    }
  };

  const functionToUpdateInquilino = async (
    inquilinoState: InquilinoInformation,
    resetInformation: () => void,
    reloadPage: () => void
  ) => {
    try {
      const informationToSend = {
        nombre: inquilinoState.nombre,
        apellidoPaterno: inquilinoState.apellidoPaterno,
        apellidoMaterno: inquilinoState.apellidoMaterno,
        correo: inquilinoState.correo,
        nombreUsuario: inquilinoState.nombreUsuario,
        idUsuariosExternos: parseInt(inquilinoState.idUsuariosExternos),
        activo: parseInt(inquilinoState.activo),
      };

      setLoadingActivateOrDeactivateInquilino(true);
      const response = await dispatch(
        slicePutInquilino(informationToSend)
      ).unwrap();
      const { message, error } = response;
      if (error) {
        console.log("message: ", message);
        showToastFuncionPura(
          <i className="fas fa-exclamation-circle text-red-600"></i>,
          message,
          "Error al actualizar el inquilino"
        );
        setLoadingActivateOrDeactivateInquilino(false);
        return;
      }
      setLoadingActivateOrDeactivateInquilino(false);

      showToastFuncionPura(
        <i className="fas fa-check-circle text-green-600"></i>,
        message,
        "Inquilino actualizado correctamente"
      );
      resetInformation();
      reloadPage();
    } catch (error: unknown) {
      resetInformation();
      reloadPage();
      setLoadingActivateOrDeactivateInquilino(false);
      const errorMessage = (error as { message: string }).message;
      showToastFuncionPura(
        <i className="fas fa-exclamation-circle text-red-600"></i>,
        errorMessage,
        "Error al actualizar el inquilino"
      );
      console.log("errorMessage: ", errorMessage);
    }
  };

  const functionToCreateInquilino = async (
    inquilinoState: InquilinoInformation,
    resetInformation: () => void,
    reloadPage: () => void
  ) => {
    try {
      const informationToSend = {
        nombre: inquilinoState.nombre,
        apellidoPaterno: inquilinoState.apellidoPaterno,
        apellidoMaterno: inquilinoState.apellidoMaterno,
        correo: inquilinoState.correo,
      };

      setLoadingActivateOrDeactivateInquilino(true);
      const response = await dispatch(
        slicePostInquilinos(informationToSend)
      ).unwrap();
      const { message, error } = response;
      if (error) {
        console.log("message: ", message);
        showToastFuncionPura(
          <i className="fas fa-exclamation-circle text-red-600"></i>,
          message,
          "Error al crear el inquilino"
        );
        setLoadingActivateOrDeactivateInquilino(false);
        return;
      }
      setLoadingActivateOrDeactivateInquilino(false);

      showToastFuncionPura(
        <i className="fas fa-check-circle text-green-600"></i>,
        message,
        "Inquilino creado correctamente"
      );
      resetInformation();
      reloadPage();
    } catch (error: unknown) {
      resetInformation();
      reloadPage();
      setLoadingActivateOrDeactivateInquilino(false);
      const errorMessage = (error as { message: string }).message;
      showToastFuncionPura(
        <i className="fas fa-exclamation-circle text-red-600"></i>,
        errorMessage,
        "Error al crear el inquilino"
      );
      console.log("errorMessage: ", errorMessage);
    }
  };

  const functionToActivateOrDeactivateInquilino = async (
    inquilinos: Inquilino,
    reloadPage: () => void
  ) => {
    try {
      inquilinos.activo = inquilinos.activo === 1 ? 0 : 1;
      setLoadingActivateOrDeactivateInquilino(true);
      const response = await dispatch(slicePutInquilino(inquilinos)).unwrap();
      const { message, error } = response;

      if (error) {
        console.log("message: ", message);
        showToastFuncionPura(
          <i className="fas fa-exclamation-circle text-red-600"></i>,
          message,
          "Error al activar o desactivar el inquilino"
        );
        setLoadingActivateOrDeactivateInquilino(false);
        return;
      }
      showToastFuncionPura(
        <i className="fas fa-check-circle text-green-600"></i>,
        message,
        "Inquilino activado o desactivado correctamente"
      );
      setLoadingActivateOrDeactivateInquilino(false);
      reloadPage();
    } catch (error: unknown) {
      setInquilinos({
        inquilinosActivos: [],
        inquilinosInactivos: [],
      });
      setLoadingActivateOrDeactivateInquilino(false);
      const errorMessage = (error as { message: string }).message;
      showToastFuncionPura(
        <i className="fas fa-exclamation-circle text-red-600"></i>,
        errorMessage,
        "Error al activar o desactivar el inquilino"
      );
      console.log("errorMessage: ", errorMessage);
    }
  };

  const functionToEditOrCreateInquilino = (
    inquilino: Inquilino,
    isEdit: boolean
  ) => {
    if (isEdit) {
      setInsumosInformation({
        nombre: inquilino.nombre,
        apellidoPaterno: inquilino.apellidoPaterno,
        apellidoMaterno: inquilino.apellidoMaterno,
        correo: inquilino.correo,
        nombreUsuario: inquilino.nombreUsuario,
        idUsuariosExternos: inquilino.idUsuariosExternos.toString(),
        activo: inquilino.activo.toString(),
        isEdit,
      });
    } else {
      setInsumosInformation({
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        correo: "",
        nombreUsuario: "",
        idUsuariosExternos: "",
        activo: "",
        isEdit,
      });
    }
    setSecondaryView(true);
  };

  const functionToResetEditOrCreateInquilino = () => {
    setInsumosInformation({
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      correo: "",
      nombreUsuario: "",
      idUsuariosExternos: "",
      activo: "",
      isEdit: false,
    });
    setSecondaryView(false);
  };

  return {
    loadingInquilinos,
    inquilinos,
    functionToGetInquilinos,

    loadingActivateOrDeactivateInquilino,
    functionToActivateOrDeactivateInquilino,

    secondaryView,
    insumosInformation,
    setInsumosInformation,
    functionToEditOrCreateInquilino,
    functionToResetEditOrCreateInquilino,
    functionToUpdateInquilino,
    functionToCreateInquilino,
  };
};
