import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Lambda Eats</h1>
      <Link to="/OrderForm">
        <button id="pizza-button">
          Click here to start building your Pizza!
        </button>
      </Link>
    </div>
  );
}
