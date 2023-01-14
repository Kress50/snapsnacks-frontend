describe("Login", () => {
  it("should see login page", () => {
    cy.visit("/").title().should("eq", "Login | SnapSnacks");
  });
  it("can fill out the form", () => {
    cy.visit("/");
    cy.findByPlaceholderText("email").type("client@we.com");
    cy.findByPlaceholderText("password").type("112233");
    cy.findByText("Log In")
      .should("not.have.class", "pointer-events-none")
      .click();
    cy.window().its("localStorage.token").should("be.a", "string");
  });
  it("can see email and pw validation errors", () => {
    cy.visit("/");
    cy.findByPlaceholderText("email").type("wrong");
    cy.findByRole("error").should("have.text", "This email is not valid");
    cy.findByPlaceholderText("email").clear();
    cy.findByRole("error").should("have.text", "Email is required");
    cy.findByPlaceholderText("email").type("test@email.com");
    cy.findByPlaceholderText("password").type("d").clear();
    cy.findByRole("error").should("have.text", "Password is required");
  });
});
