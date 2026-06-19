import { memo, useCallback } from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, onDelete }) {
  const navigate = useNavigate();

  // Status daty ważności: kolor i etykieta Badge
  const dzisiaj = new Date().toISOString().slice(0, 10);
  let badgeColor = "success";
  let badgeText = "Świeży";

  if (product.expiryDate < dzisiaj) {
    badgeColor = "danger";
    badgeText = "Przeterminowany";
  } else {
    const za3Dni = new Date();
    za3Dni.setDate(za3Dni.getDate() + 3);
    if (product.expiryDate <= za3Dni.toISOString().slice(0, 10)) {
      badgeColor = "warning";
      badgeText = "Kończy się";
    }
  }

  // useCallback: handler usuwania nie tworzy się na nowo przy każdym renderze
  const handleDelete = useCallback(() => {
    onDelete(product.id);
  }, [onDelete, product.id]);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0">{product.name}</Card.Title>
          <Badge bg={badgeColor}>{badgeText}</Badge>
        </div>
        <Card.Subtitle className="mb-2 text-muted">{product.category}</Card.Subtitle>
        <Card.Text className="mb-1">
          Ilość: {product.quantity} {product.unit}
        </Card.Text>
        <Card.Text className="mb-3">Ważność: {product.expiryDate}</Card.Text>

        <div className="mt-auto d-flex gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            Szczegóły
          </Button>
          <Button variant="outline-danger" size="sm" onClick={handleDelete}>
            Usuń
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default memo(ProductCard);