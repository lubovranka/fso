import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { LOGIN } from "../queries";

const LoginForm = ({show, setToken, setPage}) => {
    const [login, result] = useMutation(LOGIN)

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.token
            setToken(token)
            localStorage.setItem('library-user-token', token)
            setPage('authors')
        }
    }, [result.data]) //eslint-disable-line

    if (!show) {
        return null
    }

    const handleSubmit = e => {
        e.preventDefault()
        login({
            variables: {
                username: e.target.username.value,
                password: e.target.password.value
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <br />
            name <input name="username" type="text" /><br />
            password <input name="password" type="text" /><br />
            <button>login</button>
        </form>
    );
};

export default LoginForm;
