import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import axios from "../../axios-orders";
import Aux from "../../hoc/Auxilliary/Auxilliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Model from "../../components/UI/Model/Model";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import classes from "./BurgerBuilder.css";

class BulgerBuilder extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {}
  // }
  state = {
    purchasable: false,
    showOrderSummary: false,
  };

  async componentDidMount() {
    this.props.onInitIngredients();
    // try {
    //   const res = await axios({
    //     method: "GET",
    //     url: "/ingredients.json",
    //   });
    //   this.setState({ ingredients: res.data });
    // } catch (error) {
    //   this.setState({ error: true });
    // }
  }

  updateShowOrderSummary = () => {
    const updatedshow = !this.state.showOrderSummary;
    this.setState({ showOrderSummary: updatedshow });
  };

  purchaseCancelHandler = () => {
    this.setState({ showOrderSummary: false });
  };
  purchaseContinueHandler = () => {
    // alert("You pressed continue!");
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push("price=" + this.state.totalPrice.toFixed(2));
    // const queryString = queryParams.join("&");
    this.props.onPurchaseInit();
    this.props.history.push("/checkout");
  };

  updatePurchasable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingKey) => {
        return ingredients[ingKey];
      })
      .reduce((acc, el) => acc + el, 0);

    return sum > 0;
  };

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = updatedCount;

  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + INGREDIENTS_PRICES[type];

  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchasable(updatedIngredients);
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) return;
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = updatedCount;

  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - INGREDIENTS_PRICES[type];

  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients,
  //   });
  //   this.updatePurchasable(updatedIngredients);
  // };

  render() {
    const disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p
        style={{
          textAlign: "center",
          width: "70%",
          padding: "10px",
          color: "orangered",
          border: "1px solid #000",
          boxShadow: "0 1px 2px rgba(0,0,0,.15)",
          borderRadius: "10px",
          fontWeight: "bold",
          transform: "translateY(150px)",
          animation: "transform .2s",
        }}
      >
        Ingredients can't be loaded!
      </p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            // buttonDisabled={this.state.totalPrice === 4}
            purchasable={this.updatePurchasable(this.props.ings)}
            showOrderSummary={this.updateShowOrderSummary}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.totalPrice.toFixed(2)}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    return (
      <Aux>
        <Model
          show={this.state.showOrderSummary}
          modelClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Model>
        <div className={classes.BurgerBuilder}>{burger}</div>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) =>
      dispatch(actionCreators.addIngredients(ingredientName)),
    onIngredientRemoved: (ingredientName) =>
      dispatch(actionCreators.removeIngredients(ingredientName)),
    onInitIngredients: () => dispatch(actionCreators.InitIngredients()),
    onPurchaseInit: () => dispatch(actionCreators.purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BulgerBuilder, axios));
