import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import CreateAccount from "../create-account";

describe("<CreateAccount /> 컴포넌트", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
        mockedClient = createMockClient();
        render(
          <HelmetProvider>
            <Router>
              <ApolloProvider client={mockedClient}>
                <CreateAccount />
              </ApolloProvider>
            </Router>
          </HelmetProvider>
        );
      });
  })
  it("title 테스팅", async () => {
    await waitFor(() => {
        expect(document.title).toBe('회원가입 : Jun Eats')
    })
  });
});
