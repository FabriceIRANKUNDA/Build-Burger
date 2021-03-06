import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder/>", () => {
  let wrapper = null;
  beforeEach(
    () => (wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />))
  );
  it("should render <BuildControls/> when it recieves ingredients", () => {
    wrapper.setProps({ ings: { salad: 2 }, totalPrice: 121.65643 });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
