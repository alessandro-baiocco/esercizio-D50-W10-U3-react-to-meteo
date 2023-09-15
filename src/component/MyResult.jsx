import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
let giornoDiOggi = "";

const MyResult = () => {
  const params = useParams();
  const cordinates = params.cord.split("&");
  console.log(cordinates);
  const oggi = new Date();
  const [citta, setCitta] = useState(null);
  const [tempo, setTempo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState(200);

  const giorno = () => {
    switch (oggi.getDay()) {
      case 0:
        giornoDiOggi = "domenica";
        break;
      case 1:
        giornoDiOggi = "lunedi";
        break;
      case 2:
        giornoDiOggi = "martedi";
        break;
      case 3:
        giornoDiOggi = "mercoledi";
        break;
      case 4:
        giornoDiOggi = "giovedi";
        break;
      case 5:
        giornoDiOggi = "venerdi";
        break;
      case 6:
        giornoDiOggi = "sabato";
        break;
      default:
        giornoDiOggi = "";
    }
  };

  const fetchaGiorno = async () => {
    try {
      const request = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${cordinates[0]}&lon=${cordinates[1]}&appid=81ba62b31c758d02755836a11d185a38`
      );
      if (request.ok) {
        const data = await request.json();
        setCitta(data.city);
        setTempo(data.list.slice(0, 7));
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
    giorno();
    fetchaGiorno();
  }, []);

  return (
    <>
      <main
        style={{
          background: "linear-gradient(130deg, rgba(4,45,47,1) 27%, rgba(20,88,112,1) 65%, rgba(0,150,254,1) 98%)",
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
        {tempo && citta && !loading && (
          <>
            <Container
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80)",
              }}
              className="text-light p-3"
            >
              <Container style={{ backgroundColor: "#ffffff1a" }}>
                <h3>
                  {citta.name} , {citta.country}{" "}
                </h3>
                <p>
                  {giornoDiOggi} , {oggi.getDate()}/{oggi.getMonth()}/{oggi.getFullYear()}
                </p>
              </Container>
              <Container className="p-3">
                <Row>
                  <Col xs={12} md={6} className="d-flex">
                    <h2 style={{ fontSize: "70px" }}>{Math.floor(tempo[0].main.temp - 273, 15)}</h2>
                    <p style={{ fontSize: "20px" }} className="ms-2">
                      C° <br />
                      {tempo[0].weather[0].main}
                    </p>
                  </Col>
                  <Col xs={12} md={6} className="d-flex">
                    <img
                      src={`http://openweathermap.org/img/w/${tempo[0].weather[0].icon}.png`}
                      alt=""
                      height={"120px"}
                    />
                    <Container>
                      <p>
                        {Math.floor(tempo[0].main.temp_max - 273, 15)} C° -{" "}
                        {Math.floor(tempo[0].main.temp_min - 273, 15)}
                        C°
                      </p>
                      <p>{tempo[0].weather[0].main}</p>
                      <p>{tempo[0].weather[0].description}</p>
                    </Container>
                  </Col>
                </Row>
              </Container>
              <Row className="my-3 gy-3 py-3" style={{ backgroundColor: "#ffffff1a" }}>
                {tempo.slice(1).map((prevision, i) => {
                  return (
                    <Col xs={6} md={3} lg={2} key={`prev-${i}`}>
                      <Container className="d-flex flex-column" style={{ backgroundColor: "#2C6EB1" }}>
                        <p>{prevision.dt_txt}</p>
                        <img
                          src={`http://openweathermap.org/img/w/${prevision.weather[0].icon}.png`}
                          alt=""
                          height={"120px"}
                          width={"70%"}
                        />
                        <p>{Math.floor(prevision.main.temp - 273, 15)} c°</p>
                        <p>{prevision.weather[0].main}</p>
                      </Container>
                    </Col>
                  );
                })}
              </Row>
            </Container>

            <Container
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80)",
              }}
            >
              <Row className="justify-content-around my-3 p-3 g-3">
                <Col xs={5} lg={2} style={{ backgroundColor: "#ffffff1a" }} className="text-light p-3">
                  <i className="bi bi-wind display-5 my-2"></i>
                  <p className="fw-bold display-6">wind</p>
                  <p style={{ fontSize: "20px" }}>{tempo[0].wind.speed} km/h</p>
                </Col>
                <Col xs={5} lg={2} style={{ backgroundColor: "#ffffff1a" }} className="text-light p-3">
                  <i className="bi bi-droplet-fill display-5 my-2"></i>
                  <p className="fw-bold display-6">humidity</p>
                  <p style={{ fontSize: "20px" }}>{tempo[0].main.humidity}</p>
                </Col>
                <Col xs={5} lg={2} style={{ backgroundColor: "#ffffff1a" }} className="text-light p-3">
                  <i className="bi bi-thermometer-high display-5 my-2"></i>
                  <p className="fw-bold display-6">temp</p>
                  <p style={{ fontSize: "20px" }}>
                    min : {Math.floor(tempo[0].main.temp_min - 273, 15)} C°
                    <br /> max : {Math.floor(tempo[0].main.temp_max - 273, 15)} C°
                  </p>
                </Col>
                <Col xs={5} lg={2} style={{ backgroundColor: "#ffffff1a" }} className="text-light p-3">
                  <i className="bi bi-arrow-down display-5 my-2"></i>
                  <p className="fw-bold display-6">pressure</p>
                  <p style={{ fontSize: "20px" }}>{tempo[0].main.pressure}</p>
                </Col>
                <Col
                  xs={5}
                  lg={2}
                  style={{ backgroundColor: "#ffffff1a" }}
                  className="text-light d-none d-lg-block p-3"
                >
                  <i className="bi bi-emoji-smile display-5 my-2"></i>
                  <p className="fw-bold display-6">feels like</p>
                  <p style={{ fontSize: "20px" }}>{Math.floor(tempo[0].main.feels_like - 273, 15)} C°</p>
                </Col>
              </Row>
            </Container>
          </>
        )}
      </main>
    </>
  );
};

export default MyResult;
