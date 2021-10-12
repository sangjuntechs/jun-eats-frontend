import { render, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "../404";

describe("<NotFound /> 페이지", () => {
  it("랜더링과 타이틀 출력이 제대로 되는가", async () => {
    render(
      <HelmetProvider>
        <Router>
          <NotFound />
        </Router>
      </HelmetProvider>
    );
    await waitFor(() => {
        expect(document.title).toBe("404 not found : Jun Eats")
    })
  });
});
