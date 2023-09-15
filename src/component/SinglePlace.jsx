import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const SinglePlace = (props) => {
  return (
    <Link
      to={`/ricerca/result/${props.lat}&${props.lon}`}
      className="text-light text-decoration-none"
      style={{ cursor: "pointer" }}
    >
      <Container className="text-light text-decoration-none">
        <h2 className="text-decoration-none">
          {props.state} , {props.country} , {props.name}
        </h2>
        <p>
          lon: {props.lon} <br /> lat: {props.lat}
        </p>
      </Container>
    </Link>
  );
};

export default SinglePlace;
