import React, { Component } from "react";
import axios from "../../axios-orders";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

class Orders extends Component {
  state = {
    loading: true,
    orders: [],
  };

  async componentDidMount() {
    try {
      const res = await axios({
        url: "/orders.json",
        method: "Get",
      });
      const fetchedData = [];
      for (let key in res.data) {
        fetchedData.push({
          ...res.data[key],
          id: key,
        });
      }
      this.setState({ loading: false, orders: fetchedData });
    } catch (error) {
      this.setState({ loading: false });
    }
  }
  render() {
    let order = <Spinner />;
    if (!this.state.loading) {
      order = this.state.orders.map((order) => {
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        );
      });
    }
    return <div>{order}</div>;
  }
}

export default withErrorHandler(Orders, axios);
