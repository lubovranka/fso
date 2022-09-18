import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`;

export const ALL_BOOKS = gql`
    query getAllBooks($genre: String) {
        allBooks(genre: $genre) {
            title
            author {
                name
            }
            published
            genres
        }
    }
`;

export const ALL_GENRES = gql`
    query {
        allGenres
    }
`

export const CREATE_BOOK = gql`
    mutation createBook(
        $title: String!
        $author: String!
        $published: Int!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            title
        }
    }
`;

export const UPDATE_AUTHOR = gql`
    mutation updateAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`;

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
        }
    }
`;

export const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        author {
            name
        }
        published
        genres
    }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
${BOOK_DETAILS}
`