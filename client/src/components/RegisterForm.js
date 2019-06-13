import React from 'react';
import axios from 'axios';
import {Button, Form, Input} from 'reactstrap';



class RegisterForm extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            department:''
        }
    }

    updateField = event => {
        this.setState({
            [event.target.name] : event.target.value,
        })
    }

    submitForm = event => {
        event.preventDefault();
        const creds = { username : this.state.username, password : this.state.password, department : this.state.department }
        axios.post('http://localhost:4000/api/auth/register', creds)
        .then( res => {
            console.log(res);
            this.props.history.push('/login');
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
                    <Input 
                        type="text"
                        name="department"
                        value={this.state.department}
                        placeholder="Department"
                        onChange={this.updateField}
                    />
                    <Button onClick={this.submitForm}>Register</Button>
                </Form>
            </div>
        )
}
}

export default RegisterForm;