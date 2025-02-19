import { useEffect } from "react";
import { useEncuesta } from "./hooks/useEncuesta";
import { motion } from "framer-motion";

const CalidadServicioPage = () => {
  const {
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
  } = useEncuesta();

  useEffect(() => {
    functionToGetEncuestas();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="w-full h-full bg-transparent overflow-hidden p-4 sm:p-4 flex flex-col gap-3">
      <div className="flex flex-row text-left">
        <span className="text-lg text-black font-normal">
          <i className="fas fa-heart text-pink-600 pr-1"></i>
          Encuestas de calidad
        </span>
      </div>

      {changeView ? (
        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="flex flex-row justify-between">
            <button
              className="bg-black/70 hover:bg-black text-white flex flex-row items-center justify-center text-sm gap-2 rounded-lg px-3 py-2"
              onClick={() => {
                handleChangeView();
                handleReset();
              }}
            >
              <i className="fas fa-angles-left"></i>
              Regresar
            </button>

            <button
              className="bg-green-700/90 hover:bg-green-700 text-white shadow-lg shadow-black/10 flex flex-row items-center justify-center text-sm gap-2 rounded-lg px-3 py-2"
              onClick={() => {
                functionToPostEncuesta(
                  cantidadPreguntas,
                  calificacion,
                  handleReset,
                  functionToGetEncuestas
                );
              }}
            >
              Enviar Encuesta
              <i className="fas fa-paper-plane hover:text-green-400"> </i>
            </button>
          </div>
          <span className="text-sm text-black font-medium">
            Lee cuidadosamente las siguientes preguntas y selecciona la opción
            que mejor se ajuste a tu experiencia.
          </span>

          {loadingPreguntas ? (
            <div className="flex flex-col gap-4 w-full h-full items-center justify-center">
              <i className="fas fa-spinner fa-spin text-blue-600 text-4xl"></i>
              <span className="text-base text-black font-medium">
                Cargando preguntas...
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-2 h-[calc(100vh - 500px)] overflow-auto">
              {preguntas.map((pregunta, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 p-4 rounded-lg bg-white/50 shadow-xl shadow-black/10"
                >
                  <span className="text-lg text-black font-medium">
                    {pregunta.categoria}
                    <i className="fas fa-circle-info text-blue-600 pl-1"></i>
                  </span>

                  <div className="flex flex-col gap-2">
                    {pregunta.preguntas.map((item) => (
                      <div
                        key={item.idConcepto}
                        className="grid grid-cols-1 sm:grid-cols-2 items-center bg-black/10 px-4 py-2 sm:py-1 rounded-xl"
                      >
                        <div className="flex flex-row items-start">
                          <span className="font-medium text-black text-base">
                            {item.concepto}:
                          </span>
                        </div>
                        <div className="flex flex-row justify-center sm:justify-end">
                          {respuestas.map((respuesta) => (
                            <div
                              key={respuesta.idcatRespuestasEncuestas}
                              className="flex flex-col gap-1 items-center justify-between px-2 py-1"
                            >
                              <span className="text-xs text-black/70 font-medium">
                                {respuesta.respuesta}
                              </span>
                              <button
                                key={respuesta.idcatRespuestasEncuestas}
                                className={`
                                  h-8 w-8 flex flex-row items-center justify-between px-2 py-1 rounded-lg ring-2
                                    ${
                                      calificacion.find(
                                        (cal) =>
                                          cal.idConcepto === item.idConcepto &&
                                          cal.idcatRespuestasEncuestas ===
                                            respuesta.idcatRespuestasEncuestas
                                      )
                                        ? "bg-blue-600/90 hover:bg-red-600/90 ring-blue-600 hover:ring-red-600 "
                                        : "bg-white hover:bg-blue-600/90 ring-blue-600 "
                                    } 
                                  `}
                                onClick={() =>
                                  handleCalificacion(
                                    item.idConcepto,
                                    respuesta.idcatRespuestasEncuestas
                                  )
                                }
                              ></button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* <span className="text-sm text-black font-medium">
                    {pregunta.categoria}
                  </span>
                  <div className="flex flex-row gap-2">
                    {respuestas.map((respuesta) => (
                      <button
                        key={respuesta.idcatRespuestasEncuestas}
                        className="flex flex-row items-center justify-between px-2 py-1 rounded-lg bg-white"
                      >
                        <span className="text-sm text-black font-normal">
                          {respuesta.respuesta}
                        </span>
                      </button>
                    ))
                  </div>} */}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4 overflow-auto">
          {loadingEncuestas ? (
            <div className="flex flex-col gap-4 w-full h-full items-center justify-center">
              <i className="fas fa-spinner fa-spin text-blue-600 text-4xl"></i>
              <span className="text-base text-black font-medium">
                Cargando manuales...
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {encuestas.map((encuesta, index) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3, delay: index * 0.1 }}
                  key={encuesta.idcatEncuestaMaestro}
                  className="flex flex-col px-2 py-4 rounded-lg bg-white/50 shadow-xl shadow-black/10"
                >
                  <div className="flex flex-row items-start justify-between">
                    <span className="text-sm text-black font-medium">
                      {encuesta.nombreEncuesta}
                    </span>
                    <span className="text-xs text-black/70 font-normal">
                      #{encuesta.idcatEncuestaMaestro}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 my-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-xs text-black/70 ">Preguntas</span>
                      <span className="text-sm text-black font-medium">
                        {encuesta.preguntas}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-black/70 ">Respuestas</span>
                      <span className="text-sm text-black font-medium">
                        {encuesta.respuestas}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-center">
                    {encuesta.respondido ? (
                      <span className="bg-black/70 text-white flex flex-row items-center justify-center text-sm gap-2 rounded-lg px-3 py-2">
                        Respondido
                        <i className="fas fa-check-double"></i>
                      </span>
                    ) : (
                      <button
                        className="bg-blue-600/90 hover:bg-blue-600 text-white flex flex-row items-center justify-center text-sm gap-2 rounded-lg px-3 py-2"
                        onClick={async () => {
                          handleChangeView();
                          await functionToGetPreguntasById(
                            encuesta.idcatEncuestaMaestro
                          );
                          await functionToGetDropdownsRespuestas();
                        }}
                      >
                        Empezar a responder
                        <i className="fas fa-flag-checkered"> </i>
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default CalidadServicioPage;
