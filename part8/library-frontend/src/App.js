import { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import { useApolloClient, useSubscription } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED } from './queries';

const App = () => {
    const client = useApolloClient();
    const [page, setPage] = useState('authors');
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem('library-user-token'));
    }, []);

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            console.log(subscriptionData);
            const addedBook = subscriptionData.data.bookAdded;

            client.cache.updateQuery({ query: ALL_BOOKS }, ({ allPersons }) => {
                return {
                    allPersons: allPersons.concat(addedBook),
                };
            });
        },
    });

    const handleLogout = () => {
        setToken(null);
        localStorage.clear();
        client.resetStore();
        setPage('login');
    };
    
    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {token && (
                    <button onClick={() => setPage('add')}>add book</button>
                )}
                {token ? (
                    <button onClick={handleLogout}>logout</button>
                ) : (
                    <button onClick={() => setPage('login')}>login</button>
                )}
            </div>

            <Authors show={page === 'authors'} />

            <Books show={page === 'books'} />

            <NewBook show={page === 'add'} />

            <LoginForm
                show={page === 'login'}
                setToken={setToken}
                setPage={setPage}
            />
        </div>
    );
};

export default App;
