import { ALL_BOOKS, ALL_GENRES } from "../queries"
import { useApolloClient, useQuery } from '@apollo/client'
import { useState } from "react"

const Books = (props) => {
  const client = useApolloClient()
  const [filter, setFilter] = useState('')
  const books = useQuery(ALL_BOOKS, {
    variables: {
      genre: filter
    }
  })
  const genres = useQuery(ALL_GENRES)
  client.refetchQueries({
    include: 'all'
  })
  
  if (!props.show) {
    return null
  }

  if (books.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      <p>in {filter ? `genre ${filter}` : 'all genres'}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.data.allGenres.map(genre => (
        <button onClick={() => setFilter(genre)} key={genre}>{genre}</button>
      ))}
      <button onClick={() => setFilter('')}>all genres</button>
    </div>
  )
}

export default Books
