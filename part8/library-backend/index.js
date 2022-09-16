import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/typedefs.js';
import resolvers from './graphql/resolvers.js';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from './models/user.js';

dotenv.config();

try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log('connected to MongoDB');
} catch (e) {
    console.log('connection error: ', e);
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            try {
                const decodedToken = jwt.verify(
                    auth.substring(7),
                    process.env.JWT_SECRET
                );
                const currentUser = await User.findById(decodedToken.id);
                return { currentUser };
            } catch (e) {
                return { currentUser: null };
            }
        }
    },
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
