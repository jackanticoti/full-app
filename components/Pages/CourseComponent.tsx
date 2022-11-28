import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Lesson, Section, Course } from '@thoughtindustries/content/src/graphql/global-types';
import GeneralPage from './GeneralPage';

const CourseComponent = (props: { id: string }) => {

    let topicIds = [
        "d22efda7-b40c-4e19-a3bf-41fb66b14fc5", // Text
        "61115b79-7325-4141-a577-14849bbfe8a3", // Text (76ers tho)
        "61e12a9c-f05b-4150-81a5-a7f4468d9740", // Quiz
        "df80697e-cd5a-4802-a913-ff74a8ce4b22" // Scorm
    ]

    const [course, setCourse] = useState<Course>();
    const [pageIndex, setPageIndex] = useState(0);
    const [selectedPage, setSelectedPage] = useState("d22efda7-b40c-4e19-a3bf-41fb66b14fc5");

    const query = gql`
        query CourseById($id: ID!) {
            CourseById(id: $id) {
                courseGroup {
                    asset
                    title
                    description
                    rating
                    ribbon
                    tags {
                        label
                    }
                }
                sections {
                title
                lessons {
                    title
                }
                }
            }
        }`

    const { data, error, loading } = useQuery(query, {
        variables: { id: props.id }
    });

    if (data) { 
        useEffect(() => {
            setCourse(data.CourseById)
        })
    }

    // Nav Bar
    let nav = course?.sections?.map((section, index) => {
        let lessons = section.lessons?.map((lesson, index) => {
            return <div
                className='border-y-2'
                key={`key${index}`}>
                <h1 className='text-xl mx-5 ml-12'>{lesson.title}</h1>
            </div>
        })

        return <div key={`key${index}`}>
            <h1 className='text-2xl mt-5 mx-5'>{section.title}</h1>
            { lessons }
        </div>
    })

    return (
        <div className='h-full'>
            <h1
                className='text-2xl text-center'>
                {course?.courseGroup?.title}
            </h1>
            <div className='flex flex-row h-full'>
                <div className='bg-black text-white mr-10 h-full w-1/3 -mt-10'>
                    {nav}
                </div>
                <div className='w-full h-full flex flex-col justify-between'>
                    <GeneralPage id={selectedPage}/>
                    <div className='flex flex-row justify-between mb-14'>
                        <h1
                            className='hover:bg-slate-100 bg-slate-400 rounded-lg 
                            m-2 px-3 hover:cursor-pointer w-60 text-lg text-center'
                            onClick={() => {
                                setSelectedPage(topicIds[(pageIndex - 1) % 3])
                                setPageIndex((pageIndex - 1) % 3)
                            }}
                            >Last Page</h1>
                        <h1
                            className='hover:bg-slate-100 bg-slate-400 rounded-lg 
                            m-2 px-3 hover:cursor-pointer w-60 text-lg text-center'
                            onClick={() => {
                                setSelectedPage(topicIds[(pageIndex + 1) % 3])
                                setPageIndex((pageIndex + 1) % 3)
                            }}
                            >Next Page</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseComponent;