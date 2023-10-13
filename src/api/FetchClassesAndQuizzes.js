import React, { useEffect, useState } from 'react';
import { FetchCanvas } from './FetchCanvas';
import Sam from '../components/Sam'

function FetchClassesAndQuizzes({ apiKey, canvasurl}) {
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const url = 'https://cors-anywhere.herokuapp.com/https://' + canvasurl + '/api/v1/courses?enrollment_type=teacher';

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + apiKey
            }
        };

        FetchCanvas(url, options)
            .then((classData) => {
                setClasses(classData);

                const classPromises = classData.map((classInfo) => {
                    return FetchCanvas(`https://cors-anywhere.herokuapp.com/https://${canvasurl}/api/v1/courses/${classInfo.id}/quizzes`, options)
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

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {JSON.stringify(classes, null, 2)}
                    <Sam classes={classes} />
                </>
            )}
        </div>
    );
}

export default FetchClassesAndQuizzes;
