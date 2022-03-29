import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function FoodDetails() {
  const { foodId } = useParams();
  const [food, setFood] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:8080/food/${foodId}`).then((res) => {
      setFood(res.data.food);
    });
  }, [foodId]);
  console.log(food);

  const handleEdit = (e) => {
    console.log(e.target.id);
  };
  const handleDelete = (e) => {
    console.log(e.target.id);
  };

  return (
    <div>
      <h1>Food Details</h1>
      <Card style={{ width: "18rem" }}>
        {food.imageUrl && <Card.Img variant="top" src={food.imageUrl} />}
        <Card.Body>
          <Card.Title>{food.name}</Card.Title>
          <Card.Text>Calories: {food.calories}</Card.Text>
          <Card.Text>Details: {food.description}</Card.Text>
          <Button variant="primary" id={food._id} onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="primary" id={food._id} onClick={handleDelete}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
