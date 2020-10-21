import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios-orders";
import * as actionCreators from "../../store/actions/index";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

class Orders extends Component {
  // state = {
  //   loading: true,
  //   orders: [],
  // };

  componentDidMount() {
    this.props.onFetchOrder(this.props.token);
  }
  render() {
    let order = <Spinner />;
    if (!this.props.loading) {
      if (this.props.orders === null) {
        order = null;
      } else {
        if (this.props.orders.length === 0) {
          order = (
            <p
              style={{
                margin: "0px auto",
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
              No orders created! Please make your order.
            </p>
          );
        }
        if (this.props.orders.length > 0) {
          order = this.props.orders.map(order => {
            return (
              <Order
                key={order.id}
                ingredients={order.ingredients}
                price={+order.price}
                clicked={() =>
                  this.props.onDeleteorder(order.id, this.props.token)
                }
              />
            );
          });
        }
      }
    }
    return <div>{order}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrder: token => dispatch(actionCreators.fetchOrders(token)),
    onDeleteorder: (id, token) =>
      dispatch(actionCreators.deleteOrder(id, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
