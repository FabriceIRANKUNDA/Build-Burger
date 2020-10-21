import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "../../components/UI/Button/Button";
import Error from "../../components/UI/Error/Error";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import axios from "../../axios-orders";
import * as actionCreators from "../../store/actions/index";
import classes from "./Auth.css";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Mail",
          name: "email",
        },
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password",
          name: "password",
        },
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
        value: "",
      },
    },
    isSignUp: true,
    removeErrMsg: false,
    addErrMsg: true,
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
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };
  inputChangedHandler = (event, inputElement) => {
    const updatedControls = {
      ...this.state.controls,
      [inputElement]: {
        ...this.state.controls[inputElement],
        value: event.target.value,
        valid: this.checkvalidity(
          event.target.value,
          this.state.controls[inputElement].validation
        ),
        touched: true,
      },
    };
    // Equivalent code ->
    // const updatedControls = {...this.state.controls};
    // const updatedInputElement = {...this.state.controls[inputElement]};
    // updatedInputElement.value = event.target.value;
    // updatedInputElement.valid = this.checkvalidity(updatedInputElement.value, updatedInputElement.validation)
    // updatedInputElement.touched= true;
    // updatedControls[inputElement] = updatedInputElement;
    // let formIsValid = true;
    // for(let key in this.state.controls){
    //     formIsValid = formIsValid && key.valid
    // }

    this.setState({ controls: updatedControls });
  };

  componentDidUpdate() {
    if (this.props.error && !this.state.removeErrMsg) {
      setTimeout(() => {
        this.setState({ removeErrMsg: true, addErrMsg: false });
      }, 5000);
    }
  }

  onsubmitHandler = event => {
    event.preventDefault();
    this.setState({ removeErrMsg: false });
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  render() {
    const formData = Object.keys(this.state.controls).map(input => {
      return (
        <Input
          key={input}
          elementType={this.state.controls[input].elementType}
          elementConfig={this.state.controls[input].elementConfig}
          value={this.state.controls[input].value}
          label={this.state.controls[input].elementConfig.name}
          changed={event => this.inputChangedHandler(event, input)}
          invalid={!this.state.controls[input].valid}
          touched={this.state.controls[input].touched}
          shouldValidate={this.state.controls[input].validation}
        />
      );
    });
    let errorMsg = null;
    if (this.props.error && !this.state.removeErrMsg) {
      errorMsg = <Error>{this.props.error.message}</Error>;
    }

    return this.props.loading ? (
      <Spinner />
    ) : (
      <div className={classes.Auth}>
        {errorMsg}
        <form onSubmit={this.onsubmitHandler}>
          {formData}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actionCreators.auth(email, password, isSignUp)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Auth, axios));
