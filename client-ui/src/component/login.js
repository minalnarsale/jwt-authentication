import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "./buttonComponent";

export default function Login1() {

    return (
        <Router>
            <Link to="/login">Login</Link>
            <Route path="/login">
                <Login />
            </Route>
        </Router>
    );
}

function Login() {

    const [values, handleChange] = useForm({
        email: '',
        password: ''
    });

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // useEffect(()=>{
    //
    //     console.log("check");
    //     setUsername("hello");
    //     setPassword("xyz");
    //     //write code after submit onclick
    // });

    return (
        <div id='login'>
            <p>Email-Id :
                <input
                    type='email'
                    name='firstName'
                    onChange={handleChange}
                /></p>
            <p>Password :
                <input
                    type='password'
                    name='password'
                    onChange={handleChange}
                /></p>
            <Button label='Submit'></Button>
        </div>
    );
}

const useForm = initialValues => {
    const [values, setValues] = useState(initialValues);

    return [
        values,
        e => {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            });
        }
    ];
};