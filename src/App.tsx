import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import PublicRoute from "./routes/PublicRoute";
import Loading from "./components/Loading";
import { Toaster } from "react-hot-toast";
import showToastFuncionPura from "./utilitis/showToastFuncionPura";
const Login = lazy(() => import("./pages/Login/Login"));
const Home = lazy(() => import("./pages/Home/Home"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <PublicRoute>
                <Login />
                <Toaster />
                <button
                  className="text-gray-500 text-[12px] font-semibold cursor-default"
                  style={{
                    position: "fixed",
                    bottom: "0",
                    right: "15px",
                    zIndex: 9999,
                  }}
                  onClick={() => {
                    showToastFuncionPura("🚀", "Versión", "v0.0.01");
                  }}
                >
                  v0.0.01
                </button>
              </PublicRoute>
            }
          />
          <Route path="/*" element={<Home />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
