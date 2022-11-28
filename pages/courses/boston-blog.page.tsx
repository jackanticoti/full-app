import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

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

    console.log(data)
    if (data) {
      console.log(data.CourseById.sections[0].lessons[0])
    }

  return (
    <div>
        <h1>Boston Blog</h1>
    </div>
  );
}

export { Page };