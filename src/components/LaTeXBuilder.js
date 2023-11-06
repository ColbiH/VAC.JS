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

function Template(data) {
    let LaTeXTemplate = "\\documentclass[addpoints]{exam}\n" +
        "\\usepackage{comment}\n" +
        "\\usepackage{multicol}\n" +
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
            const placeholderRegex = /\[\w+\]/g;
            questionText = questionText.replace(placeholderRegex, "\\underline{\\hspace{3cm}}");

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
                let shortAnswerQuestion = "\\question " + questionText + "\\vspace{1cm}\n"
                LaTeXTemplate += shortAnswerQuestion;
            }
            if(questionType === "fill_in_multiple_blanks_question"){
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