import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import Text from `../../components/Pages/Text`; 
import Scorm from '../../components/Pages/Scorm';

function Page() {

  const query = gql`
    query CourseById($id: ID!) {
        CourseById(id: $id) {
            title
            sections {
               title
               lessons {
                title
               } 
            }
        }
    }`

    const { data, error, loading } = useQuery(query, {
        variables: { id: "d567b15c-b634-40f0-a458-6cdbf361e75b" }
    });

    if (data) {
      console.log(data.CourseById.sections[0].lessons[0])
    }

  return (
    <div>
        <h1>History of Philly</h1>
        <Text id="d22efda7-b40c-4e19-a3bf-41fb66b14fc5"/>
        <Scorm id="df80697e-cd5a-4802-a913-ff74a8ce4b22"/>
    </div>
  );
}

export { Page };