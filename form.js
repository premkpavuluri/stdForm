process.stdin.setEncoding('utf8');

class Questions {
  constructor(questions) {
    this.questionsList = questions;
    this.index = 0;
  }

  currentQuestion() {
    return this.questionsList[this.index];
  }

  nextQuestion() {
    this.index++;
  }

  isQuestionsOver() {
    return this.questionsList.length < this.index;
  }
}

const main = () => {
  const qlist = ['Name', 'DOB', 'Hobbies'];
  const questions = new Questions(qlist);
  const userInput = [];

  console.log(questions.currentQuestion());
  questions.nextQuestion();

  process.stdin.on('data', (input) => {
    console.log(questions.currentQuestion());
    questions.nextQuestion();
    userInput.push(input);
    if (questions.isQuestionsOver()) {
      process.stdin.emit('close');
      process.exit(0);
    }
  });

  process.stdin.on('close', () => console.log('Thank you', userInput));
};

main();
