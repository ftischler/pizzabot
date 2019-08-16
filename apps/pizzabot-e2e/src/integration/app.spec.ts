import { getGreeting } from '../support/app.po';

describe('pizzabot', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to pizzabot!');
  });
});
