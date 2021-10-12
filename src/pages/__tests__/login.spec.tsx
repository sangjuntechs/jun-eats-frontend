/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloProvider } from "@apollo/client";
import { createMockClient } from "mock-apollo-client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import React from "react";
import LoginPage from "../login";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("<LoginPage /> 페이지", () => {
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(async () => {
      const mockedClient = createMockClient();
      renderResult = render(
        <HelmetProvider>
          <Router>
            <ApolloProvider client={mockedClient}>
              <LoginPage />
            </ApolloProvider>
          </Router>
        </HelmetProvider>
      );
    });
  });

  it("title 랜더링이 되는가", async () => {
    await waitFor(() => {
      expect(document.title).toBe("로그인 : Jun Eats");
    });
  });

  it("유효성 검사 에러가 표시되는가 (Email: 형식)", async () => {
    const { getByPlaceholderText, getByText } = renderResult;
    const email = getByPlaceholderText("이메일");
    await waitFor(() => {
      userEvent.type(email, "test@test");
    });
    getByText("유효한 메일 형식을 입력해주세요.");
  });

  it("유효성 검사 에러가 표시되는가 (Email: 필수항목)", async () => {
    const { getByPlaceholderText, getByText } = renderResult;
    const email = getByPlaceholderText("이메일");
    await waitFor(() => {
      userEvent.type(email, 'test@test.com')
      userEvent.clear(email);
    });
    getByText("필수 항목입니다.");
  });
});
