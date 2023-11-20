import React, { useState } from 'react';
import LaTeXWasm from "./LaTeX.wasm";
//import { FetchQuizQuestions } from './FetchQuizQuestions';
import {Checkbox, NumberInput} from "@instructure/ui";

function extractContentBetweenPTags(inputString) {
    var tempElement = document.createElement('div');
    tempElement.innerHTML = inputString;
    var pElement = tempElement.querySelector('p');

    if (pElement) {
        return pElement.textContent;
    } else {
        return "No <p> tags found in the input string.";
    }
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function extractAltTextFromImages(inputString) {
    var tempElement = document.createElement('div');
    tempElement.innerHTML = inputString;

    var imgElements = tempElement.querySelectorAll('img');

    var altTextArray = [];
    imgElements.forEach((img) => {
    var altText = img.getAttribute('alt');
    altTextArray.push(altText);
    });

    return altTextArray;
}

function Template(data, essayVspace, courseName, quizName) {
    let LaTeXTemplate = "\\documentclass[addpoints]{exam}\n" +
        "\\usepackage{comment}\n" +
        "\\usepackage{multicol}\n" +
        "\\usepackage{amsmath}\n" +
        "\\usepackage{graphicx}" +
        //"\\graphicspath{./Images/}"  +
        "\\begin{document}\n" +
        "\n" +
        "\\vspace{5mm}\n" +
        "\n" +
        "\\makebox[\\textwidth]{Name:\\hrulefill\\hfill Score: \\hrulefill}\n" +
        "\n" +
        "\\vspace{5mm}\n" +
        "\n" +
        "\\makebox[\\textwidth]{Date:\\hrulefill}\n" +
        "\\begin{center}\n" +
        "\\fbox{\\fbox{\\parbox{5.5in}{\\centering\n" +
        courseName + ": " + quizName + "}}}\n" +
        "\\end{center}\n" +
        "\\begin{questions}\n"

    if (Array.isArray(data) && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let questionType = data[i].question_type;
            let questionText = extractContentBetweenPTags(data[i].question_text);
            let answerOptions = data[i].answers.map(answer => answer.text);
            let altTextArray = extractAltTextFromImages(data[i].question_text);

            for (let j = 0; j < altTextArray.length; j++) {
                LaTeXTemplate += `\\begin{figure}[ht]
            \\centering
            \\centerline{\\includegraphics[width=0.5\\linewidth]{troll.jpg}}
            \\caption{${altTextArray[j]}}  % Use alt text as the caption
            \\end{figure}`
            }

            if (questionType === "multiple_choice_question") {
                let multiChoiceQuestion = "\\question " + questionText + " \n" +
                    "\\begin{choices} \n"
                LaTeXTemplate += multiChoiceQuestion;
                for (let j = 0; j < answerOptions.length; j++) {
                    LaTeXTemplate += "\\choice " + answerOptions[j] + " \n"
                }
                LaTeXTemplate += "\\end{choices}\\vspace{1cm}\n"
            }
            if (questionType === "true_false_question") {
                let trueFalseQuestion = "\\question " + questionText + " \n" +
                    "\\begin{choices} \n"
                LaTeXTemplate += trueFalseQuestion;
                for (let j = 0; j < answerOptions.length; j++) {
                    LaTeXTemplate += "\\choice " + answerOptions[j] + " \n"
                }
                LaTeXTemplate += "\\end{choices}\\vspace{1cm}\n"
            }
            if (questionType === "short_answer_question") {
                const placeholderRegex = /\[\w+\]/g;
                questionText = questionText.replace(placeholderRegex, "\\underline{\\hspace{3cm}}");
                let shortAnswerQuestion = "\\question " + questionText + "\\vspace{1cm}\n"
                LaTeXTemplate += shortAnswerQuestion;
            }
            if (questionType === "fill_in_multiple_blanks_question") {
                const placeholderRegex = /\[\w+\]/g;
                questionText = questionText.replace(placeholderRegex, "\\underline{\\hspace{3cm}}");
                let multiBlankQuestion = "\\question " + questionText + "\\vspace{1cm}\n"
                LaTeXTemplate += multiBlankQuestion;
            }
            if (questionType === "multiple_answers_question") {
                let multiAnswersQuestion = "\\question " + questionText + " \n" +
                    "\\begin{checkboxes} \n"
                LaTeXTemplate += multiAnswersQuestion;
                for (let j = 0; j < answerOptions.length; j++) {
                    LaTeXTemplate += "\\choice " + answerOptions[j] + " \n"
                }
                LaTeXTemplate += "\\end{checkboxes}\\vspace{1cm}\n"
            }
            if (questionType === "multiple_dropdowns_question") {
                const placeholderRegex = /\[\w+\]/g;
                questionText = questionText.replace(placeholderRegex, "\\underline{\\hspace{3cm}}");
                let multiDropDownsQuestion = "\\question " + questionText + "\\vspace{1cm}\n"
                LaTeXTemplate += multiDropDownsQuestion;
            }
            if (questionType === "numerical_question") {
                let numQuestion = "\\question " + questionText + "\\vspace{1cm}\n"
                LaTeXTemplate += numQuestion;
            }
            if (questionType === "essay_question") {
                let essayQuestion = `\\question ${questionText} \\vspace{${essayVspace}cm}\n`;
                LaTeXTemplate += essayQuestion;
                console.log("Current essayVspace in Template:", essayVspace);
            }
            if (questionType === "text_only_question") {
                let textOnlyQuestion = "\\question " + questionText + "\n"
                LaTeXTemplate += textOnlyQuestion;
            }
            if (questionType === "matching_question") {
                let leftAnswer = data[i].answers.map(answer => answer.left);
                let rightAnswer = data[i].answers.map(answer => answer.right);
                let matchingQuestion = "\\question " + questionText + " \n";

                if (Array.isArray(answerOptions)) {
                    for (let j = 0; j < answerOptions.length; j++) {
                        matchingQuestion += "\\item[" + leftAnswer[j] + "] \\hspace{5cm} " + rightAnswer[j] + "\n";
                    }
                }

                matchingQuestion += "\\vspace{1cm}\n";

                LaTeXTemplate += matchingQuestion;
            }
            if (questionType === "calculated_question") {
                let calculatedQuestion = "\\question ";

                //let formulas = data[i].formulas;
                let answers = data[i].answers;

                const shuffledAnswers = shuffleArray([...answers]);

                const randomAValue = shuffledAnswers[0].variables.find((variable) => variable.name === "a").value;

                const questionWithA = questionText.replace(/\[a\]/g, randomAValue);
                calculatedQuestion += questionWithA + " \n";

                calculatedQuestion += "\\begin{choices}\n";

                for (let i = 0; i < shuffledAnswers.length; i++) {
                    const answer = shuffledAnswers[i];

                    calculatedQuestion += `\\choice ${answer.answer} \n`;
                }

                calculatedQuestion += "\\end{choices}\n";

                LaTeXTemplate += calculatedQuestion + "\\vspace{1cm}\n";
            }

        }
    }

    LaTeXTemplate += "\\end{questions}\n" +
        "\\clearpage\n" +
        "\n" +
        "\\end{document}";

    return LaTeXTemplate;
}

    function LaTeXBuilder({ data, courseName, quizName }) {
        console.log('Generated LaTeX:', data);
        const [essayVspace, setEssayVspace] = useState(10);

        const handleNumberInputChange = (event) => {
            setEssayVspace(event.target.value);
            console.log("Updated essayVspace:", event.target.value);
        };

        return (
            <div>
                <LaTeXWasm template={Template(data, essayVspace, courseName, quizName)}/>
                <NumberInput
                    renderLabel="How many lines would you like for free-response questions?"
                    showArrows={false}
                    placeholder={essayVspace.toString()}
                    onChange={handleNumberInputChange}
                />
                <br></br>
                <Checkbox label={'Use alt-text for images'} value="medium"/>
            </div>
        );
    }
    export default LaTeXBuilder;