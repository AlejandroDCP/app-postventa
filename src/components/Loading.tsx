import Lottie from "lottie-react";
import LottieLoading from "../assets/animations/1.json";

const Loading: React.FC = () => {
  return (
    <div className="h-screen w-full grid place-content-center text-center bg-secondary">
      <Lottie
        animationData={LottieLoading}
        loop
        autoplay
        style={{
          width: "200px",
        }}
      />
    </div>
  );
};

export default Loading;
