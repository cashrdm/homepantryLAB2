import { useMemo } from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { usePantry } from "../context/PantryContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

function CategoriesPage() {
  const { products, deleteProduct } = usePantry();

  // useMemo: grupowanie produktów wg kategorii
  const pogrupowane = useMemo(() => {
    return products.reduce((acc, produkt) => {
      const kat = produkt.category || "Inne";
      if (!acc[kat]) acc[kat] = [];
      acc[kat].push(produkt);
      return acc;
    }, {});
  }, [products]);

  const kategorie = Object.keys(pogrupowane);

  return (
    <div>
      <h2 className="mb-4">Kategorie</h2>

      {kategorie.length === 0 ? (
        <p className="text-muted">Spiżarnia jest pusta.</p>
      ) : (
        kategorie.map((kat) => (
          <section key={kat} className="mb-5">
            <h4 className="mb-3">
              {kat} <Badge bg="secondary">{pogrupowane[kat].length}</Badge>
            </h4>
            <Row xs={1} sm={2} lg={3} className="g-3">
              {pogrupowane[kat].map((p) => (
                <Col key={p.id}>
                  <ProductCard product={p} onDelete={deleteProduct} />
                </Col>
              ))}
            </Row>
          </section>
        ))
      )}
    </div>
  );
}

export default CategoriesPage;