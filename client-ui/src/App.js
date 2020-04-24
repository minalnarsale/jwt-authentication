import React, { Component } from 'react';
import './App.css';
import Login from  './component/login'


class App extends Component {

    state = {
        response: '',
        responseToPost: '',
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    };

    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password
            }),
        });
        console.log('response : ' + response);
        const body = await response.text();
        console.log('body : ' + body);
        this.setState({ responseToPost: body });
    };

    render() {
        return (
            <div>
            <div id='signin'><strong><h2>Sign-In</h2></strong></div>
            <div className="App" >
                <p>{this.state.response}</p>
                <form onSubmit={this.handleSubmit}>
                    <p>Email-Id :
                    <input
                        type="email"
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                    /></p>
                    <p>First Name :
                    <input
                        type="text"
                        value={this.state.firstName}
                        onChange={e => this.setState({ firstName: e.target.value })}
                    /></p>
                    <p>Last Name :
                    <input
                        type="text"
                        value={this.state.lastName}
                        onChange={e => this.setState({ lastName: e.target.value })}
                    /></p>
                    <p>Password :
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value })}
                    /></p>
                    <button type="submit">Submit</button>
                </form>
                <p>{this.state.responseToPost}</p>
                <Login>Sign-In</Login>
            </div></div>
        );
    }
}

export default App;
