describe("로그인 e2e", () => {
  it("홈페이지 진입 & 로그인 페이지 진입", () => {
    cy.visit("/").title().should("eq", "로그인 : Jun Eats");
  });
  it("폼 안에 내용을 넣을 수 있는가", () => {
    cy.visit("/")
      .get('[name="email"]')
      .type("test@gmail.com")
      .get('[name="password"]')
      .type("1234567890")
      .get(".grid > .font-medium")
      .should("not.have.class", "pointer-event-none");
  });
  it("유효성 검사 에러 메시지가 정상 출력 되는가", () => {
    cy.visit("/")
      .get('[name="email"]')
      .type('test@test')
      .get(".font-normal")
      .should("have.text", "유효한 메일 형식을 입력해주세요.")
      .get('[name="password"]')
      .type('1234')
      .get('.grid > :nth-child(4)')
      .should('have.text', '비밀번호는 10글자 이상이여야 합니다.')
  });
});
