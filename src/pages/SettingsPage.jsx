import { useState, useEffect, useTransition } from "react";
import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import { usePantry } from "../context/PantryContext.jsx";

function SettingsPage() {
  const { products, clearPantry } = usePantry();

  const [pokazModal, setPokazModal] = useState(false);
  const [statystyki, setStatystyki] = useState({ liczba: 0, przeterminowane: 0, sumaSztuk: 0 });
  const [isPending, startTransition] = useTransition();

  // Niepilne wyliczanie statystyk przy zmianie listy
  useEffect(() => {
    startTransition(() => {
      const dzisiaj = new Date().toISOString().slice(0, 10);
      const przeterminowane = products.filter((p) => p.expiryDate < dzisiaj).length;
      const sumaSztuk = products.reduce((suma, p) => suma + Number(p.quantity || 0), 0);
      setStatystyki({ liczba: products.length, przeterminowane, sumaSztuk });
    });
  }, [products]);

  const handleClear = () => {
    clearPantry();
    setPokazModal(false);
  };

  return (
    <div>
      <h2 className="mb-4">Ustawienia</h2>

      <Row className="g-3 mb-4">
        <Col xs={12} md={4}>
          <Card body className="text-center">
            <div className="fs-2 fw-bold">{statystyki.liczba}</div>
            <div className="text-muted">Produktów</div>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card body className="text-center">
            <div className="fs-2 fw-bold text-danger">{statystyki.przeterminowane}</div>
            <div className="text-muted">Przeterminowanych</div>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card body className="text-center">
            <div className="fs-2 fw-bold">{statystyki.sumaSztuk}</div>
            <div className="text-muted">Suma sztuk</div>
          </Card>
        </Col>
      </Row>

      {isPending && <p className="text-muted">Przeliczanie statystyk…</p>}

      <Button variant="danger" onClick={() => setPokazModal(true)} disabled={products.length === 0}>
        Wyczyść spiżarnię
      </Button>

      <Modal show={pokazModal} onHide={() => setPokazModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Potwierdzenie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Czy na pewno chcesz usunąć wszystkie produkty ze spiżarni? Tej operacji nie można cofnąć.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setPokazModal(false)}>
            Anuluj
          </Button>
          <Button variant="danger" onClick={handleClear}>
            Tak, wyczyść
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SettingsPage;