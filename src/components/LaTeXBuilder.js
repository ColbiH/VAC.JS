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
        "% -------------------------------------------------------------\n" +
        "% This code creates the text before the first question\n" +
        "% -------------------------------------------------------------\n" +
        "\\begin{center}\n" +
        "\\fbox{\\fbox{\\parbox{5.5in}{\\centering\n" +
        "Answer the below questions about cats!}}}\n" +
        "\\end{center}\n" +
        "\n" +
        "\\vspace{5mm}\n" +
        "\n" +
        "\\makebox[\\textwidth]{Name and section:\\enspace\\hrulefill}\n" +
        "\n" +
        "\\vspace{5mm}\n" +
        "\n" +
        "\\makebox[\\textwidth]{Instructor’s name:\\enspace\\hrulefill}\n" +
        "% -------------------------------------------------------------\n" +
        "\n" +
        "% Here, the questions begin\n" +
        "\\begin{questions}\n"

    if (Array.isArray(data) && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let questionType = data[i].question_type;
            let questionText = extractContentBetweenPTags(data[i].question_text);
            let answerOptions = data[i].answers.map(answer => answer.text);
            if (questionType === "multiple_choice_question") {
                let multiChoiceQuestion = "\\question " + questionText + " \n" +
                    "\\begin{checkboxes} \n"
                LaTeXTemplate += multiChoiceQuestion;
                for (let j = 0; j < answerOptions.length; j++) {
                    LaTeXTemplate += "\\choice " + answerOptions[j] + " \n"
                }
                LaTeXTemplate += "\\end{checkboxes}\\vspace{1cm}\n"
            }
            if (questionType === "true_false_question") {
                let trueFalseQuestion = "\\question " + questionText + " \n" +
                    "\\begin{checkboxes} \n"
                LaTeXTemplate += trueFalseQuestion;
                for (let j = 0; j < answerOptions.length; j++) {
                    LaTeXTemplate += "\\choice " + answerOptions[j] + " \n"
                }
                LaTeXTemplate += "\\end{checkboxes}\\vspace{1cm}\n"
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
