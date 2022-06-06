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

  nextQuestion() {
    const qTitle = this.qTitles[this.index];
    const question = this.questionsList[qTitle];
    const answer = this.answers[qTitle];
    if (question.validate(answer)) {
      this.index++;
    }
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
