import React, { useEffect, useState } from 'react';
import { FetchCanvas } from './FetchCanvas';
import LaTeXBuilder from "../components/Printing/LaTeXBuilder";

function FetchQuizQuestions({login, course, quiz}) {
    const [data, setData] = useState([]);
    const url = 'https://proxy.cors.sh/https://' + login.canvas_url + '/api/v1/courses/' + course + '/quizzes/' + quiz + '/questions';


    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'x-cors-api-key': 'temp_ce104861724fc67b306eacafd84230a4',
                Authorization: 'Bearer ' + login.api_key //API Key needs to be here to use this portion of code.
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
            <LaTeXBuilder data={data}/>
        </div>
    );
}

export default FetchQuizQuestions;
