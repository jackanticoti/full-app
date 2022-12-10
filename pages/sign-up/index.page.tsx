import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

function Page() {

    const [showError, setShowError] = useState(false)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //https://jackanticosandbox.thoughtindustries.com/incoming/v2/users

    // fetch('http://localhost:3000/graphql', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         query: ""
    //     })
    // })
    // .then(r => r.json())
    // .then(res => {
    //   console.log('>>> res', res);
    //   console.log('>>> res.data', res.data);
    // })
    // .catch(err => {
    //   console.log('>>> err', err);
    // });

    const handler = () => {
        setShowError(!showError)
    };

    let hero_error;
    
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
                    <h1 className='text-xl'>Email</h1>
                    <input
                        className='bg-gray-50 border border-gray-300 w-5/6 
                        text-gray-900 text-sm rounded-lg px-2'
                        placeholder='john@gmail.com'
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className='flex flex-row mt-5'>
                    <div className='mr-10'>
                        <h1 className='text-xl'>First Name</h1>
                        <input
                            className='bg-gray-50 border border-gray-300 w-5/3
                            text-gray-900 text-sm rounded-lg px-2'
                            placeholder='John'
                            type="text"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <h1 className='text-xl'>Last Name</h1>
                            <input
                                className='bg-gray-50 border border-gray-300 w-5/6
                                text-gray-900 text-sm rounded-lg px-2'
                                placeholder='Smith'
                                type="text"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                    </div>
                </div>
                
                <div className='flex flex-row justify-center'>
                    <h1
                        onClick={() => {
                            
                        }}
                        className='bg-gray-400 rounded-lg w-32 mt-8 text-center
                        hover:bg-gray-300 border-2 cursor-pointer text-2xl'
                        >Sign Up</h1>
                </div>
                <div className='flex flex-row justify-center'>
                    <h1
                        onClick={() => {
                            location.href = "http://localhost:3000/sign-in"
                        }}
                        className='w-40 h-8 text-center underline mt-3
                        hover:cursor-pointer'
                        >Sign In</h1>
                </div>
            </div>
        </div>
    );
}

export { Page };