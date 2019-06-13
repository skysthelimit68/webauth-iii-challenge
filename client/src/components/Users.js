import React from 'react';
import axios from 'axios';
import User from './User';
import { axiosWithAuth } from "../axiosWithAuth";
import { Button } from 'reactstrap';
  

//axios.defaults.withCredentials = true; 

class Users extends React.Component {
    constructor() {
        super();
        this.state = {
            users : []
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {
        let users = await axiosWithAuth().get("http://localhost:4000/api/users/");
        this.setState({
            users: users.data
        })
        console.log(this.state.users);

    }
    handleLogout = event =>  {
        event.preventDefault();
        localStorage.removeItem("token");
        this.props.history.push('/login');

    }
   

    render() {
        return(
            <div>
                {this.state.users.map(user => <User user={user} key={user.id}/> )}
                <div>
                    <Button onClick={this.handleLogout}>Logout</Button>
                </div>
            </div>
        )

        
    }

}

export default Users;