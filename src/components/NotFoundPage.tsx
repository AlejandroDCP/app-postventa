import React from "react";
// import SVGNotFound from "../assets/img/not_found.svg";
import Lottie from "lottie-react";
import LottieNotFound from "../assets/animations/find3.json";
import { useNavigate } from "react-router-dom";

const stylesSVG = {
  maxWidth: "18rem",
};

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full h-full flex justify-center items-center bg-transparent">
      <div className="text-center">
        <div className="flex justify-center">
          <Lottie animationData={LottieNotFound} style={stylesSVG} />
        </div>
        <div className="text-xl mb-4">
          <p className="mb-1">
            <strong>Oops!</strong> No se ha encontrado la pagina.
          </p>
          <p className="text-sm">
            Intenta de nuevo o contacta el área de desarrollo
          </p>
          <p className="text-sm">para la asignación de esta sección</p>
        </div>
        <button
          className="py-2 rounded-xl px-4 bg-black/70 text-white font-light tracking-[0.25px] hover:bg-gray-300 transition duration-300"
          style={{ textDecoration: "none" }}
          onClick={() => navigate("/inicio", { replace: true })}
        >
          <i className="fas fa-arrow-left me-2 text-white text-sm"></i>
          Regresar al inicio
        </button>
      </div>
    </section>
  );
};

export default NotFoundPage;
