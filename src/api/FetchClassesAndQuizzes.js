import React, { useEffect, useState } from 'react';
import { FetchCanvas } from './FetchCanvas';
import Sam from '../components/Sam';
import {Spinner} from "@instructure/ui";

function FetchClassesAndQuizzes({login}) {
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const url = 'https://proxy.cors.sh/https://' + login.canvas_url + '/api/v1/courses?enrollment_type=teacher';

    useEffect(() => {
        const options = {
            method: 'GET',
                headers: {
                    'x-cors-api-key': 'temp_ce104861724fc67b306eacafd84230a4',
                    Authorization: 'Bearer ' + login.api_key,
            },
        };

        FetchCanvas(url, options)
            .then((classData) => {
                setClasses(classData);

                const classPromises = classData.map((classInfo) => {
                    return FetchCanvas(`https://proxy.cors.sh/https://${login.canvas_url}/api/v1/courses/${classInfo.id}/quizzes`, options)
                        .then((quizData) => {
                            classInfo.quizzes = quizData;
                            return classInfo;
                        })
                        .catch((error) => {
                            console.error(`Error fetching quizzes for class ${classInfo.id}:`, error);
                            return classInfo;
                        });
                });

                return Promise.all(classPromises);
            })
            .then((classesWithQuizzes) => {
                console.log(classesWithQuizzes);
            })
            .catch((error) => {
                console.error('Error fetching class data:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        // return <p>Loading...</p>;
        return <Spinner renderTitle="Loading" size="small" margin="0 0 0 medium" />;
    }

    if (classes.length > 0) {
        const firstClass = classes[0];
        if (firstClass.quizzes) {
            return (
                <div>
                    <Sam classes={classes} />
                    {/*<Sam {state = {login: login}, {classes : classes}} />*/}
                    {/*{state = {login: {login}}};*/}
                    {/*<Sam {state = {classes: {classes}}}/>*/}
                </div>
            );
        } else {
            return <p>No quizzes available for the first class.</p>;
        }
    }

    return <p>No classes available for this teacher.</p>;
}

export default FetchClassesAndQuizzes;
