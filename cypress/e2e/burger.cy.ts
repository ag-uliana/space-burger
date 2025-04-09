describe('Burger Constructor Page', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('Открывает и закрывает модальное окно ингредиента', () => {
      cy.get('[data-testid^=ingredient-card-]').first().click();
  
      cy.get('[data-testid=modal]').should('exist');
      cy.contains('ккал').should('exist');
  
      cy.get('[data-testid=modal_closeButton]').filter(':visible').click();
      cy.get('[data-testid=modal]').should('not.exist');
    });
  
    it('Позволяет перетаскивать ингредиенты в конструктор', () => {
      cy.get('[data-testid="ingredient-card-bun"]').first().as('bun');
      cy.get('[data-testid="ingredient-card-main"]').first().as('main');
  
      cy.get('@bun').trigger('dragstart');
      cy.get('[data-testid=burger-constructor]').trigger('drop');
  
      cy.get('@main').trigger('dragstart');
      cy.get('[data-testid=burger-constructor]').trigger('drop');
  
      cy.get('[data-testid=burger-constructor]').contains('(верх)').should('exist');
      cy.get('[data-testid=burger-constructor]').contains('(низ)').should('exist');
      cy.get('[data-testid=burger-constructor]').contains('Выберите начинку').should('not.exist');
    });
  
    it('Редиректит на /login при попытке оформить заказ без авторизации', () => {
      cy.get('[data-testid="ingredient-card-bun"]').first().trigger('dragstart');
      cy.get('[data-testid=burger-constructor]').trigger('drop');
  
      cy.get('[data-testid="ingredient-card-main"]').first().trigger('dragstart');
      cy.get('[data-testid=burger-constructor]').trigger('drop');
  
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
      
    cy.get('[data-testid="ingredient-card-bun"]').first().trigger('dragstart');
    cy.get('[data-testid=burger-constructor]').trigger('drop');

    cy.get('[data-testid="ingredient-card-main"]').first().trigger('dragstart');
    cy.get('[data-testid=burger-constructor]').trigger('drop');

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get('[data-testid=modal]').should('exist');
    cy.contains('1234').should('exist');

    cy.get('[data-testid="modal_closeButton"]').filter(':visible').click();
    cy.get('[data-testid=modal]').should('not.exist');
  });
}); 
