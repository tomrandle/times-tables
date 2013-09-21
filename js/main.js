window.onload = function() {

    /*Set focus*/

    document.getElementById("answer-box").focus();


    /* Generate Random Numbers */

    var timetableLimit = 12;
    var a;
    var b;

    function randomNumber(x) {
        return Math.floor(Math.random() * (x + 1));
    }

    function generateNumbers(x) {
        a = randomNumber(x);
        b = randomNumber(x);
    }

    generateNumbers(timetableLimit);


    /*Scores*/

    var score = 0;
    var questions = 0;


    /* View model */

    function AppViewModel() {

        var self = this;

        self.multipleA = ko.observable(a);
        self.multipleB = ko.observable(b);
        self.answer = ko.observable();
        self.verdict = ko.observable();


        self.throttledAnswer = ko.computed(self.answer)
            .extend({
            throttle: 1500
        });


        self.correctCount = ko.observable(0);
        self.questionCount = ko.observable(0);

        self.throttledAnswer.subscribe(function (answer) {

            if (answer) {

                if (answer == a * b) {
                    score += 1;
                    self.verdict('correctAnswer visible');
                } 

                else {
                    self.verdict('falseAnswer visible');
                }

                setTimeout(function () {
                    console.log('running now');
                    self.verdict('');
                }, 3000);


                /* Generate new numbers and update score */

                setTimeout(function () {
                    generateNumbers(timetableLimit);
                    self.multipleA(a);
                    self.multipleB(b);

                    questions = questions + 1;

                    self.correctCount(score);
                    self.questionCount(questions);

                    self.answer('');
                }, 1500);

            }
        });
    }

    ko.applyBindings(new AppViewModel());

};
