import React, { useEffect, useState } from 'react';
import { FetchCanvas } from './FetchCanvas';
import LaTeXBuilder from "../components/Printing/LaTeXBuilder";

function FetchQuizQuestions({login, course_id, course_name, quiz_id, quiz_name}) {
    const [data, setData] = useState([]);
    const url = 'https://' + login.canvas_url + '/api/v1/courses/' + course_id + '/quizzes/' + quiz_id + '/questions?per_page=500';

    console.log(course_name);
    console.log(quiz_name);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + login.api_key
            }
        };

        FetchCanvas(url, options)
            .then((result) => {
                setData(result);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <LaTeXBuilder data={data} courseName={course_name} quizName={quiz_name}/>
        </div>
    );
}

export default FetchQuizQuestions;
