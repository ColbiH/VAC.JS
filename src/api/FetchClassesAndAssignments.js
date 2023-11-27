import React, { useEffect, useState } from 'react';
import { FetchCanvas } from './FetchCanvas';
import {useLocation, useNavigate} from "react-router-dom";
import {Spinner} from "@instructure/ui";

function FetchClassesAndAssignments({login}) {
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const url = 'https://' + location.state.login.canvas_url + '/api/v1/courses?enrollment_type=teacher&per_page=500';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + location.state.login.api_key,
                    },
                };

                const classData = await FetchCanvas(url, options);
                console.log(classData);

                const classPromises = classData.map(async (classInfo) => {
                    try {
                        const quizData = await FetchCanvas(`https://${location.state.login.canvas_url}/api/v1/courses/${classInfo.id}/assignments?per_page=500`, options);
                        if (Array.isArray(quizData)) {
                            classInfo.quizzes = quizData.filter((quiz) => quiz.submission_types.includes('online_upload'));
                        }
                        return classInfo;
                    } catch (error) {
                        console.error(`Error fetching quizzes for class ${classInfo.id}:`, error);
                        return classInfo;
                    }
                });

                const classesWithQuizzes = await Promise.all(classPromises);

                setClasses(classesWithQuizzes);
                console.log(classesWithQuizzes);
                setIsLoading(false);

                navigate('/assignmentsam', {state: {login: location.state.login, classes: classesWithQuizzes}})
            } catch (error) {
                console.error('Error fetching class data:', error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <Spinner renderTitle="Loading" size="small" margin="0 0 0 medium"/>;
    }
}
export default FetchClassesAndAssignments;
