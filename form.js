process.stdin.setEncoding('utf8');
const { Questions } = require('./questions.js');
const fs = require('fs');

const identity = (arg) => arg;

const splitToArray = (text) => text.length === 0 ? [] : text.split(',');

const isNameValid = (name) => name.length >= 5 && /^[a-zA-Z]*$/.test(name);

const isHobbiesValid = (hobbies) => hobbies.length !== 0;

const isDateValid = (date) => /^[0-9]{4,4}-[0-9]{2,2}-[0-9]{2,2}$/.test(date);

const main = () => {
  const questionsConfig = {
    Name: {
      question: 'Enter your name:',
      parser: identity,
      validate: isNameValid
    },
    DOB: {
      question: 'Enter your DOB',
      parser: identity,
      validate: isDateValid
    },
    Hobbies: {
      question: 'Enter your hobbies',
      parser: splitToArray,
      validate: isHobbiesValid
    }
  };

  const questions = new Questions(questionsConfig);

  console.log(questions.currentQuestion());
  process.stdin.on('data', (input) => {
    questions.recordInput(input.trim());

    if (questions.isAnswerValid()) {
      questions.nextQuestion();
    }

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
