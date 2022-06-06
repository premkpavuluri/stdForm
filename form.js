process.stdin.setEncoding('utf8');
const { Questions } = require('./questions.js');
const fs = require('fs');

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
    questions.recordInput(input.trim());
    questions.nextQuestion();

    if (questions.isQuestionsOver()) {
      process.stdin.emit('close');
      const content = JSON.stringify(questions.getAnswers());
      fs.writeFileSync('formData.json', content, 'utf8');
      process.exit(0);
    }

    console.log(questions.currentQuestion());
  });

  process.stdin.on('close', () => console.log('Thank you'));
};

main();
