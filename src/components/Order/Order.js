import React from "react";
import classes from "./Order.css";
const order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientsOutput = ingredients.map((ing) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
          boxSizing: "border-box",
        }}
        key={ing.name}
      >
        {ing.name} ({ing.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <div className={classes.Details}>
        <p>
          Price: <strong>USD {props.price.toFixed(2)}</strong>
        </p>
        <button className={classes.Button} onClick={props.clicked}>
          DELETE
        </button>
      </div>
    </div>
  );
};

export default order;
