import { Route, Routes } from "react-router-dom";
import "./App.css";
import Error from "./pages/Error";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import Products from "./pages/Products";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
