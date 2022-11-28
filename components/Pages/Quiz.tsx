import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

type Choice = {
  value: string;
  correct: boolean;
}

type Question = {
  body: string;
  choices: Choice[];
}

function Quiz(props: { id: string }) {

    const [title, setTitle] = useState("")
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Number[]>([]);

    const query = gql`
    query {
        Pages(identifiers: ["${props.id}"]) {
            __typename
            ... on QuizPage {
                title
                questions {
                    body
                    choices {
                        value
                        correct
                    }
                }
            }
        }
      }
    `

    const { data } = useQuery(query, {
        variables: { identifiers: props.id }
    });

    useEffect(() => {
        if (data) {
            console.log(data)
            setTitle(data.Pages[0].title)
            setQuestions(data.Pages[0].questions)    
        } 
    })

    let answerItems;
    let questionItems

    if (questions) {
      questionItems = questions.map((question, index) => {
        // let answersData
        answerItems = question.choices.map((answer, index_2) => {
          return <h2
            key={`key-${index_2}`}
            className={`hover:bg-slate-100 rounded-lg m-2 px-3 hover:cursor-pointer
            ${ answers[index] === index_2 ? 'bg-green-200' : 'bg-slate-200'}`}
            onClick={() => {
              console.log("yo yo yo")
              let oldAnswers = answers
              oldAnswers[index] = index_2
              setAnswers([...oldAnswers])
            }}
            >{answer.value}</h2>
        })
        return <div className='p-4' key={`key-${index}`}>
          <h1
            className='text-xl'>{question.body.replace(/<[^>]+>/g, '')}</h1>
          {answerItems}
        </div>
      })
    }

    return (
        <div>
            <h1
              onClick={() => console.log(questions)}
              className='text-xl'
              >{title}</h1>
              { questionItems }
            <h1
                className='hover:bg-slate-100 bg-slate-400 rounded-lg 
                m-2 px-3 hover:cursor-pointer w-72 text-xl text-center'
                onClick={() => {
                  let newAnswers = []
                  for (let i = 0; i < answers.length; i++) {
                    newAnswers.push(-1)
                  }
                  setAnswers(newAnswers)
                }}
                >Submit Quiz</h1>
        </div>
    );
}

export default Quiz;