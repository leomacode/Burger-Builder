import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./navigationItems";
import NavigationItem from "./navigationItem/navigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  it("Should return two <Navigation/> elements if not authoticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it("Should return three <Navigation/> elements if not authoticated", () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it("Should have a Log out <NavigationItem/> element if authoticated", () => {
    wrapper.setProps({ isAuth: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Log Out</NavigationItem>)
    ).toEqual(true);
  });
});
