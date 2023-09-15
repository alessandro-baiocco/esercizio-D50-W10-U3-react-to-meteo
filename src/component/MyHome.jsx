import { useEffect, useState } from "react";
import { Alert, Col, Collapse, Container, Row, Spinner } from "react-bootstrap";

const MyHome = () => {
  const [citta, setCitta] = useState("osimo");
  const [ricerca, setRicerca] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState(200);

  const fetchaGiorno = async () => {
    try {
      const request = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${citta}&appid=81ba62b31c758d02755836a11d185a38`
      );
      if (request.ok) {
        const data = await request.json();
        setRicerca(data);
        console.log(data);
        setLoading(false);
      } else {
        setLoading(false);
        setError(true);
        setStatus(request.status);
        setAlert(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchaGiorno();
  }, [citta]);

  return (
    <main
      style={{
        background: "linear-gradient(130deg, rgba(4,45,47,1) 27%, rgba(20,88,112,1) 65%, rgba(0,150,254,1) 98%)",
        height: "100vh",
      }}
      className="p-4"
    >
      {loading && <Spinner animation="border" variant="primary" />}
      {!loading && error && alert && (
        <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
          <Alert.Heading>nope!</Alert.Heading>
          <p>c'e stato un'errore nel reperimento dati status code : {status}</p>
        </Alert>
      )}

      {ricerca && !loading && (
        <>
          <Container style={{ backgroundColor: "#ffffff1a" }} className="text-light">
            <h2>posizione corrente</h2>
            <h3 className="display-3">
              {ricerca.name}, {ricerca.sys.country}
            </h3>
            <Container fluid className="d-flex my-3">
              <img
                src={`http://openweathermap.org/img/w/${ricerca.weather[0].icon}.png`}
                style={{ width: "150px" }}
                alt={ricerca.weather[0].description}
              ></img>
              <Container className="ms-3">
                <p className="display-3">{ricerca.weather[0].description}</p>
                <p className="display-5">{Math.floor(ricerca.main.feels_like - 273, 15)} C°</p>
              </Container>
            </Container>
          </Container>
          <Row className="justify-content-around my-3 p-3 g-3">
            <Col xs={11} md={5} lg={2} style={{ backgroundColor: "#ffffff1a" }} className="text-light p-3">
              <i className="bi bi-wind display-5 my-2"></i>
              <p className="fw-bold display-6">wind</p>
              <p style={{ fontSize: "20px" }}>{ricerca.wind.speed} km/h</p>
            </Col>
            <Col xs={11} md={5} lg={2} style={{ backgroundColor: "#ffffff1a" }} className="text-light p-3">
              <i className="bi bi-droplet-fill display-5 my-2"></i>
              <p className="fw-bold display-6">humidity</p>
              <p style={{ fontSize: "20px" }}>{ricerca.main.humidity}</p>
            </Col>
            <Col xs={11} md={5} lg={2} style={{ backgroundColor: "#ffffff1a" }} className="text-light p-3">
              <i className="bi bi-thermometer-high display-5 my-2"></i>
              <p className="fw-bold display-6">temp</p>
              <p style={{ fontSize: "20px" }}>
                min : {Math.floor(ricerca.main.temp_min - 273, 15)} C°
                <br /> max : {Math.floor(ricerca.main.temp_max - 273, 15)} C°
              </p>
            </Col>
            <Col xs={11} md={5} lg={2} style={{ backgroundColor: "#ffffff1a" }} className="text-light p-3">
              <i className="bi bi-arrow-down display-5 my-2"></i>
              <p className="fw-bold display-6">pressure</p>
              <p style={{ fontSize: "20px" }}>{ricerca.main.pressure}</p>
            </Col>
            <Col
              xs={11}
              md={5}
              lg={2}
              style={{ backgroundColor: "#ffffff1a" }}
              className="text-light d-none d-lg-block p-3"
            >
              <i className="bi bi-emoji-smile display-5 my-2"></i>
              <p className="fw-bold display-6">feels like</p>
              <p style={{ fontSize: "20px" }}>{Math.floor(ricerca.main.feels_like - 273, 15)} C°</p>
            </Col>
          </Row>
        </>
      )}
    </main>
  );
};

export default MyHome;