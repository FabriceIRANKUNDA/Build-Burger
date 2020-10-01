import React, { Component } from "react";
import axios from "../../../axios-orders";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      postalCode: "",
      street: "",
    },
    loading: false,
  };

  orderHandler = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const orders = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "IRANKUNDA Fabrice",
        address: {
          street: "KG 121st",
          zipCode: "3526",
          country: "Rwanda",
        },
        email: "testit@mailsac.com",
      },
      deliveryMethod: "Fastest",
    };
    try {
      await axios({
        method: "POST",
        url: "/orders.json",
        data: orders,
      });

      this.setState({
        loading: false,
      });
      this.props.history.push("/");
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your Name" />
        <input type="email" name="email" placeholder="Your Mail" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) form = <Spinner />;

    return (
      <div className={classes.ContactData}>
        <h1>Enter your Contact Info</h1>
        {form}
      </div>
    );
  }
}

export default ContactData;
