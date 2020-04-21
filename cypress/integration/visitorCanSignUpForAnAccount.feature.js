describe("Visitor can", () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: "GET",
      url: "**/communities/**",
      response: "fixture:community_code_response.json",
    })
    cy.visit("/")
  })

  it("succesfully send in a invitation code and receive community code", () => {
    cy.get("#sign-up-button").contains("Sign up").click()
    cy.get("#secret-code").type("paYljxCDcjGE")
    cy.get("#code-submit-button").contains("Submit").click()
    cy.get("#community-code-message").should(
      "contain",
      "Your code works! Continue with the sign up"
    )
  })
})

describe("Visitor can", () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: "GET",
      url: "**/communities/**",
      response: "fixture:community_code_error.json",
    })
    cy.visit("/")
  })

  it("unsuccesfully send in a invitation code and not receive community code", () => {
    cy.get("#sign-up-button").contains("Sign up").click()
    cy.get("#secret-code").type("letmeinplz")
    cy.get("#code-submit-button").contains("Submit").click()
    cy.get("#community-code-message").should(
      "contain",
      "There is unfortunately no community with this code, did you type it correctly?"
    )
  })
})
