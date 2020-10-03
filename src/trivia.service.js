const NUMBER_OF_QUESTIONS = 4;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function mapQuestions(questions) {
    let mappedQuestions = questions.results.map((result) => {
        let question = { text: result.question };
        let options = result.incorrect_answers;
        let correctIndex = getRandomInt(options.length + 1);
        options.splice(correctIndex, 0, result.correct_answer);

        question.options = options.map((o, i) => { return { text: o, code: i } });
        question.answer = correctIndex;
        return question;
    });
    return Promise.resolve(mappedQuestions);
}
export function getQuestions(categoryCode) {
    return fetch(`https://opentdb.com/api.php?amount=${NUMBER_OF_QUESTIONS}&category=${categoryCode}&difficulty=easy&type=multiple`, {
        "headers": {
            "accept-language": "en-US,en;q=0.9",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
    }).then(r => r.json()).then(mapQuestions);
}

