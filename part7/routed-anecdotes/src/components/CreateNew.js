import { useNavigate } from 'react-router-dom'
import { useField } from "./hooks"

const CreateNew = (props) => {
    const [content, resetContent] = useField('text', 'content')
    const [author, resetAuthor] = useField('text', 'author')
    const [info, resetInfo] = useField('text', 'info')
  
    const navigate = useNavigate()
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      props.setNotification(`a new anecdote ${content} created!`)
      navigate('/')
    }

    const handleReset = () => {
      resetContent()
      resetAuthor()
      resetInfo()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button>create</button>
          <button type='reset'>reset</button>
        </form>
      </div>
    )
  
  }

export default CreateNew