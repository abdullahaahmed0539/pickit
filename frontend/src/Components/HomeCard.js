import { Button } from "react-bootstrap";

const HomeCard = (props) => {
  const {image, name, description, onButtonPress} = props;
  return (
    <div className="col-md-3 mb-4">
      <div className="card">
        <img
          src={`${image}`}
          className="card-img-top "
          style={{ height: "10em" }}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">
            <strong>{name.charAt(0).toUpperCase() + name.slice(1)}</strong>
          </h5>
          <p className="card-text">{description}</p>
          <Button
            className="btn  btn-primary"
            onClick={onButtonPress}
          >
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
