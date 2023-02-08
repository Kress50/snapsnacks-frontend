import {
  TEST_EMAIL,
  TEST_EMAIL_CHANGED,
  TEST_PW,
} from "../../testingConstants";

describe("Edit Profile", () => {
  it("should go to edit profile", () => {
    //@ts-ignore
    cy.login(TEST_EMAIL, TEST_PW);
    cy.title().should("eq", "Restaurants | SnapSnacks");
    cy.findByRole("profile-button").click();
    cy.title().should("eq", "Edit Profile | SnapSnacks");
  });
  it("should change email", () => {
    cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
      if (req.body?.operationName === "EditAccountMutation") {
        //@ts-ignore
        req.body?.variables?.editAccountInput?.email = "test@email.com";
      }
    });
    //@ts-ignore
    cy.login(TEST_EMAIL, TEST_PW);
    cy.visit("/edit-profile");
    cy.findAllByPlaceholderText("email").clear().type(TEST_EMAIL_CHANGED);
    cy.findByText("Update Profile").click();
  });
});
