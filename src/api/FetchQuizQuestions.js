import React, { useEffect, useState } from 'react';
import { FetchCanvas } from './FetchCanvas';
import LaTeXBuilder from "../components/LaTeXBuilder";

function FetchQuizQuestions() {
    const [data, setData] = useState([]);
    const url = 'https://cors-anywhere.herokuapp.com/https://ufl.instructure.com/api/v1/courses/471518/quizzes/1287636/questions';


    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' //API Key needs to be here to use this portion of code.
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
