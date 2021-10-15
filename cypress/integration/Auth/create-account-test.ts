describe("회원가입 e2e", () => {
  it("회원가입 페이지 진입 e2e", () => {
    cy.visit("/");
    cy.findByText("여기를 클릭하세요!").click();
    cy.findByPlaceholderText("이메일").type("test@bad");
    cy.findByText("유효한 메일 형식을 입력해주세요.");
    cy.findByPlaceholderText("비밀번호").type("1234");
    cy.findByText("비밀번호는 10글자 이상이여야 합니다.");
    cy.findByPlaceholderText("이메일").clear();
    cy.findByText("필수 항목입니다.");
    cy.findByPlaceholderText("이메일").type("qkrtkdwns050@naver.com");
    cy.findByPlaceholderText("비밀번호").clear();
    cy.findByText("필수 항목입니다.");
    cy.findByPlaceholderText("비밀번호").type("1234567890");
    cy.findByRole("button").click();
    cy.findByText("같은 이메일이 이미 존재합니다.");
  });
  it("회원가입 후 로그인 e2e", () => {
    cy.intercept("http://localhost:4000/graphql", (req) => {
      req.reply((res) => {
        res.send({
          data: {
            createAccount: {
              ok: true,
              error: null,
              __typename: "CreateAccountOutput",
            },
          },
        });
      });
    });
    cy.visit('/create-account')
    cy.findByPlaceholderText("이메일").type("qkrtkdwns050@naver.com");
    cy.findByPlaceholderText("비밀번호").type("1234567890");
    cy.findByRole("button").click();
    cy.title().should('eq', '로그인 : Jun Eats')
  });
});
