import { v4 as uuidv4 } from 'uuid';
import Book from '../models/book.js';
import Author from '../models/author.js';
import User from '../models/user.js';
import { UserInputError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.author) {
                const author = await Author.find({ name: args.author });
                return await Book.find({ author: author }).populate('author');
            }

            if (args.genre) {
                return Book.find({ genres: args.genre }).populate('author');
            }

            return await Book.find({}).populate('author');
        },
        allAuthors: async () => Author.find({}),
        me: (root, args, context) => context.currentUser,
        allGenres: async () => {
            const books = await Book.find({});
            const genres = new Set(
                books.flatMap((book) => {
                    return book.genres;
                })
            );

            return genres
        },
    },
    Author: {
        bookCount: async (root) => {
            const author = await Author.find({ author: root.name });
            return (await Book.find({ author: author })).length;
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                throw new Error('Invalid user');
            }

            let book;
            const author = await Author.findOne({ name: args.author });
            if (!author) {
                const author = new Author({
                    name: args.author,
                    id: uuidv4(),
                });
                const newAuthor = await author.save();
                book = new Book({ ...args, id: uuidv4(), author: newAuthor.id });
            } else {
                book = new Book({ ...args, id: uuidv4(), author: author });
            }
            try {
                const savedBook = await book.save();
                pubsub.publish('BOOK_ADDED', {bookAdded: book})
                return savedBook
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args,
                });
            };
        },
        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                throw new Error('Invalid user');
            }

            const updatedAuthor = await Author.findOneAndUpdate(
                { name: args.name },
                { name: args.name, born: args.setBornTo },
                { runValidators: true, lean: true, returnDocument: 'after' }
            );
            return updatedAuthor || null;
        },
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favouriteGenre: args.favouriteGenre,
            });

            try {
                return user.save();
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args,
                });
            }
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });
            if (!user || args.password !== 'secret') {
                throw new UserInputError('wrong credentials');
            }
            const userForToken = {
                username: args.username,
                id: user.id,
            };
            return { token: jwt.sign(userForToken, process.env.JWT_SECRET) };
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        }
    }
};

export default resolvers;
