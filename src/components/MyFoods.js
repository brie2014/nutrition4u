import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";

export default function MyFoods({ userId }) {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/food/${userId}`).then((res) => {
      setFoods(res.data.food);
      console.log(res.data);
    });
  }, []);

  const handleClick = (e) => {
    console.log(e.target.id);
  };

  return (
    <div>
      <h1>My Foods</h1>
      {foods.length ? (
        foods?.map((food) => (
          <Card style={{ width: "18rem" }} key={food._id}>
            {food?.imageUrl && <Card.Img variant="top" src={food.imageUrl} />}
            <Card.Body>
              <Card.Title>{food.name}</Card.Title>
              <Card.Text>Calories: {food.calories}</Card.Text>
              <Card.Text>Details: {food.description}</Card.Text>
              <Card.Text>Details: {food._id.toString()}</Card.Text>
              <Button variant="primary" id={food._id} onClick={handleClick}>
                Add to My Foods
              </Button>
              {/* <Button variant="primary" href={`/food/${food._id}`}>
              View Details
            </Button> */}
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No foods added yet</p>
      )}
    </div>
  );
}
