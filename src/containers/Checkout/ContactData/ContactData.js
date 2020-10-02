import React, { Component } from "react";
import axios from "../../../axios-orders";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
          name: "name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
          name: "street",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal code",
          name: "postal",
        },
        validation: {
          required: true,
          minLength: 11,
          maxLength: 20,
        },
        valid: false,
        touched: false,
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
          name: "country",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
          name: "email",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        validation: {},
        value: "",
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const orders = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      formData,
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
  checkvalidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };
  inputChangeHandler = (event, inputIdentify) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updateFormElement = { ...updatedOrderForm[inputIdentify] };
    updateFormElement.value = event.target.value;
    updateFormElement.valid = this.checkvalidity(
      updateFormElement.value,
      updateFormElement.validation
    );
    updateFormElement.touched = true;
    updatedOrderForm[inputIdentify] = updateFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid });
  };

  render() {
    const input = Object.keys(this.state.orderForm).map((key, index) => {
      return (
        <Input
          key={index}
          elementType={this.state.orderForm[key].elementType}
          elementConfig={this.state.orderForm[key].elementConfig}
          value={this.state.orderForm[key].value}
          label={this.state.orderForm[key].elementConfig.name}
          changed={(event) => this.inputChangeHandler(event, key)}
          invalid={!this.state.orderForm[key].valid}
          touched={this.state.orderForm[key].touched}
          shouldValidate={this.state.orderForm[key].validation}
        />
      );
    });
    let form = (
      <form onSubmit={this.orderHandler}>
        {input}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
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
