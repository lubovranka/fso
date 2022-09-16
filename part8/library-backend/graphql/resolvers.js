import { v4 as uuidv4 } from 'uuid';
import Book from '../models/book.js';
import Author from '../models/author.js';
import User from '../models/user.js';
import { UserInputError } from 'apollo-server';
import jwt from 'jsonwebtoken';

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.author) {
                const author = await Author.find({ name: args.author });
                return await Book.find({ author: author });
            }

            if (args.genre) {
                return Book.find({ genres: args.genre });
            }

            return Book.find({});
        },
        allAuthors: async () => Author.find({}),
        me: (root, args, context) => context.currentUser,
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
                throw new Error('Invalid user')
            }

            let book;
            const author = await Author.findOne({ name: args.author });
            if (!author) {
                const newAuthor = new Author({
                    name: args.author,
                    id: uuidv4(),
                });
                await newAuthor.save();
                book = new Book({ ...args, id: uuidv4(), author: newAuthor });
            }
            book = new Book({ ...args, id: uuidv4(), author: author });
            try {
                await book.save();
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args,
                });
            }

            return book;
        },
        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                throw new Error('Invalid user')
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
};

export default resolvers;
