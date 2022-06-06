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

  isAnswerValid(answer) {
    const qTitle = this.qTitles[this.index];
    const question = this.questionsList[qTitle];
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
    const fieldName = this.questionsList[qTitle].title;
    const content = this.questionsList[qTitle].parser(input);

    if (!this.answers[fieldName]) {
      this.answers[fieldName] = content;
      return;
    }

    this.answers[fieldName] += '\n' + content;
  }

  getAnswers() {
    return this.answers;
  }
}

exports.Questions = Questions;
