import React, { Component } from "react";

import Layout from "./hoc/Layout/Layout";
import BulgerBuilder from "./containers/BulgerBuilder/BurgerBuilder";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BulgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
