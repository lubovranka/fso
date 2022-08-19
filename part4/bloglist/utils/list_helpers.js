const totalLikes = blogs => {
    return blogs.reduce((total, current) => {
        return total += current.likes
    }, 0)
}

const favoriteBlog = blogs => {
    const favorite = blogs.sort((a, b) => b.likes - a.likes)[0]
    const result = { title: favorite.title, author: favorite.author, likes: favorite.likes }
    return result
}

const mostBlogs = blogs => {
    const authors = blogs.reduce((prev, cur) => {
        if (prev.length && prev.some(author => author.author === cur.author)) {
            return prev = prev.map(author => author.author === cur.author ? {...author, blogs: author.blogs += 1} : {...author})
        } else {
            return prev = [...prev, {author: cur.author, blogs: 1}]
        }
    }, [])

    const top = authors.sort((a, b) => b.blogs - a.blogs)[0]
    return top
}

const mostLikes = blogs => {
    const authors = blogs.reduce((prev, cur) => {
        if (prev.length && prev.some(author => author.author === cur.author)) {
            return prev = prev.map(author => author.author === cur.author ? {...author, likes: author.likes += cur.likes} : {...author})
        } else {
            return prev = [...prev, {author: cur.author, likes: cur.likes}]
        }
    }, [])

    const top = authors.sort((a, b) => b.blogs - a.blogs)[0]
    return top
}



module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes }