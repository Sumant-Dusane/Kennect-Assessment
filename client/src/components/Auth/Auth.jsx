import React, { useState } from 'react';
import "./auth.scss";
import { endpoint, getCurrentUser, setCurrentUser } from '../../constants/constants';

export default function Auth() {
    const [currentTab, setCurrentTab] = useState(0);
    const currentUser = getCurrentUser();
    if(currentUser) {
        window.location.href = '/';
        return
    }
    async function loginUser(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const body = {
            email: data.get('email'),
            password: data.get('password')
        };
        try {
            const response = await fetch(endpoint + "login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            });
            
            if(!response.ok) {
                if(response.status == 400) {
                    alert("Fill Form Properly");
                }
                if(response.status == 401) {
                    alert("Wrong Password");
                }
                if(response.status == 403) {
                    alert("No such user");
                }
                return
            }
            const data = await response.json();
            alert("Logged In");
            setCurrentUser(data)
            window.location.href = '/';
        } catch (err) {
            console.log(err);
        }
    }
    async function signupUser(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const body = {
            name : data.get('fname'),
            email : data.get('email'),
            password : data.get('password')
        }
        await fetch(endpoint +  "/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
        .then(() => {
            alert("User Created");
            window.location.reload();
        })
        .catch(err => {
            console.error("Error Creating User: ", err);
            return
        });
    }
    return (
        <div className='auth'>
            {currentTab == 0 ?
                <form onSubmit={loginUser}>
                    <h2>Login</h2>
                    <input type="email" name='email' required placeholder='Enter the Email' />
                    <input type="password" name='password' required placeholder='Enter the Password' />
                    <input type="submit" value="Login"  className='btn btn-submit'/>
                    <button className='btn' onClick={() => setCurrentTab(1)}><small>New to Kennect? Signup</small></button>
                </form> :
                <form onSubmit={signupUser}>
                    <h2>Signup</h2>
                    <input type="text" name='fname' required placeholder='Enter your Full Name'/>
                    <input type="email" name='email' required placeholder='Enter the Email'/>
                    <input type="password" name='password' required placeholder='Enter the Password'/>
                    <input type="submit" value="Signup"  className='btn btn-submit'/>
                    <button className='btn' onClick={() => setCurrentTab(0)}><small>Already a User? Login</small></button>
                </form>
            }

        </div>
    )
}
