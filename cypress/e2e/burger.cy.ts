const selectors = {
  ingredientCard: '[data-testid^=ingredient-card-]',
  ingredientCardBun: '[data-testid="ingredient-card-bun"]',
  ingredientCardMain: '[data-testid="ingredient-card-main"]',
  constructor: '[data-testid=burger-constructor]',
  modal: '[data-testid=modal]',
  modalCloseButton: '[data-testid="modal_closeButton"]',
};

describe('Burger Constructor Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Открывает и закрывает модальное окно ингредиента', () => {
    cy.get(selectors.ingredientCard).first().click();

    cy.get(selectors.modal).should('exist');
    cy.contains('ккал').should('exist');

    cy.get(selectors.modalCloseButton).filter(':visible').click();
    cy.get(selectors.modal).should('not.exist');
  });

  it('Позволяет перетаскивать ингредиенты в конструктор', () => {
    cy.get(selectors.constructor).as('constructor');
    cy.get(selectors.ingredientCardBun).first().as('bun');
    cy.get(selectors.ingredientCardMain).first().as('main');

    cy.get('@bun').trigger('dragstart');
    cy.get('@constructor').trigger('drop');

    cy.get('@main').trigger('dragstart');
    cy.get('@constructor').trigger('drop');

    cy.get('@constructor').contains('(верх)').should('exist');
    cy.get('@constructor').contains('(низ)').should('exist');
    cy.get('@constructor').contains('Выберите начинку').should('not.exist');
  });

  it('Редиректит на /login при попытке оформить заказ без авторизации', () => {
    cy.get(selectors.ingredientCardBun).first().trigger('dragstart');
    cy.get(selectors.constructor).trigger('drop');

    cy.get(selectors.ingredientCardMain).first().trigger('dragstart');
    cy.get(selectors.constructor).trigger('drop');

    cy.contains('Оформить заказ').click();
    cy.url().should('include', '/login');
  });
});

describe('Оформление заказа (mock)', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');
    cy.visit('/');
  });

  it('Проходит путь от сборки бургера до получения номера заказа', () => {
    cy.window().its('store').invoke('dispatch', {
      type: 'auth/login/fulfilled',
      payload: {
        user: { email: 'test@example.com', name: 'Cypress Test User' },
        accessToken: 'Bearer mock-token',
        refreshToken: 'mock-refresh',
      }
    });

    cy.get(selectors.constructor).as('constructor');
    cy.get(selectors.ingredientCardBun).first().as('bun');
    cy.get(selectors.ingredientCardMain).first().as('main');

    cy.get('@bun').trigger('dragstart');
    cy.get('@constructor').trigger('drop');

    cy.get('@main').trigger('dragstart');
    cy.get('@constructor').trigger('drop');

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get(selectors.modal).should('exist');
    cy.contains('1234').should('exist');

    cy.get(selectors.modalCloseButton).filter(':visible').click();
    cy.get(selectors.modal).should('not.exist');
  });
});
