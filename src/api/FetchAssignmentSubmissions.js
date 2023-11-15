import React, { useEffect, useState } from 'react';
import { FetchCanvas } from './FetchCanvas';
import CodeGrader from "../components/Grading/CodeGrader";

function FetchAssignmentSubmissions({login, course, quiz}) {
    const [data, setData] = useState([]);
    const url = 'https://' + login.canvas_url + '/api/v1/courses/' + course + '/assignments/' + quiz + '/submissions';


    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
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
            <CodeGrader data={data}/>
        </div>
    );
}

export default FetchAssignmentSubmissions;
