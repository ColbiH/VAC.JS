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

function LaTeXBuilder({ data }) {
    if (!data || data.length === 0) {
        return <div>Loading...</div>;
    }

    var q0 = extractContentBetweenPTags(data[0].question_text);
    var q1 = extractContentBetweenPTags(data[1].question_text);

    const LaTeXTemplate = "\\documentclass[addpoints]{exam}\n" +
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
        "\\begin{questions}\n" +
        "\n" +
        "% MULTIPLE CHOICE QUESTION\n" +
        "% ------------------------------------------------------------- \n" +
        " \n" +
        "\\question[5] " + q1 + "\n" +
        " \n" +
        "\\begin{checkboxes} \n" +
        "\\choice " + data[1].answers[0].text + " \n" +
        "\\choice " + data[1].answers[1].text + " \n" +
        "\\choice " + data[1].answers[2].text + " \n" +
        "\\choice " + data[1].answers[3].text + " \n" +
        "\\end{checkboxes}\\vspace{1cm}\n" +
        "% -------------------------------------------------------------\n" +
        "\n" +
        "% T/F QUESTION\n" +
        "\\question[5] " + q0 + "\n" +
        "\n" +
        "\\begin{checkboxes}\n" +
        "\\choice " + data[0].answers[0].text + " \n" +
        "\\choice " + data[0].answers[1].text + " \n" +
        "\\end{checkboxes}\\vspace{1cm}\n" +
        "\n" +
        "\\end{questions}\n" +
        "\\clearpage\n" +
        "\n" +
        "\\end{document}"
    ;

    return (
        <div>
            <LaTeXWasm template={LaTeXTemplate} />

        </div>
    );
}

export default LaTeXBuilder;
