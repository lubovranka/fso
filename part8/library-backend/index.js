import typeDefs from './graphql/typedefs.js';
import resolvers from './graphql/resolvers.js';
import User from './models/user.js';
import DataLoader from 'dataloader'

import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

dotenv.config();

try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log('connected to MongoDB');
} catch (e) {
    console.log('connection error: ', e);
}

mongoose.set('debug', true);

const start = async () => {
    const app = express();
    const httpServer = http.createServer(app);

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const subscriptionServer = SubscriptionServer.create(
        {
            schema,
            execute,
            subscribe,
        },
        {
            server: httpServer,
            path: '',
        }
    );

    const server = new ApolloServer({
        schema,
        context: async ({ req }) => {
            let currentUser
            const auth = req ? req.headers.authorization : null;
            if (auth && auth.startsWith('bearer ')) {
                const decodedToken = jwt.verify(
                    auth.substring(7),
                    process.env.JWT_SECRET
                );
                currentUser = await User.findById(decodedToken.id);
            }
            const bookLoader = new DataLoader(async keys => {
                console.log(keys)
            })
            return { currentUser, bookLoader };
        },
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close();
                        },
                    };
                },
            },
        ],
    });

    await server.start();

    server.applyMiddleware({
        app,
        path: '/',
    });

    const PORT = 4000;

    httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

start();
