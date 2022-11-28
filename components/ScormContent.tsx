import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

const ScormContent = (props: { id: string }) => { 

    const [url, setUrl] = useState("");

    const query = gql`
    query RusticiLaunchScorm(
        $topicOrCourseId: ID!,
        $isPreview: Boolean!
      ) {
        RusticiLaunchScorm(
          topicOrCourseId: $topicOrCourseId,
          isPreview: $isPreview
        ) {
          registrationCheckerEndpoint
          registrationCheckerJWT
          registrationId
          url
        }
    }`

    const { data, error, loading } = useQuery(query, {
        variables: { topicOrCourseId: props.id, isPreview: false }
    });


    if (data) {
        console.log("SCORM: there is data")
        console.log(data.RusticiLaunchScorm.url)
        useEffect(() => {
            setUrl(data.RusticiLaunchScorm.url)
        }, [])
    } else if (error) {
        console.log("SCORM: There is an error")
        console.log(error)
    } else if (loading) {
        console.log("SCORM: It's still loading")
    }

    return (
        <div className='flex flex-row justify-center bg-gray-300 w-screen h-screen p-10'>
            <h1
                className='bg-gray-400 text-2xl p-4 rounded-lg w-72 h-32 hover:bg-gray-100 border-2 cursor-pointer'
                onClick={() => {
                    window.open(url, '_blank', 'location=yes,height=570,width=520');
                }}
                >Click here to launch your SCORM</h1>
        </div>
    );
};

export default ScormContent;