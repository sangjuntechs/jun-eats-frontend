import { render } from "@testing-library/react";
import React from "react";
import { FormError } from "../form-error";

describe("<FormError /> 컴포넌트", () => {
  it("props와 함께 랜더링이 되는가", () => {
    const { getByText } = render(<FormError errorMessage="testError" />);
    getByText("testError");
  });
});
