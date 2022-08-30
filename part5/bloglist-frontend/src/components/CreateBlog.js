const CreateBlog = props => {
    return (
        <>
            <h2>Create new</h2>
            <form onSubmit={(e) => props.handleNewBlog(e)}>
                title: <input /><br />
                author: <input /><br />
                url: <input /><br />
                <button>create</button>
            </form>
        </>
    )
}

export default CreateBlog