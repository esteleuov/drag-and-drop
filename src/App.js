import {
  Button,
  Container,
  Image,
  Row,
  Card,
  ListGroup,
  Alert,
} from "react-bootstrap";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { products } from "./store/data";

function App() {
  const [cart, setCart] = useState([]);
  const [item, setItem] = useState();
  const [costs, setCosts] = useState(0);

  let styleDragCart = {
    width: "18rem",
  };

  // Сумма всех товаров
  let sum = 0;
  let price = cart.map((el) => {
    sum += Number(el.price);
  });

  const dragItem = (e) => {
    setItem({
      id: e.target.dataset.id,
      title: e.target.dataset.title,
      price: e.target.dataset.price,
    });
  };

  const dragItemEnd = (e) => {
    setItem("");
  };

  // Добавление товара и запрет повторений
  const addCart = (e) => {
    const existItem = cart.find((el) => el.id === item.id);
    if (existItem !== undefined) {
      console.log("Существует");
    } else {
      setCart([...cart, item]);
    }
  };

  

  // Удаление товара
  const deleteItem = (id) => {
    const x = cart.find((el) => {
      return el.id === id;
    });
    const resItems = cart.filter((item) => item.id !== x.id);
    setCart(resItems);
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <Container style={{ border: "1px solid #d2d2d2" }}>
          <Row style={{ flexWrap: "wrap", justifyContent: "center" }}>
            <h2>Магазин</h2>
            <Image src=""></Image>
          </Row>
          <Row>
            {products.map((el) => {
              return (
                <Card
                  key={el.id}
                  data-id={el.id}
                  data-title={el.title}
                  data-price={el.price}
                  style={{ width: "290px", margin: "8px", padding: "0px" }}
                  draggable={true}
                  onDragStart={(e) => dragItem(e)}
                  onDragEnd={() => dragItemEnd()}
                >
                  <Card.Img variant="top" src={el.img} draggable={false} />
                  <Card.Body>
                    <Card.Title>{el.title} </Card.Title>
                    <Card.Text>{el.desc}</Card.Text>
                    <Card.Title style={{ fontWeight: 700, fontSize: "18px" }}>
                      {el.price} Тенге{" "}
                    </Card.Title>
                    <Button variant="primary">Добавить в корзину</Button>
                  </Card.Body>
                </Card>
              );
            })}
          </Row>
        </Container>
      </main>
      <aside
        style={{
          position: "sticky",
          zIndex: "2",
          bottom: "22vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          width: "18rem",
          left: "100vw",
        }}
      >
        <Alert
          style={{
            fontSize: "14px",
            fontWeight: 600,
            margin: 0,
          }}
          variant="success"
        >
          Товар успешно добавлен в корзину!
        </Alert>
        <Alert
          style={{
            fontSize: "14px",
            fontWeight: 600,
            margin: 0,
          }}
          variant="danger"
        >
          Данный товар присутствует!
        </Alert>
        <Card
          onDragOver={(e) => {
            e.preventDefault();
            styleDragCart = {
              border: "1px solid red",
            };
          }}
          style={styleDragCart}
          onDrop={() => addCart()}
        >
          <Card.Header style={{ backgroundColor: "#fdc10d", fontWeight: 700 }}>
            Корзина
          </Card.Header>
          <ListGroup variant="flush">
            {cart.length === 0 ? (
              <ListGroup.Item>Корзина пуст</ListGroup.Item>
            ) : (
              cart.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {item.title}{" "}
                  <p style={{ margin: 0, fontWeight: 600 }}>{item.price} тг.</p>{" "}
                  <Button
                    onClick={() => {
                      deleteItem(item.id);
                    }}
                    variant="danger"
                  >
                    Удалить
                  </Button>{" "}
                </ListGroup.Item>
              ))
            )}
            <ListGroup.Item
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              {"Сумма: "} {sum}
              <Button variant="primary">Перейти к оплате</Button>{" "}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </aside>
    </div>
  );
}

export default App;
