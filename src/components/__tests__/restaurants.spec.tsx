import { render } from "@testing-library/react";
import React from "react";
import RestaurantsComp from "../restaurants";
import { BrowserRouter as Router } from "react-router-dom";

describe("<RestaurantsComp /> 컴포넌트", () => {
  it("Props와 함께 랜더링이 되는가", () => {
    const { getByText, container } = render(
      <Router>
        <RestaurantsComp
          id="1"
          coverImage="textImg"
          name="nameTest"
          categoryName="catNameTest"
          address="testAdd"
        />
      </Router>
    );
    getByText('nameTest')
    getByText('testAdd')
    getByText('catNameTest')
    expect(container.firstChild).toHaveAttribute('href', '/restaurants/1')
  });
});
