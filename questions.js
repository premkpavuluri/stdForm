class Questions {
  constructor(questions) {
    this.questionsList = questions;
    this.qTitles = Object.keys(questions);
    this.index = 0;
    this.answers = {};
  }

  currentQuestion() {
    const qTitle = this.qTitles[this.index];
    return this.questionsList[qTitle]?.question;
  }

  isAnswerValid() {
    const qTitle = this.qTitles[this.index];
    const question = this.questionsList[qTitle];
    const answer = this.answers[qTitle];
    return question.validate(answer)
  }

  nextQuestion() {
    this.index++;
  }

  isQuestionsOver() {
    return this.qTitles.length <= this.index;
  }

  recordInput(input) {
    const qTitle = this.qTitles[this.index];
    this.answers[qTitle] = this.questionsList[qTitle].parser(input);
  }

  getAnswers() {
    return this.answers;
  }
}

exports.Questions = Questions;
