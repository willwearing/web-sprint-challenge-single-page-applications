import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

export default function OrderForm() {
  const data = [];

  //submit
  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then((result) => {
        setPost(result.data);
        data.push(post);
        setFormState(formDefaults);
        setOnTheWay("Your pizza order is on the way!");
      })
      .catch((error) => {
        console.log("axios error", error);
      });
  };

  //form defaults
  const formDefaults = {
    name: "",
    size: "",
    tomato: false,
    bbq: false,
    pepperoni: false,
    chicken: false,
    special: "",
  };

  //states

  const [formState, setFormState] = useState(formDefaults);
  const [button, setButton] = useState(true);
  const [btnVis, setBtnVis] = useState("hidden");
  const [onTheWay, setOnTheWay] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    size: "",
    tomato: "",
    bbq: "",
    pepperoni: "",
    chicken: "",
    special: "",
  });
  const [post, setPost] = useState();

  //input change
  const inputChange = (event) => {
    event.persist();
    const newData = {
      ...formState,
      [event.target.name]:
        event.target.name === "checkbox"
          ? event.target.checked
          : event.target.value,
    };
    validation(event);
    setFormState(newData);
  };

  //schema
  const formSchema = yup.object().shape({
    name: yup
      .string()
      .test("length", "Must be more than 2 chars", (value) => value.length > 2),
    size: yup.boolean().oneOf(["Small", "Medium", "Large"]),
    tomato: yup.boolean().oneOf([true, false]),
    bbq: yup.boolean().oneOf([true, false]),
    pepperoni: yup.boolean().oneOf([true, false]),
    chicken: yup.boolean().oneOf([true, false]),
    special: yup.string(),
  });

  //validation
  const validation = (event) => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setErrors({ ...errors, [event.target.name]: "" });
      })
      .catch((error) => {
        console.log("yup error", error);
        setErrors({ ...errors, [event.target.name]: error.errors[0] });
      });
  };

  //checking name length
  useEffect(() => {
    if (formState.name.length < 3) {
      setButton(true);
    } else {
      setButton(false);
    }
  }, [formState]);

  return (
    <div>
      <h2>Design and Order Your Pizza!</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={inputChange}
          />
          {errors.name.length > 0 ? <p>{errors.name}</p> : null}
        </label>
        <br></br>
        <br></br>
        <label htmlFor="size">
          Choose your Pizza Size
          <select name="size">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </label>

        <h3>Choose your Pizza Sauce and Toppings!</h3>

        <label htmlFor="tomato">
          Tomato
          <input
            type="checkbox"
            checked={formState.tomato}
            value={formState.tomato}
            name="tomato"
            onChange={inputChange}
          />
        </label>

        <label htmlFor="bbq">
          BBQ
          <input
            type="checkbox"
            checked={formState.bbq}
            value={formState.bbq}
            name="bbq"
            onChange={inputChange}
          />
        </label>

        <label htmlFor="pepperoni">
          Pepperoni
          <input
            type="checkbox"
            checked={formState.pepperoni}
            value={formState.pepperoni}
            name="pepperoni"
            onChange={inputChange}
          />
        </label>

        <label htmlFor="chicken">
          Chicken
          <input
            type="checkbox"
            checked={formState.chicken}
            value={formState.chicken}
            name="chicken"
            onChange={inputChange}
          />
        </label>
        <br></br>
        <br></br>
        <label htmlFor="special">
          Special Requests/Instructions? Leave a note here:
          <input
            name="special"
            value={formState.special}
            onChange={inputChange}
          />
          {errors.special.length > 0 ? <p>{errors.special}</p> : null}
        </label>
        <br></br>
        <br></br>
        <button
          name="button"
          disabled={button}
          type="submit"
          onClick={() => {
            setBtnVis("visible");
          }}
        >
          Submit
        </button>

        <h4 className={btnVis}>
          {" "}
          <h4>{onTheWay}</h4>
          {JSON.stringify(post, null, 2)}
        </h4>
      </form>
    </div>
  );
}
