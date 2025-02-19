import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import imagen1 from "../../assets/imagenes/login/9.jpg";
import icon from "../../assets/imagenes/mainIcons/iconLogin.png";
import { useState } from "react";

type FormValues = {
  user: string;
  pass: string;
  externo: boolean;
};

const Login = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { signin, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const infoToSend = {
        user: data.user,
        pass: data.pass,
        externo: true,
      };
      await signin(infoToSend);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <section className="relative w-screen h-screen bg-white z-0 flex justify-center items-center ">
      <div className="absolute inset-0 bg-black z-10">
        <img
          src={imagen1}
          alt="imagen1"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 z-10 bg-transparent px-6 py-6 sm:p-6 flex justify-center items-center">
        <div className="w-full h-full border-none rounded-xl p-4 backdrop-blur-lg max-w-[768px] lg:max-w-[1240px] max-h-[768px]">
          <div className="w-full h-full bg-trasnparent grid grid-cols-1 grid-rows-8 lg:grid-rows-1 lg:grid-cols-2  z-10">
            <section className="lg:relative flex justify-center items-end lg:justify-start w-full h-full row-span-1 lg:row-span-1 bg-transparent z-10">
              <motion.div
                id="titulo9"
                className="block lg:absolute lg:top-1/4"
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 3 }}
              >
                <div className="hidden flex-col text-center lg:text-left lg:block lg:mt-8">
                  <div className="flex flex-row items-center">
                    {/* <img className="w-[62px] mt-2" src={icon} alt="logo" /> */}
                    <span className="text-[80px] text-white/90 font-normal lg:font-semibold leading-none">
                      Bienvenido!
                    </span>
                  </div>
                  <span className="text-[18px] text-white hidden lg:block">
                    Soporte y atención del area de postventa.
                  </span>
                  <span className="bg-white h-[1px] w-[150px] mt-2 hidden lg:block"></span>
                </div>
              </motion.div>
            </section>

            <section className="relative flex justify-center items-start lg:items-center w-full h-full row-span-5 lg:row-span-1 bg-transparent z-10">
              <form
                onSubmit={onSubmit}
                className="absolute flex justify-center items-start w-full h-full lg:h-auto lg:w-full lg:top-1/4 pb-10 sm:px-16 lg:px-4"
              >
                <div
                  id="card"
                  className="flex flex-col justify-center items-center text-center px-4 py-8 bg-white rounded-xl w-full h-full text-ellipsis overflow-hidden whitespace-pre-line"
                >
                  <img className="w-[40px]" src={icon} alt="logo" />
                  <span
                    className="text-black font-medium text-center"
                    style={{
                      fontSize: "clamp(24px, 2.5vw, 32px)",
                    }}
                  >
                    POSTVENTA
                  </span>
                  <span
                    className="text-black tracking-[.25px]"
                    style={{
                      fontSize: "clamp(12px, 2.5vw, 14px)",
                    }}
                  >
                    Ingresa tu usuario y contraseña para ingresar a tu cuenta
                  </span>
                  <div className="flex flex-col w-full gap-4 py-4 mt-2">
                    <div className="flex flex-col w-full leading-none text-start">
                      <span
                        className="text-gray-600 tracking-[.5px]"
                        style={{
                          fontSize: "clamp(12px, 2.5vw, 14px)",
                        }}
                      >
                        Usuario
                      </span>
                      <input
                        type="text"
                        placeholder="Ingresa tu usuario"
                        className="border-2 border-gray-300 rounded-lg p-2 mt-2 w-full"
                        {...register("user", {
                          required: "Este campo es obligatorio",
                        })}
                      />
                      {errors?.user && (
                        <p
                          className="text-red-600 mt-1"
                          style={{
                            fontSize: "clamp(12px, 2.5vw, 14px)",
                          }}
                        >
                          {errors.user.message}{" "}
                          <i className="fas fa-exclamation-circle"></i>
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col w-full leading-none text-start">
                      <span
                        className="text-gray-600 tracking-[.5px]"
                        style={{
                          fontSize: "clamp(12px, 2.5vw, 14px)",
                        }}
                      >
                        Contraseña
                      </span>
                      <input
                        type="password"
                        placeholder="*****"
                        className="border-2 border-gray-300 rounded-lg p-2 mt-2 w-full"
                        {...register("pass", {
                          required: "Este campo es obligatorio",
                        })}
                      />
                      {errors?.pass && (
                        <p
                          className="text-red-600 mt-1"
                          style={{
                            fontSize: "clamp(12px, 2.5vw, 14px)",
                          }}
                        >
                          {errors.pass.message}{" "}
                          <i className="fas fa-exclamation-circle"></i>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <motion.div
                  className="absolute bottom-3 bg-white w-16 h-16 rounded-full flex justify-center items-center"
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  animate={{ width: isHovered ? "11rem" : "4rem" }} // Animación del ancho
                  transition={{ duration: 0.3 }}
                >
                  <motion.button
                    type="submit"
                    className={`bg-black w-11 h-11 rounded-full flex justify-center items-center gap-2 ${
                      loading
                        ? "cursor-not-allowed bg-gray-400 text-gray-700"
                        : "cursor-pointer"
                    }`}
                    animate={{ width: isHovered ? "10rem" : "2.75rem" }} // Animación del ancho interno del botón
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span
                      className="text-white text-lg"
                      initial={{ opacity: 0, display: "none" }}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        display: isHovered ? "block" : "none",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      Ingresar
                    </motion.span>
                    <i className="fas fa-arrow-right fa-lg text-white"></i>
                  </motion.button>
                </motion.div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
