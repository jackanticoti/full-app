import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

function Page() {

    const [showError, setShowError] = useState(true)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const mutation = gql`
    mutation Login(
        $email: String!,
        $password: String!
      ) {
        Login(
          email: $email,
          password: $password
        )
    }`

    const [attemptSignIn, { data, loading, error }] = useMutation(mutation, {
        variables: {
          email: username,
          password: password,
        },
      });

    const handler = () => {
        setShowError(!showError)
    };

    let hero_error
    
    if (showError) {
        hero_error = <div 
            onClick={handler}
            className='absolute flex flex-col justify-center h-screen w-screen bg-red-500/50'>
            <div className='flex flex-row justify-center'>
                <div className='w-1/2 h-96 bg-red-500'>
                    <h1
                        className='text-4xl text-center mt-16'
                        >
                            Error: Please try again!
                    </h1>
                </div>
            </div>
        </div>
    }

    return (
        <div className='flex flex-row justify-center bg-gray-300 w-screen h-screen'>
            { hero_error }
            <div className='bg-gray-100 p-10 h-80 mt-10 rounded-lg w-4/6'>
                <div>
                    <h1 className='text-xl'>Username</h1>
                    <input
                        className='bg-gray-50 border border-gray-300 w-5/6 
                        text-gray-900 text-sm rounded-lg px-2'
                        placeholder='Username'
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <h1 className='text-xl'>Password</h1>
                    <input
                        className='bg-gray-50 border border-gray-300 w-5/6
                        text-gray-900 text-sm rounded-lg px-2'
                        placeholder='Password'
                        type="text"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className='flex flex-row justify-center'>
                    <h1
                        onClick={() => {
                            attemptSignIn()
                            .then(({ data }) => {
                                console.log("Fetch was good!")
                                console.log(data)
                                location.href = "http://localhost:3000/dashboard"
                            })
                            .catch(e => {
                                console.log("There was an error")
                                console.log(e)
                                handler()
                                
                            })
                        }}
                        className='bg-gray-400 rounded-lg w-32 mt-8 text-center
                        hover:bg-gray-300 border-2 cursor-pointer text-2xl'
                        >Sign In</h1>
                </div>
                <div className='flex flex-row justify-center'>
                    <h1
                        onClick={() => {
                            location.href = "https://anticoregular.thoughtindustries.com/learn/forgot"
                        }}
                        className='w-40 h-8 text-center underline mt-3
                        hover:cursor-pointer'
                        >Forgot Password</h1>
                </div>
            </div>
        </div>
    );
}

export { Page };