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
    const question = this.questionsList[this.index];
    return question.validate(answer)
  }

  nextQuestion() {
    this.index++;
  }

  isQuestionsOver() {
    return this.questionsList.length <= this.index;
  }

  recordInput(input) {
    const question = this.questionsList[this.index];
    const fieldName = question.title;
    const content = question.parser(input);

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
