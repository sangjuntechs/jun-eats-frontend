describe('프로필 업데이트 e2e', () => {
    it('로그인 후 프로필 업데이트 진입', () => {
    cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
        if(req.body?.operationName === "editProfile") {
            //@ts-ignore
            req.body?.variables?.input?.email = "qkrtkdwns050@naver.com"
        }
    })
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
    cy.get('.svg-inline--fa').click()
    cy.title().should('eq', '유저 정보 변경 : Jun Eats')
    cy.findByPlaceholderText('이메일').clear()
    cy.findByPlaceholderText('이메일').type('newemail@gmail.com')
    cy.get('.grid > .font-medium').click()
    cy.wait(2000)
    })
})