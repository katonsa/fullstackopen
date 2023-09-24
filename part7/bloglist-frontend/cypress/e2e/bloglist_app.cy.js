describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.visit('http://localhost:5173');
  });

  afterAll(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
  });

  it('login form is shown', function () {
    cy.visit('http://localhost:5173');
    cy.contains('log in to application');
    cy.get('#username');
    cy.get('#password');
    cy.get('#login-button');
  });

  describe('Login', function () {
    beforeEach(function () {
      const user = {
        name: 'Admin',
        username: 'admin',
        password: 'superdupersecret',
      };
      cy.request('POST', 'http://localhost:3003/api/users', user);
    });

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('admin');
      cy.get('#password').type('superdupersecret');
      cy.get('#login-button').click();

      cy.contains('Admin logged in');
      cy.get('.notification-success').should('contain', 'login successful');
      cy.get('.notification-success').should(
        'have.css',
        'color',
        'rgb(0, 128, 0)',
      );
      cy.get('.notification-success').should(
        'have.css',
        'border-style',
        'solid',
      );
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('admin');
      cy.get('#password').type('superduperwrong');
      cy.get('#login-button').click();

      cy.get('.notification-error').should(
        'contain',
        'invalid username or password',
      );
      cy.get('.notification-error').should(
        'have.css',
        'color',
        'rgb(255, 0, 0)',
      );
      cy.get('.notification-error').should('have.css', 'border-style', 'solid');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      const user = {
        name: 'Admin',
        username: 'admin',
        password: 'superdupersecret',
      };

      cy.createUser(user);
      cy.login({ username: 'admin', password: 'superdupersecret' });
    });

    it('A new blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('React patterns - part 2');
      cy.get('#author').type('Michael Chan');
      cy.get('#url').type('https://reactpatterns.com/');
      cy.get('form > button').click();

      cy.get('.notification-success').should(
        'contain',
        'a new blog React patterns - part 2 by Michael Chan added',
      );
      cy.get('.blog-list').should('contain', 'React patterns - part 2');
    });

    describe('when there are blogs', function () {
      beforeEach(function () {
        cy.createManyBlog([
          {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 3,
          },
          {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
          },
          {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 1,
          },
        ]);
      });

      it('can like a blog', function () {
        cy.get('.blog-list').contains('React patterns Michael Chan').as('blog');
        cy.get('@blog').contains('view').click();
        cy.get('@blog').contains('like').click();
        cy.get('@blog').contains('likes 4');
      });

      it('can delete a blog', function () {
        cy.get('.blog').contains('React patterns Michael Chan').as('blog');
        cy.get('@blog').contains('view').click();
        cy.get('@blog').contains('remove').click();
        cy.get('.blog-list').should(
          'not.contain',
          'React patterns Michael Chan',
        );
      });

      it('only the creator of the blog can see the remove button', function () {
        cy.clearLocalStorage(); // clear all local storage
        const otherUser = {
          name: 'User',
          username: 'user',
          password: 'superdupersecret',
        };

        cy.createUser(otherUser);
        cy.login(otherUser);

        cy.get('.blog-list').contains('React patterns Michael Chan').as('blog');
        cy.get('@blog').contains('view').click();
        cy.get('@blog').should('not.contain', 'remove');
      });

      it('blogs are ordered according to likes', function () {
        cy.get('.blog').eq(0).contains('Go To Statement Considered Harmful');
        cy.get('.blog').eq(1).contains('React patterns Michael Chan');
        cy.get('.blog').eq(2).contains('Canonical string reduction');

        cy.get('.blog').contains('React patterns Michael Chan').as('firstBlog');
        cy.get('@firstBlog').contains('view').click();
        cy.get('@firstBlog').contains('like').click();
        cy.get('@firstBlog').contains('likes 4');
        cy.get('@firstBlog').contains('like').click();
        cy.get('@firstBlog').contains('likes 5');
        cy.get('@firstBlog').contains('like').click();
        cy.get('@firstBlog').contains('likes 6');

        cy.get('.blog').eq(0).contains('React patterns Michael Chan');
        cy.get('.blog').eq(1).contains('Go To Statement Considered Harmful');
        cy.get('.blog').eq(2).contains('Canonical string reduction');
      });
    });
  });
});
