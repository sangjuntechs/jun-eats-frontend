/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { getByText, render, RenderResult, waitFor } from "@testing-library/react";
import React from "react";
import LoginPage from "../login";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { LOGIN_MUTATION } from "../../pages/login";

describe("<LoginPage /> 페이지", () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(async () => {
      mockedClient = createMockClient();
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
      userEvent.type(email, "test@test.com");
      userEvent.clear(email);
    });
    getByText("필수 항목입니다.");
  });

  it("유효성 검사 에러가 표시되는가 (Password: 최소길이)", async () => {
    const { getByPlaceholderText, getByText } = renderResult;
    const email = getByPlaceholderText("이메일");
    const password = getByPlaceholderText("비밀번호");
    await waitFor(() => {
      userEvent.type(email, "test@test.com");
      userEvent.type(password, "1234");
    });
    getByText("비밀번호는 10글자 이상이여야 합니다.");
  });

  it("유효성 검사 에러가 표시되는가 (Password: 필수항목)", async () => {
    const { getByPlaceholderText, getByText, getByRole } = renderResult;
    const email = getByPlaceholderText("이메일");
    const submitBtn = getByRole("button");
    await waitFor(() => {
      userEvent.type(email, "test@test.com");
      userEvent.click(submitBtn);
    });
    getByText("필수 항목입니다.");
  });

  it("폼 전송 후 Mutation 테스팅 + 토큰 테스팅", async () => {
    const { getByPlaceholderText, getByRole, getByText } = renderResult;
    const email = getByPlaceholderText("이메일");
    const password = getByPlaceholderText("비밀번호");
    const submitBtn = getByRole("button");
    const formData = {
      email: "test12@gmail.com",
      password: "test123456",
    };
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          error: 'mutation-error',
          token: "jwt-test-token",
        },
      },
    });
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    jest.spyOn(Storage.prototype, 'setItem')
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1)
    expect(mockedMutationResponse).toHaveBeenCalledWith({
        loginInput: {
            email: formData.email,
            password: formData.password
        }
    })
    getByText("mutation-error")
    expect(localStorage.setItem).toHaveBeenCalledWith("juneats-token", 'jwt-test-token');
  });
});
