import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries';

const Authors = (props) => {
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const authors = useQuery(ALL_AUTHORS);
    const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    });

    const handleAuthorUpdate = (e) => {
        e.preventDefault();
        updateAuthor({
            variables: {
                name: selectedAuthor,
                setBornTo: Number(e.target.authorBorn.value),
            },
        });
    };

    const handleSelectChange = (e) => {
        setSelectedAuthor(e.target.value)
    };

    if (!props.show) {
        return null;
    }

    if (authors.loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.data.allAuthors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>set birthyear</h2>
            <form onSubmit={handleAuthorUpdate}>
                <select value={selectedAuthor} onChange={handleSelectChange}>
                    {authors.data.allAuthors.map((a) => (
                        <option key={a.name} value={a.name}>
                            {a.name}
                        </option>
                    ))}
                </select>
                <br />
                born <input name="authorBorn" type="number" />
                <br />
                <button>update author</button>
            </form>
        </div>
    );
};

export default Authors;
