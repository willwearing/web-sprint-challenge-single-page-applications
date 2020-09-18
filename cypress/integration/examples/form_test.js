describe("Sprint Tests for Pizza Ordering Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/OrderForm");
  });
  it("Testing Form Functionality", () => {
    cy.get('[name="name"]').type("William").should("have.value", "William");
    cy.get('[name="size"]').select("Large").should("have.value", "Large");
    cy.get('[name="tomato"]').check();
    cy.get('[name="pepperoni"]').check();
    cy.get('[name="special"]')
      .type("Add extra cheese and pepperoni, please")
      .should("have.value", "Add extra cheese and pepperoni, please");
    cy.get('[name="button"]').click();
  });
});
