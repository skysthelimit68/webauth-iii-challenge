import React from 'react';
import axios from 'axios';
import {Button, Form, Input} from 'reactstrap';



class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    updateField = event => {
        this.setState({
            [event.target.name] : event.target.value,
        })
    }

    submitForm = event => {
        event.preventDefault();
        const creds = { username : this.state.username, password : this.state.password}
        axios.post('http://localhost:4000/api/auth/login', creds)
        .then( res => {
            console.log(res);
            localStorage.setItem("token", res.data.token)
            this.props.history.push('/users');
        })
        .catch( error => {
            console.log(error)
        })

        this.setState({
            username : "",
            password: ""
        })
        
}
    render() {
        return (
            <div className="forms">
                <Form>
                    <Input 
                        type="text"
                        name="username"
                        value={this.state.username}
                        placeholder="Username"
                        onChange={this.updateField}
                    />
                    <Input 
                        type="password"
                        name="password"
                        value={this.state.password}
                        placeholder="Password"
                        onChange={this.updateField}
                    />
                    <Button onClick={this.submitForm}>Login</Button>
                </Form>
            </div>
        )
}
}

export default LoginForm;