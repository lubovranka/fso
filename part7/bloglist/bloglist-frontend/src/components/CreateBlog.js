const CreateBlog = props => {
    return (
        <>
            <h2>Create new</h2>
            <form onSubmit={(e) => props.handleNewBlog(e)}>
                title: <input id="titleInput"/><br />
                author: <input id="authorInput"/><br />
                url: <input id="urlInput"/><br />
                <button id="createBtn">create</button>
            </form>
        </>
    )
}

export default CreateBlog