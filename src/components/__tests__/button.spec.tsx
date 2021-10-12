import { render } from "@testing-library/react";
import React from "react";
import { Button } from "../button";

describe("<Button /> 컴포넌트", () => {
  it("props와 함께 랜더링이 되는가", () => {
    const { getByText, rerender, container } = render(
      <Button canClick={true} actionText={"test"} loading={false} />
    );
    getByText("test");
    rerender(<Button canClick={false} actionText={"test"} loading={true} />);
    getByText("Loading..");
    expect(container.firstChild).toHaveClass("pointer-events-none");
  });
});
