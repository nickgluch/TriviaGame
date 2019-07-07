

$(document).ready(function () {


    $('#start_button').click(function () {
        $(this).hide();
        displayTrivia();
    });


    function displayTrivia() {

        function startTimer(duration, display) {
            var timer = duration, minutes, seconds;
            setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.text('Time Remaining: ' + minutes + ":" + seconds);

                if (--timer < 0) {
                    timer = null;
                }
            }, 1000);
        }

        jQuery(function ($) {
            var minute = 60 * 1,
                display = $('#time');
            startTimer(minute, display);
        });



        var myQuestions = [
            {
                question: "The Nile River is the longest river in the world, Which one’s the next longest?",
                answers: {
                    a: 'Yangtze River',
                    b: 'Congo River',
                    c: 'Amazon River',
                    d: 'Hunang He'
                },
                correctAnswer: 'c'
            },

            {
                question: "Vancouver has the SkyTrain, London has the London Underground. What's the\
         name of Hong Kong’s metro system?",
                answers: {
                    a: 'Metro Rail',
                    b: 'RTA Rapid Transit',
                    c: 'Docklands Light Railway',
                    d: 'MTR'
                },
                correctAnswer: 'd'
            },

            {
                question: "What is the 8th most spoken language worldwide?",
                answers: {
                    a: 'German',
                    b: 'Bengali',
                    c: 'Russian',
                    d: 'Portuguese'
                },
                correctAnswer: 'c'
            },

            {
                question: "What do Grenada and Costa Rica have in common?",
                answers: {
                    a: 'They have no armyr',
                    b: 'They sit on the Equator',
                    c: 'Voted world’s best place to live',
                    d: 'Countries with the least crime'
                },
                correctAnswer: 'a'
            },

            {
                question: "The country with the longest coastline",
                answers: {
                    a: 'Chile',
                    b: 'Canada',
                    c: 'Australia',
                    d: 'Russia'
                },
                correctAnswer: 'b'
            }

        ];

        var quizContainer = document.getElementById('quiz');
        var resultsContainer = document.getElementById('results');
        var submitButton = document.getElementById('submit');

        function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {


            function showQuestions(questions, quizContainer) {

                var output = [];
                var answers;

                // for each question...
                for (var i = 0; i < questions.length; i++) {

                    // first reset the list of answers
                    answers = [];

                    // for each available answer to this question...
                    for (letter in questions[i].answers) {

                        // ...add an html radio button
                        answers.push(
                            '<label>'
                            + '<input type="radio" name="question' + i + '" value="' + letter + '">'
                            + letter + ': '
                            + questions[i].answers[letter]
                            + '</label>'
                        );
                    }

                    // add this question and its answers to the output
                    output.push(
                        '<div class="question">' + questions[i].question + '</div>'
                        + '<div class="answers">' + answers.join('') + '</div>'
                    );
                }

                // finally combine our output list into one string of html and put it on the page
                quizContainer.innerHTML = output.join('');
            }




            function showResults(questions, quizContainer, resultsContainer) {
                // gather answer containers from our quiz
                var answerContainers = quizContainer.querySelectorAll('.answers');

                // keep track of user's answers
                var userAnswer = '';
                var numCorrect = 0;

                // for each question...
                for (var i = 0; i < questions.length; i++) {

                    // find selected answer
                    userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

                    // if answer is correct
                    if (userAnswer === questions[i].correctAnswer) {
                        // add to the number of correct answers
                        numCorrect++;

                        // color the answers green
                        answerContainers[i].style.color = 'lightgreen';
                    }
                    // if answer is wrong or blank
                    else {
                        // color the answers red
                        answerContainers[i].style.color = 'red';
                    }
                }

                // show number of correct answers out of total
                resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;

            }

            // show the questions
            showQuestions(questions, quizContainer);

            // when user clicks submit, show results
            submitButton.onclick = function () {
                showResults(questions, quizContainer, resultsContainer);
            }








        }



        generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

        
    };

});