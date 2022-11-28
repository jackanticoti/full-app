import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import CourseComponent from '../../components/Pages/CourseComponent'

function Page() {

    

    return (
        <div className='h-screen'>
            <CourseComponent id="61e65354-07b7-4368-9fd1-7081c1345d89"/>
        </div>
    );
}

export { Page };