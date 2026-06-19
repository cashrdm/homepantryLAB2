import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";
import { usePantry } from "../context/PantryContext.jsx";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = usePantry();

  const produkt = products.find((p) => p.id === id);

  if (!produkt) {
    return (
      <div className="text-center mt-5">
        <h3>Nie znaleziono produktu</h3>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          ← Wróć
        </Button>
      </div>
    );
  }

  const dzisiaj = new Date().toISOString().slice(0, 10);
  const przeterminowany = produkt.expiryDate < dzisiaj;

  return (
    <Card className="mx-auto" style={{ maxWidth: "600px" }}>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0">{produkt.name}</h4>
        <Badge bg={przeterminowany ? "danger" : "success"}>
          {przeterminowany ? "Przeterminowany" : "Świeży"}
        </Badge>
      </Card.Header>
      <Card.Body>
        <p><strong>Kategoria:</strong> {produkt.category}</p>
        <p><strong>Ilość:</strong> {produkt.quantity} {produkt.unit}</p>
        <p><strong>Data ważności:</strong> {produkt.expiryDate}</p>
        <p><strong>Uwagi:</strong> {produkt.notes || "—"}</p>

        <Button variant="secondary" onClick={() => navigate(-1)}>
          ← Wróć
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductDetailPage;