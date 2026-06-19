import { Routes, Route, Link } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import PantryPage from "./pages/PantryPage.jsx";
import AddProductPage from "./pages/AddProductPage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";

function NotFoundPage() {
  return (
    <div className="text-center mt-5">
      <h1>404</h1>
      <p>Nie znaleziono takiej strony.</p>
      <Link to="/">Wróć do spiżarni</Link>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PantryPage />} />
        <Route path="add" element={<AddProductPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;