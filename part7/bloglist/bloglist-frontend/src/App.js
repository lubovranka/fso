import { useEffect, useRef } from 'react';
import Blogs from './components/Blogs';
import CreateBlog from './components/CreateBlog';
import Toggleable from './components/Toggleable';
import blogService from './services/blogs';
import loginService from './services/login';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs, setBlogs } from './reducers/blogsReducer';
import { setUser } from './reducers/userReducer';
import { createMessage, deleteMessage } from './reducers/messageReducer';
import { Routes, Route, useMatch } from 'react-router-dom';
import Users from './components/Users';
import User from './components/User';
import BlogView from './components/BlogView';
import Navigation from './components/Navigation';

const App = () => {
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs);
    const user = useSelector((state) => state.user);
    // const message = useSelector((state) => state.message);
    const newBlogRef = useRef();
    const match = useMatch('/users/:id');

    useEffect(() => {
        dispatch(initializeBlogs());
    }, []);

    useEffect(() => {
        const storedUser = window.localStorage.getItem('loggedInBlogsUser');
        if (storedUser) {
            const thisUser = JSON.parse(storedUser);
            dispatch(setUser(thisUser));
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const newUser = await loginService.login({
                username: e.target[0].value,
                password: e.target[1].value,
            });

            window.localStorage.setItem(
                'loggedInBlogsUser',
                JSON.stringify(newUser)
            );

            dispatch(setUser(newUser));
            e.target[0].value = '';
            e.target[1].value = '';
        } catch (err) {
            dispatch(createMessage({ message: err, type: 'error' }));
            setTimeout(() => {
                dispatch(deleteMessage());
            }, 5000);
        }
    };

    const handleLogout = () => {
        window.localStorage.removeItem('loggedInBlogsUser');
        dispatch(setUser(null));
    };

    const handleNewBlog = async (e) => {
        e.preventDefault();
        try {
            blogService.setToken(user.token);
            await blogService.create({
                title: e.target[0].value,
                author: e.target[1].value,
                url: e.target[2].value,
            });
            dispatch(setBlogs(await blogService.getAll()));
            newBlogRef.current.toggleVisibility();

            dispatch(
                createMessage({
                    message: `a new blog ${e.target[0].value} by ${e.target[1].value} added`,
                    type: 'success',
                })
            );
            setTimeout(() => {
                dispatch(deleteMessage());
            }, 5000);
            e.target[0].value = '';
            e.target[1].value = '';
            e.target[2].value = '';
        } catch (err) {
            dispatch(
                createMessage({
                    message: err.response.data.error,
                    type: 'error',
                })
            );
            setTimeout(() => {
                dispatch(deleteMessage());
            }, 5000);
        }
    };

    const handleLike = async (liked) => {
        try {
            blogService.setToken(user.token);
            await blogService.like(liked);
            dispatch(setBlogs(await blogService.getAll()));
            dispatch(
                createMessage({
                    message: `Liked ${liked.title}`,
                    type: 'success',
                })
            );
            setTimeout(() => {
                dispatch(deleteMessage());
            }, 5000);
        } catch (err) {
            console.log(err);
            dispatch(
                createMessage({
                    message: err.response.data.error,
                    type: 'error',
                })
            );
            setTimeout(() => {
                dispatch(deleteMessage());
            }, 5000);
        }
    };

    const handleDelete = async (blog) => {
        try {
            blogService.setToken(user.token);
            await blogService.deleteBlog(blog.id);
            dispatch(setBlogs(await blogService.getAll()));
            dispatch(
                createMessage({
                    message: `Deleted ${blog.title}`,
                    type: 'success',
                })
            );
            setTimeout(() => {
                dispatch(deleteMessage());
            }, 5000);
        } catch (err) {
            console.log(err);
            dispatch(
                createMessage({
                    message: err.response.data.error,
                    type: 'error',
                })
            );
            setTimeout(() => {
                dispatch(deleteMessage());
            }, 5000);
        }
    };

    if (!user) {
        return (
            <div>
                <h2>Log in to application</h2>
                <form onSubmit={handleLogin}>
                    username
                    <input name="username" type="text" id="usernameInput" />
                    <br />
                    password
                    <input name="password" type="password" id="passwordInput" />
                    <br />
                    <button type="submit" id="loginBtn">
                        login
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div>
            <Navigation name={user.name} handleLogout={handleLogout}/>
            <h2>blogs</h2>
            <br />
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            <Toggleable ref={newBlogRef}>
                                <CreateBlog handleNewBlog={handleNewBlog} />
                            </Toggleable>
                            <br />
                            <br />
                            <div className="blogs">
                                {blogs.map((blog) => (
                                    <Blogs
                                        key={blog.id}
                                        blog={blog}
                                        handleLike={handleLike}
                                        handleDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        </div>
                    }
                />
                <Route path="/users" element={<Users />} />
                <Route
                    path="/users/:id"
                    element={<User id={match?.params.id} />}
                />
                <Route
                    path="/blogs/:id"
                    element={<BlogView handleLike={handleLike} />}
                />
            </Routes>
        </div>
    );
};

export default App;
