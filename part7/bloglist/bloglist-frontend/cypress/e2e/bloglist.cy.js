describe('Bloglist', () => {
    beforeEach(() => {
        /* RESET DB */
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        // CREATE NEW USERS
        const user = {
          name: 'Cypress test',
          password: 'imcypress',
          username: 'cypress'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.wait(500)
        cy.request('POST', 'http://localhost:3003/api/users', {name: 'randomGuy', username: 'random', password: 'random'})

        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', () => {
      cy.contains('Log in to application')
    })

    describe('Login', () => {
      it('success with correct credentials', () => {
        cy.get('#usernameInput').type('cypress')
        cy.get('#passwordInput').type('imcypress')
        cy.get('#loginBtn').click()
        cy.contains('Cypress test logged in')
      })

      it('fails with wrong credentials', () => {
        cy.get('#usernameInput').type('cypress')
        cy.get('#passwordInput').type('imnotcypress')
        cy.get('#loginBtn').click()
        cy.get('.error').contains('invalid username or password')
        cy.get('.error').should('have.css', 'color', 'rgb(250, 0, 4)')
        cy.get('.error').should('have.css', 'border-style', 'solid')
      })
    })

    describe('When logged in', () => {
      beforeEach(() => {
        cy.get('#usernameInput').type('cypress')
        cy.get('#passwordInput').type('imcypress')
        cy.get('#loginBtn').click()
        cy.get('#toggleCreate').click()
        cy.get('#titleInput').type('Cypress article')
        cy.get('#authorInput').type('by Cypress')
        cy.get('#urlInput').type('http://test.cypress')
        cy.get('#createBtn').click()
      })

      it('a blog can be created', () => {
        cy.get('.blogs').contains('Cypress article by Cypress')
      })

      it('a blog can be liked', () => {
        cy.get('.descToggler').click()
        cy.get('#likeBtn').click()
        cy.get('.desc').contains('likes: 1')
      })

      it('owner can delete blog', () => {
        cy.get('.descToggler').click()
        cy.get('#deleteBtn').click()
        cy.get('.blog').should('not.exist')
      })

      it('blogs are in order', () => {
        cy.get('#toggleCreate').click()
        cy.get('#titleInput').type('Cypress article 2')
        cy.get('#authorInput').type('by Cypress')
        cy.get('#urlInput').type('http://test.cypress')
        cy.get('#createBtn').click()
        cy.get('#toggleCreate').click()
        cy.get('#titleInput').type('Cypress article 3')
        cy.get('#authorInput').type('by Cypress')
        cy.get('#urlInput').type('http://test.cypress')
        cy.get('#createBtn').click()

        cy.get('.descToggler').eq(1).click()
        cy.get('.blog').eq(1).within(() => {
          cy.get('#likeBtn').click()
        })
        cy.wait(500)
        cy.get('.blog').eq(0).within(() => {
          cy.get('#header').contains('Cypress article 2 by Cypress')
        })
      })
    })
})