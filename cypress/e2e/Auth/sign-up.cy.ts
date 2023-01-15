import { TEST_EMAIL, TEST_PW } from "../../testingConstants";

describe("Sign up", () => {
  it("can visit sign up page", () => {
    cy.visit("/");
    cy.findByText("Create Snapsnacks Account!").click();
    cy.title().should("eq", "SignUp | SnapSnacks");
  });
  it("can see email and pw validation errors", () => {
    cy.visit("/sign-up");
    cy.findByPlaceholderText("email").type("wrong");
    cy.findByRole("error").should("have.text", "This email is not valid");
    cy.findByPlaceholderText("email").clear();
    cy.findByRole("error").should("have.text", "Email is required");
    cy.findByPlaceholderText("email").type(TEST_EMAIL);
    cy.findByPlaceholderText("password").type("d").clear();
    cy.findByRole("error").should("have.text", "Password is required");
    cy.findAllByText("Sign Up").should("have.class", "pointer-events-none");
  });
  it("create and login", () => {
    cy.intercept("http://localhost:4000/graphql", (req) => {
      const { operationName } = req.body;
      if (operationName && operationName === "CreateAccountMutation") {
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
      }
    });
    cy.visit("/sign-up");
    cy.findByPlaceholderText("email").type(TEST_EMAIL);
    cy.findByPlaceholderText("password").type(TEST_PW);
    cy.findByText("Sign Up").click();
    cy.wait(1000);
    //@ts-ignore
    cy.login(TEST_EMAIL, TEST_PW);
  });
});
