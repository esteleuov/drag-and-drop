import {
  Button,
  Container,
  Image,
  Row,
  Card,
  ListGroup,
} from "react-bootstrap";
import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  const [item, setItem] = useState();
  const items = useRef([]);

  const products = [
    {
      id: 1,
      img: "https://loremflickr.com/620/420",
      title: "Товар 1",
      price: 7800,
      desc: "Описание соответствует товару 1, качество лучшее, изготовитель: Испания, Мадрид, Лорен 1 ООО Барнабео",
    },
    {
      id: 2,
      img: "https://loremflickr.com/620/420",
      title: "Товар 2",
      price: 1900,
      desc: "Пытаюсь привязать дата атрибуты к кастомному компоненту, нее пробрасывая их внутрь этого компонента",
    },
    {
      id: 3,
      img: "https://loremflickr.com/620/420",
      title: "Товар 3",
      price: 2320,
      desc: "Описание соответствует товару 1, качество лучшее, изготовитель: Испания, Мадрид, Лорен 1 ООО Барнабе",
    },
    {
      id: 4,
      img: "https://loremflickr.com/620/420",
      title: "Товар 4",
      price: 6400,
      desc: "Описание соответствует товару 1, качество лучшее, изготовитель: Испания, Мадрид, Лорен 1 ООО Барнабео",
    },
    {
      id: 5,
      img: "https://loremflickr.com/620/420",
      title: "Товар 5",
      price: 5000,
      desc: "Описание соответствует товару 1, качество лучшее, изготовитель: Испания, Мадрид, Лорен 1 ООО Барнабео",
    },
    {
      id: 6,
      img: "https://loremflickr.com/620/420",
      title: "Товар 6",
      price: 3620,
      desc: "Описание соответствует товару 1, качество лучшее, изготовитель: Испания, Мадрид, Лорен 1 ООО Барнабео",
    },
    {
      id: 7,
      img: "https://loremflickr.com/620/420",
      title: "Товар 7",
      price: 3100,
      desc: "Описание соответствует товару 1, качество лучшее, изготовитель: Испания, Мадрид, Лорен 1 ООО Барнабео",
    },
    {
      id: 8,
      img: "https://loremflickr.com/620/420",
      title: "Товар 8",
      price: 1400,
      desc: "Описание соответствует товару 1, качество лучшее, изготовитель: Испания, Мадрид, Лорен 1 ООО Барнабео",
    },
  ];

  const dragItem = (e) => {
    setItem({
      id: e.target.dataset.id,
      title: e.target.dataset.title,
      price: e.target.dataset.price,
    });
  };

  const dragItemEnd = (e) => {
    setItem("");
    console.log(item);
  };

  const addCart = (e) => {
    items.current.push(item);
    console.log(items);
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
          justifyContent: "end",
          width: "18rem"
        }}
      >
        <Card
          style={{ width: "18rem" }}
          onDragOver={(e) => {
            e.preventDefault();
            console.log("onDragOver");
          }}
          onDrop={() => addCart()}
        >
          <Card.Header style={{ backgroundColor: "#fdc10d", fontWeight: 700 }}>
            Корзина
          </Card.Header>
          <ListGroup variant="flush">
            {items.current.length === 0 ? (
              <ListGroup.Item>Корзина пуст</ListGroup.Item>
            ) : (
              items.current.map((item) => (
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
                  <Button variant="danger">Удалить</Button>{" "}
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
              {"Сумма "}
              <Button variant="primary">Перейти к оплате</Button>{" "}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </aside>
    </div>
  );
}

export default App;
