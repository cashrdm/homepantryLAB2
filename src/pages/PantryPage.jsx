import { useState, useMemo } from "react";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import { usePantry } from "../context/PantryContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

function PantryPage() {
  const { products, deleteProduct } = usePantry();

  // Stan filtrów
  const [szukaj, setSzukaj] = useState("");
  const [kategoria, setKategoria] = useState("Wszystkie");

  // Lista unikalnych kategorii do listy rozwijanej
  const kategorie = useMemo(() => {
    const zbior = new Set(products.map((p) => p.category));
    return ["Wszystkie", ...zbior];
  }, [products]);

  // useMemo: filtrowanie przeliczane tylko gdy zmienią się dane wejściowe
  const widoczneProdukty = useMemo(() => {
    return products.filter((p) => {
      const pasujeNazwa = p.name.toLowerCase().includes(szukaj.toLowerCase());
      const pasujeKategoria = kategoria === "Wszystkie" || p.category === kategoria;
      return pasujeNazwa && pasujeKategoria;
    });
  }, [products, szukaj, kategoria]);

  return (
    <div>
      <h2 className="mb-3">Spiżarnia</h2>

      <Row className="mb-4 g-2">
        <Col xs={12} md={8}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              placeholder="Szukaj produktu po nazwie..."
              value={szukaj}
              onChange={(e) => setSzukaj(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={4}>
          <Form.Select value={kategoria} onChange={(e) => setKategoria(e.target.value)}>
            {kategorie.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {widoczneProdukty.length === 0 ? (
        <p className="text-muted">Brak produktów spełniających kryteria.</p>
      ) : (
        <Row xs={1} sm={2} lg={3} className="g-3">
          {widoczneProdukty.map((p) => (
            <Col key={p.id}>
              <ProductCard product={p} onDelete={deleteProduct} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default PantryPage;