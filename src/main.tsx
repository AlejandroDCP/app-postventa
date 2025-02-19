import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ProviderAuth } from "./hooks/useAuth";
import { store } from "./redux/store";
import { Provider } from "react-redux";

// Obtiene el elemento raíz asegurándose de que no sea nulo
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("No se encontró el elemento raíz 'root' en el DOM.");
}

createRoot(rootElement).render(
  <Router>
    <Provider store={store}>
      <ProviderAuth>
        <App />
      </ProviderAuth>
    </Provider>
  </Router>
);
