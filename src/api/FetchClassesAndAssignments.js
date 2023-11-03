import React, { useEffect, useState } from 'react';
import { FetchCanvas } from './FetchCanvas';
import GSam from '../components/Grading/GSam';
import {useLocation, useNavigate} from "react-router-dom";
import {Spinner} from "@instructure/ui";

function FetchClassesAndAssignments({login}) {
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const url = 'https://proxy.cors.sh/https://' + location.state.login.canvas_url + '/api/v1/courses?enrollment_type=teacher';

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'x-cors-api-key': 'temp_578646f3ba3de0a66ef52336a65f811a',
                Authorization: 'Bearer ' + location.state.login.api_key,
            },
        };

        FetchCanvas(url, options)
            .then((classData) => {
                setClasses(classData);

                const classPromises = classData.map((classInfo) => {
                    return FetchCanvas(`https://proxy.cors.sh/https://${location.state.login.canvas_url}/api/v1/courses/${classInfo.id}/assignments`, options)
                        .then((quizData) => {
                            if (Array.isArray(quizData)) {
                                classInfo.quizzes = quizData.filter((quiz) =>  quiz.submission_types.includes('online_upload'));
                            }
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
        return <Spinner renderTitle="Loading" size="small" margin="0 0 0 medium" />;
    }

    if (classes.length > 0) {
        const firstClass = classes[0];
        if (firstClass.quizzes) {
            return (
                <div>
                    {navigate('/gsam', {state: {login: location.state.login, classes: classes }})}
                </div>
            );
        } else {
            return <p>No quizzes available for the first class.</p>;
        }
    }

    return <p>No classes available for this teacher.</p>;
}

export default FetchClassesAndAssignments;
