process.stdin.setEncoding('utf8');

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
    this.index++;
  }

  isQuestionsOver() {
    return this.qTitles.length <= this.index;
  }

  recordInput(input) {
    const qTitle = this.qTitles[this.index];
    this.answers[qTitle] = input;
  }

  getAnswers() {
    return this.answers;
  }
}

const main = () => {
  const questionsConfig = {
    Name: {
      question: 'Enter your name:'
    },
    DOB: {
      question: 'Enter your DOB'
    },
    Hobbies: {
      question: 'Enter your hobbies'
    }
  };

  const questions = new Questions(questionsConfig);

  console.log(questions.currentQuestion());
  process.stdin.on('data', (input) => {
    questions.recordInput(input);
    questions.nextQuestion();

    if (questions.isQuestionsOver()) {
      process.stdin.emit('close');
      process.exit(0);
    }

    console.log(questions.currentQuestion());
  });

  process.stdin.on('close', () => {
    console.log('Thank you', questions.getAnswers());
  });
};

main();
