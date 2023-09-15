import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import SinglePlace from "./SinglePlace";
import { useState } from "react";

const MyReserch = () => {
  const [cerca, setCerca] = useState("");
  const [risultati, setRisultati] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState(200);
  const [first, setFirst] = useState(true);

  const ricerca = (e) => {
    setCerca(e.target.value);
  };
  const fetchaTutto = async () => {
    try {
      const request = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cerca}&limit=10&appid=81ba62b31c758d02755836a11d185a38`
      );
      if (request.ok) {
        const data = await request.json();
        setRisultati(data);
        setLoading(false);
        setFirst(false);
      } else {
        setFirst(false);
        setLoading(false);
        setError(true);
        setStatus(request.status);
        setAlert(true);
      }
    } catch (error) {}
  };

  return (
    <main
      style={{
        background: "linear-gradient(130deg, rgba(4,45,47,1) 27%, rgba(20,88,112,1) 65%, rgba(0,150,254,1) 98%)",
        height: "calc(100vh - 40px)",
      }}
      className="p-4"
    >
      <input
        type="text"
        placeholder="cosa vuoi cercare?"
        style={{ backgroundColor: "#ffffff1a" }}
        className="border-0 p-2 text-light"
        onChange={(event) => ricerca(event)}
      />

      <Button onClick={() => fetchaTutto()}>
        <i className="bi bi-search"></i>
      </Button>
      {loading && !first && <Spinner animation="border" variant="primary" />}
      {!loading && error && alert && (
        <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
          <Alert.Heading>nope!</Alert.Heading>
          <p>c'e stato un'errore nel reperimento dati status code : {status}</p>
        </Alert>
      )}
      <Container>
        <Row className="g-2  justify-content-center">
          {risultati &&
            !loading &&
            risultati.map((zona, i) => (
              <Col
                xs={5}
                md={3}
                lg={2}
                style={{ backgroundColor: "#ffffff1a" }}
                className="mx-3 mt-5"
                key={`zone-${i}`}
              >
                <SinglePlace name={zona.name} lat={zona.lat} lon={zona.lon} country={zona.country} state={zona.state} />
              </Col>
            ))}
        </Row>
      </Container>
    </main>
  );
};

export default MyReserch;
