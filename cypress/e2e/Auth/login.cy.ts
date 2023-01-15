import { TEST_EMAIL, TEST_PW } from "../../testingConstants";

describe("Login", () => {
  it("should see login page", () => {
    cy.visit("/").title().should("eq", "Login | SnapSnacks");
  });
  it("can fill out the form", () => {
    //@ts-ignore
    cy.login(TEST_EMAIL, TEST_PW);
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
