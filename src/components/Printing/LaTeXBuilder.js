import React from 'react';
import LaTeXWasm from "./LaTeX.wasm";

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

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function Template(data) {
    let LaTeXTemplate = "\\documentclass[addpoints]{exam}\n" +
        "\\usepackage{comment}\n" +
        "\\usepackage{multicol}\n" +
        "\\usepackage{amsmath}\n" +
        "\n" +
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
        "Course: Quiz Name}}}\n" +
        "\\end{center}\n" +
        "\\begin{questions}\n"

    if (Array.isArray(data) && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let questionType = data[i].question_type;
            let questionText = extractContentBetweenPTags(data[i].question_text);
            let answerOptions = data[i].answers.map(answer => answer.text);

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
            if(questionType === "fill_in_multiple_blanks_question"){
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
            if(questionType === "multiple_dropdowns_question"){
                const placeholderRegex = /\[\w+\]/g;
                questionText = questionText.replace(placeholderRegex, "\\underline{\\hspace{3cm}}");
                let multiDropDownsQuestion = "\\question " + questionText + "\\vspace{1cm}\n"
                LaTeXTemplate += multiDropDownsQuestion;
            }
            if(questionType === "numerical_question"){
                let numQuestion = "\\question " + questionText + "\\vspace{1cm}\n"
                LaTeXTemplate += numQuestion;
            }
            if(questionType === "essay_question"){
                let essayQuestion = "\\question " + questionText + "\\vspace{5cm}\n"
                LaTeXTemplate += essayQuestion;
            }
            if(questionType === "text_only_question"){
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

                // Extracting information from the calculated question
                let formulas = data[i].formulas;
                let answers = data[i].answers;

                // Shuffle the answers randomly
                const shuffledAnswers = shuffleArray([...answers]);

                // Randomly select a value of a from the shuffled answers
                const randomAValue = shuffledAnswers[0].variables.find((variable) => variable.name === "a").value;

                // Replace [a] in the question with the actual value of a
                const questionWithA = questionText.replace(/\[a\]/g, randomAValue);
                calculatedQuestion += questionWithA + " \n";

                calculatedQuestion += "\\begin{choices}\n";

                // Loop through the shuffled answers and add them to the LaTeXTemplate
                for (let i = 0; i < shuffledAnswers.length; i++) {
                    const answer = shuffledAnswers[i];

                    // Append the modified question with the corresponding answer
                    calculatedQuestion += `\\choice ${answer.answer} \\\\\n`;
                }

                calculatedQuestion += "\\end{choices}\n";

                LaTeXTemplate += calculatedQuestion;
            }
        }
    }

    LaTeXTemplate += "\\end{questions}\n" +
        "\\clearpage\n" +
        "\n" +
        "\\end{document}";

    return LaTeXTemplate;
}

function LaTeXBuilder({ data }) {
    if (!data || data.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <LaTeXWasm template={Template(data)} />
        </div>
    );
}

export default LaTeXBuilder;