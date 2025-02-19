import Lottie from "lottie-react";
import find from "../../../assets/animations/find6.json";
import { useGestion } from "./hooks/useGestion";
import { useEffect } from "react";

const GestionInquilinos = () => {
  const {
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
  } = useGestion();

  useEffect(() => {
    functionToGetInquilinos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="w-full h-full bg-transparent overflow-auto p-4 sm:p-4 flex flex-col gap-4">
      <div className="flex flex-row text-center lg:text-left mb-2">
        <span className="text-lg text-black font-normal">
          <i className="fas fa-users-gear text-blue-600 pr-1"></i>
          Gestion de Inquilinos
        </span>
      </div>
      {secondaryView ? (
        <div className="flex flex-row justify-between">
          <button
            className="bg-black/70 hover:bg-black text-white flex flex-row items-center justify-center text-sm gap-2 rounded-lg px-3 py-2"
            onClick={() => functionToResetEditOrCreateInquilino()}
          >
            <i className="fas fa-angles-left"></i>
            Regresar a la lista
          </button>

          <button
            className="bg-green-700/90 hover:bg-green-700 text-white shadow-lg shadow-black/10 flex flex-row items-center justify-center text-sm gap-2 rounded-lg px-3 py-2"
            onClick={() => {
              if (insumosInformation.isEdit) {
                functionToUpdateInquilino(
                  insumosInformation,
                  functionToResetEditOrCreateInquilino,
                  functionToGetInquilinos
                );
              } else {
                functionToCreateInquilino(
                  insumosInformation,
                  functionToResetEditOrCreateInquilino,
                  functionToGetInquilinos
                );
              }
            }}
          >
            {insumosInformation.isEdit ? (
              <>
                Guardar cambios realizados
                <i className="fas fa-cloud-arrow-up"></i>
              </>
            ) : (
              <>
                Agregar inquilino
                <i className="fas fa-user-plus"></i>
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="flex flex-row justify-end">
          <button
            className="bg-black/70 hover:bg-black text-white flex flex-row items-center justify-center text-sm gap-2 rounded-lg px-3 py-2"
            onClick={() =>
              functionToEditOrCreateInquilino(
                {
                  nombre: "",
                  apellidoPaterno: "",
                  apellidoMaterno: "",
                  correo: "",
                  nombreUsuario: "",
                  idUsuariosExternos: 0,
                  activo: 0,
                },
                false
              )
            }
          >
            Agregar un nuevo inquilino
            <i className="fas fa-plus"></i>
          </button>
        </div>
      )}

      {secondaryView ? (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col mb-2">
            <span className="text-base text-black font-medium">
              {insumosInformation.isEdit ? (
                <i className="fas fa-user-edit text-black/70 pr-1"></i>
              ) : (
                <i className="fas fa-user-plus text-black/70 pr-1"></i>
              )}
              {insumosInformation.isEdit
                ? "Editar informacion del inquilino"
                : "Agregar inquilino"}
            </span>
            <span className="text-black text-sm">
              {insumosInformation.isEdit
                ? "Bienvenido a la seccion de edicion de inquilinos, en esta seccion podra modificar la informacion personal del inquilino."
                : "Complete los campos para agregar un nuevo inquilino."}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex flex-row gap-1">
                <i className="fas fa-user text-blue-600 text-xs"></i>
                <span className="text-sm text-black/90 font-medium leading-none">
                  Nombre
                </span>
              </div>
              <input
                placeholder="Nombre del inquilino"
                className="w-full p-2 rounded-sm focus:outline-none focus:border-transparent bg-white/90 shadow-xl shadow-black/10"
                style={{
                  width: "100%",
                  resize: "none",
                }}
                value={insumosInformation.nombre}
                onChange={(e) =>
                  setInsumosInformation({
                    ...insumosInformation,
                    nombre: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-row gap-1">
                <i className="fas fa-user-tag text-blue-600 text-xs"></i>
                <span className="text-sm text-black-90 font-medium leading-none">
                  Apellido paterno
                </span>
              </div>
              <input
                placeholder="Apellido paterno del inquilino"
                className="w-full p-2 rounded-sm focus:outline-none focus:border-transparent bg-white/90 shadow-xl shadow-black/10"
                style={{
                  width: "100%",
                  resize: "none",
                }}
                value={insumosInformation.apellidoPaterno}
                onChange={(e) =>
                  setInsumosInformation({
                    ...insumosInformation,
                    apellidoPaterno: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-row gap-1">
                <i className="fas fa-user-tag text-blue-600 text-xs"></i>
                <span className="text-sm text-black-90 font-medium leading-none">
                  Apellido materno
                </span>
              </div>
              <input
                placeholder="Apellido materno del inquilino"
                className="w-full p-2 rounded-sm focus:outline-none focus:border-transparent bg-white/90 shadow-xl shadow-black/10"
                style={{
                  width: "100%",
                  resize: "none",
                }}
                value={insumosInformation.apellidoMaterno}
                onChange={(e) =>
                  setInsumosInformation({
                    ...insumosInformation,
                    apellidoMaterno: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-row gap-1">
                <i className="fas fa-envelope text-blue-600 text-xs"></i>
                <span className="text-sm text-black-90 font-medium leading-none">
                  Correo
                </span>
              </div>
              <input
                placeholder="Escriba el correo del inquilino"
                className="w-full p-2 rounded-sm focus:outline-none focus:border-transparent bg-white/90 shadow-xl shadow-black/10"
                style={{
                  width: "100%",
                  resize: "none",
                }}
                value={insumosInformation.correo}
                onChange={(e) =>
                  setInsumosInformation({
                    ...insumosInformation,
                    correo: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      ) : loadingInquilinos ? (
        <div className="flex flex-col gap-1 justify-start items-center w-full h-full">
          <div className="bg-white/90 flex flex-col justify-center items-center px-6 pb-6 rounded-lg shadow-md">
            <Lottie animationData={find} className="w-40 h-auto" />
            <span className="text-black text-lg font-medium">
              Estamos buscando todos tus inquilinos
            </span>
            <span className=" text-black/70 text-base font-normal">
              Por favor espere un momento mientras cargamos la informacion de
              tus inquilinos.
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <span className="text-base text-black font-medium">
              <i className="fas fa-circle-user text-black/70 pr-1"></i>
              Lista de Inquilinos
            </span>

            {inquilinos.inquilinosActivos.length > 0 ? (
              inquilinos.inquilinosActivos.map((inquilino, index) => (
                <div
                  key={index}
                  className="w-full h-full bg-white/90 rounded-lg px-2 py-3 shadow-md grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                >
                  <div className="flex flex-row gap-2 col-span-1">
                    <div className="h-9 w-9 bg-blue-200 text-black rounded-full hidden md:flex flex-row items-center justify-center text-sm font-medium">
                      {`${inquilino.nombre
                        .charAt(0)
                        .toUpperCase()}${inquilino.apellidoPaterno
                        .charAt(0)
                        .toUpperCase()}`}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-black/50 font-normal text-xs">
                        <i className="fas fa-user mr-1"></i>
                        Nombre
                      </span>
                      <span className="text-sm font-medium">
                        {inquilino.nombre}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col col-span-1">
                    <span className="text-black/50 font-normal text-xs">
                      <i className="fas fa-user-tag mr-1"></i>
                      Apellido Paterno
                    </span>
                    <span className="text-sm font-medium">
                      {inquilino.apellidoPaterno}
                    </span>
                  </div>
                  <div className="flex flex-col col-span-1">
                    <span className="text-black/50 font-normal text-xs">
                      <i className="fas fa-user-tag mr-1"></i>
                      Apellido Materno
                    </span>
                    <span className="text-sm font-medium">
                      {inquilino.apellidoMaterno}
                    </span>
                  </div>
                  <div className="flex flex-col col-span-1">
                    <span className="text-black/50 font-normal text-xs">
                      <i className="fas fa-envelope mr-1"></i>
                      Correo
                    </span>
                    <span className="text-sm font-medium">
                      {inquilino.correo}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-2 col-span-2 md:col-span-4 lg:col-span-1">
                    <button
                      className="bg-black/70 hover:bg-black text-white flex flex-row items-center justify-center text-xs gap-2 rounded-lg px-3 py-2"
                      onClick={() =>
                        functionToEditOrCreateInquilino(inquilino, true)
                      }
                    >
                      Editar
                      <i className="fas fa-edit"> </i>
                    </button>

                    <button
                      className="bg-red-600 hover:bg-red-700 text-white flex flex-row items-center justify-center text-xs gap-2 rounded-lg px-3 py-2"
                      disabled={loadingActivateOrDeactivateInquilino}
                      onClick={() =>
                        functionToActivateOrDeactivateInquilino(
                          inquilino,
                          functionToGetInquilinos
                        )
                      }
                    >
                      Desactivar
                      <i className="fas fa-arrow-down-wide-short"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col gap-1 justify-center items-center w-full h-full">
                <div className="bg-white/90 flex flex-col justify-center items-center px-6 pb-6 rounded-lg shadow-md">
                  <Lottie animationData={find} className="w-40 h-auto" />
                  <span className="text-black text-lg font-medium">
                    Bienvenido a la seccion de Inquilinos
                  </span>
                  <span className=" text-black text-base font-normal">
                    Empieze agregando un nuevo inquilino para poder
                    visualizarlos en esta seccion
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {inquilinos.inquilinosInactivos.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-base text-black font-medium">
                  <i className="fas fa-circle-user text-black/70 pr-1"></i>
                  Inquilinos inactivos
                </span>
                {inquilinos.inquilinosInactivos.map((inquilino, index) => (
                  <div
                    key={index}
                    className="w-full h-full bg-white/90 rounded-lg px-2 py-3 shadow-md grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                  >
                    <div className="flex flex-row gap-2 col-span-1">
                      <div className="h-9 w-9 bg-blue-200 text-black rounded-full hidden md:flex flex-row items-center justify-center text-sm font-medium">
                        {`${inquilino.nombre
                          .charAt(0)
                          .toUpperCase()}${inquilino.apellidoPaterno
                          .charAt(0)
                          .toUpperCase()}`}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-black/50 font-normal text-xs">
                          <i className="fas fa-user mr-1"></i>
                          Nombre
                        </span>
                        <span className="text-sm font-medium">
                          {inquilino.nombre}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col col-span-1">
                      <span className="text-black/50 font-normal text-xs">
                        <i className="fas fa-user-tag mr-1"></i>
                        Apellido Paterno
                      </span>
                      <span className="text-sm font-medium">
                        {inquilino.apellidoPaterno}
                      </span>
                    </div>
                    <div className="flex flex-col col-span-1">
                      <span className="text-black/50 font-normal text-xs">
                        <i className="fas fa-user-tag mr-1"></i>
                        Apellido Materno
                      </span>
                      <span className="text-sm font-medium">
                        {inquilino.apellidoMaterno}
                      </span>
                    </div>
                    <div className="flex flex-col col-span-1">
                      <span className="text-black/50 font-normal text-xs">
                        <i className="fas fa-envelope mr-1"></i>
                        Correo
                      </span>
                      <span className="text-sm font-medium">
                        {inquilino.correo}
                      </span>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-2 col-span-2 md:col-span-4 lg:col-span-1">
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white flex flex-row items-center justify-center text-xs gap-2 rounded-lg px-3 py-2"
                        disabled={loadingActivateOrDeactivateInquilino}
                        onClick={() =>
                          functionToActivateOrDeactivateInquilino(
                            inquilino,
                            functionToGetInquilinos
                          )
                        }
                      >
                        Activar <i className="fas fa-arrow-up-right-dots"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default GestionInquilinos;
