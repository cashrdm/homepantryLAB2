import { createContext, useContext, useReducer, useEffect } from "react";

const PantryContext = createContext(null);

const STORAGE_KEY = "pantry-products";

// Kilka przykładowych produktów na start (tylko gdy pamięć jest pusta)
const przykladoweProdukty = [
  { id: "seed-1", name: "Mleko 3,2%",   category: "Nabiał",          quantity: 2, unit: "l",    expiryDate: "2026-06-20", notes: "Trzymać w lodówce" },
  { id: "seed-2", name: "Chleb razowy", category: "Pieczywo",        quantity: 1, unit: "szt.", expiryDate: "2026-06-18", notes: "" },
  { id: "seed-3", name: "Jabłka",       category: "Warzywa i owoce", quantity: 6, unit: "szt.", expiryDate: "2026-06-30", notes: "Odmiana Ligol" },
];

// Wczytuje dane z localStorage albo zwraca produkty przykładowe
function wczytajStanPoczatkowy() {
  try {
    const zapisane = localStorage.getItem(STORAGE_KEY);
    if (zapisane) return JSON.parse(zapisane);
  } catch (e) {
    console.error("Błąd odczytu localStorage:", e);
  }
  return przykladoweProdukty;
}

// Reducer: dostaje stan i akcję, zwraca NOWY stan
function pantryReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((p) => p.id !== action.payload);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

// Provider: udostępnia magazyn i operacje wszystkim dzieciom
export function PantryProvider({ children }) {
  const [products, dispatch] = useReducer(pantryReducer, undefined, wczytajStanPoczatkowy);

  // Zapisuj do localStorage przy każdej zmianie listy
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (produkt) => {
    dispatch({ type: "ADD", payload: { ...produkt, id: crypto.randomUUID() } });
  };

  const deleteProduct = (id) => dispatch({ type: "DELETE", payload: id });

  const clearPantry = () => dispatch({ type: "CLEAR" });

  return (
    <PantryContext.Provider value={{ products, addProduct, deleteProduct, clearPantry }}>
      {children}
    </PantryContext.Provider>
  );
}

// Custom hook: skrót do korzystania z magazynu
export function usePantry() {
  const context = useContext(PantryContext);
  if (!context) {
    throw new Error("usePantry musi być użyty wewnątrz <PantryProvider>");
  }
  return context;
}