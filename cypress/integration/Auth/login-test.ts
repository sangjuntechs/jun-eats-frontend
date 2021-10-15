describe("로그인 e2e", () => {
  it("홈페이지 진입 & 로그인 페이지 진입", () => {
    cy.visit("/").title().should("eq", "로그인 : Jun Eats");
  });
  it("유효성 검사 에러 메시지가 정상 출력 되는가", () => {
    cy.visit("/")
      .get('[name="email"]')
      .type("test@test")
      .get(".font-normal")
      .should("have.text", "유효한 메일 형식을 입력해주세요.")
      .get('[name="email"]')
      .clear()
      .get(".font-normal")
      .should("have.text", "필수 항목입니다.")
      .get('[name="password"]')
      .type("1234")
      .get(".grid > :nth-child(4)")
      .should("have.text", "비밀번호는 10글자 이상이여야 합니다.")
      .get('[name="password"]')
      .clear()
      .get(".grid > :nth-child(4)")
      .should("have.text", "필수 항목입니다.");
  });

  it("로그인이 가능한가", () => {
    cy.visit("/")
      .get('[name="email"]')
      .type("qkrtkdwns050@naver.com")
      .get('[name="password"]')
      .type("tkdwns1234");
    cy.findByRole("button")
      .should("not.have.class", "pointer-event-none")
      .click();
    cy.window().its("localStorage.juneats-token").should("be.a", "string");
    cy.wait(2000)
  });
});

