class Questions {
  constructor(questions) {
    this.questionsList = questions;
    this.index = 0;
    this.answers = {};
  }

  currentQuestion() {
    return this.questionsList[this.index].question;
  }

  isAnswerValid(answer) {
    const field = this.questionsList[this.index];
    return field.validate(answer)
  }

  nextQuestion() {
    this.index++;
  }

  isQuestionsOver() {
    return this.questionsList.length <= this.index;
  }

  recordAnswer(answer) {
    const field = this.questionsList[this.index];
    const fieldName = field.title;
    const content = field.parser(answer);

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
