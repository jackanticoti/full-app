import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

const Scorm = (props: { id: string }) => {

    const query = gql`
    query RusticiLaunchScorm(
        $id: ID!
      ) {
        RusticiLaunchScorm(
          id: $id
        ) {
          registrationCheckerEndpoint
          registrationCheckerJWT
          registrationId
          url
        }
    }`

    const { data, error, loading } = useQuery(query, {
        variables: { id: props.id }
    });


    if (data) {
        console.log("SCORM: there is data")
        console.log(data)
    } else if (error) {
        console.log("SCORM: There is an error")
        console.log(error)
    } else if (loading) {
        console.log("SCORM: It's still loading")
    }

    return (
        <div>
            <h1>entered id: {props.id}</h1>
        </div>
    );
};

export default Scorm;