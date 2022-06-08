class Questions {
  constructor(fields, questions) {
    this.questionsList = questions;
    this.fields = fields;
    this.index = 0;
    this.answers = {};
  }

  currentQuestion() {
    return this.fields[this.index].getPrompt();
  }

  isAnswerValid(answer) {
    const currentField = this.fields[this.index];
    return currentField.isValid(answer);
  }

  nextQuestion() {
    this.index++;
  }

  isQuestionsOver() {
    return this.fields.every(field => field.isFilled());
  }

  recordAnswer(answer) {
    const currentField = this.fields[this.index];
    currentField.fill(answer);
  }

  getAnswers() {
    const responses = {};
    this.fields.forEach(field => {
      const { name, response } = field.getDetails();
      responses[name] = response;
    });

    return responses;
  }
}

exports.Questions = Questions;
