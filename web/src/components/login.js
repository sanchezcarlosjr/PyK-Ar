import {Component} from "react"


class Login extends Component {
    state = {
        username: ``,
        password: ``,
    }
    handleUpdate = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    handleSubmit = event => {
        event.preventDefault()
    }
    render() {
        return (
            <>
                <h1>Log in</h1>
                <form
                    method="post"
                    onSubmit={event => {
                        this.handleSubmit(event)
                    }}
                >
                    <label>
                        Username
                        <input type="text" name="username" onChange={this.handleUpdate} />
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            onChange={this.handleUpdate}
                        />
                    </label>
                    <input type="submit" value="Log In" />
                </form>
            </>
        )
    }
}
export default Login