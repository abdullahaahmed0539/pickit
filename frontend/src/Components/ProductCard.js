import { Button } from "react-bootstrap";

const ProductCard = (props) => {
  const { image, name, price, transactionType, onButtonPress } = props;
  return (
    <div className="col-md-3 mb-4">
      <div className="card">
        <img src={image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">
            <strong>{name.charAt(0).toUpperCase() + name.slice(1)}</strong>
          </h5>
          <p className="card-text">
            PKR <strong>{price.toFixed(2)}</strong>
          </p>
          <p className="card-text">
            Available for
            <strong style={{ color: "#198754" }}>
              {transactionType === "sell" ? " Purchase" : " Exchange"}
            </strong>
          </p>
          <Button className="btn  btn-primary" onClick={onButtonPress}>
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
