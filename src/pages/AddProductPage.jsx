import { useState, useRef, useId, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { usePantry } from "../context/PantryContext.jsx";

const KATEGORIE = ["Nabiał", "Pieczywo", "Mięso i wędliny", "Warzywa i owoce", "Napoje", "Inne"];

function AddProductPage() {
  const { addProduct } = usePantry();
  const navigate = useNavigate();

  // useRef: uchwyt do pola nazwy, żeby ustawić w nim fokus po wejściu
  const nazwaRef = useRef(null);

  // useId: unikalne identyfikatory pól formularza
  const idNazwa = useId();
  const idKategoria = useId();
  const idIlosc = useId();
  const idJednostka = useId();
  const idData = useId();
  const idUwagi = useId();

  // Stan formularza
  const [form, setForm] = useState({
    name: "",
    category: "Nabiał",
    quantity: 1,
    unit: "szt.",
    expiryDate: "",
    notes: "",
  });
  const [blad, setBlad] = useState("");

  // Autofokus pola nazwy po pierwszym wyrenderowaniu
  useEffect(() => {
    nazwaRef.current?.focus();
  }, []);

  // Aktualizacja jednego pola formularza
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setBlad("Nazwa produktu jest wymagana.");
      nazwaRef.current?.focus();
      return;
    }
    addProduct({ ...form, quantity: Number(form.quantity) });
    navigate("/");
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: "600px" }}>
      <Card.Body>
        <Card.Title className="mb-3">Dodaj produkt</Card.Title>

        {blad && <div className="alert alert-danger">{blad}</div>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor={idNazwa}>Nazwa</Form.Label>
            <Form.Control
              id={idNazwa}
              ref={nazwaRef}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="np. Mleko 3,2%"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor={idKategoria}>Kategoria</Form.Label>
            <Form.Select id={idKategoria} name="category" value={form.category} onChange={handleChange}>
              {KATEGORIE.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor={idIlosc}>Ilość</Form.Label>
            <Form.Control
              id={idIlosc}
              type="number"
              min="0"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor={idJednostka}>Jednostka</Form.Label>
            <Form.Control
              id={idJednostka}
              name="unit"
              value={form.unit}
              onChange={handleChange}
              placeholder="np. szt., l, kg"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor={idData}>Data ważności</Form.Label>
            <Form.Control
              id={idData}
              type="date"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor={idUwagi}>Uwagi</Form.Label>
            <Form.Control
              id={idUwagi}
              as="textarea"
              rows={2}
              name="notes"
              value={form.notes}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit" variant="success">Dodaj do spiżarni</Button>
            <Button type="button" variant="secondary" onClick={() => navigate("/")}>
              Anuluj
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddProductPage;