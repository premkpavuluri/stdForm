process.stdin.setEncoding('utf8');
const { Questions } = require('./questions.js');
const fs = require('fs');

const identity = (arg) => arg;

const splitToArray = (text) => text.length === 0 ? [] : text.split(',');

const isNameValid = (name) => name.length >= 5 && /^[a-zA-Z]*$/.test(name);

const isHobbiesValid = (hobbies) => hobbies.length !== 0;

const isDateValid = (date) => /^[0-9]{4,4}-[0-9]{2,2}-[0-9]{2,2}$/.test(date);

const isPNValid = (phNumber) => /^[0-9]{10,10}$/.test(phNumber);

const isAddressValid = (address) => address.length !== 0;

const main = () => {
  const questionsConfig = [
    {
      title: 'Name',
      question: 'Enter your name',
      parser: identity,
      validate: isNameValid
    }, {
      title: 'DOB',
      question: 'Enter your DOB',
      parser: identity,
      validate: isDateValid
    },
    {
      title: 'Hobbies',
      question: 'Enter your hobbies',
      parser: splitToArray,
      validate: isHobbiesValid
    },
    {
      title: 'PHNO',
      question: 'Enter your PH No',
      parser: identity,
      validate: isPNValid
    },
    {
      title: 'ADDRESS',
      question: 'Enter Address line1',
      parser: identity,
      validate: isAddressValid
    },
    {
      title: 'ADDRESS',
      question: 'Enter Address line2',
      parser: identity,
      validate: isAddressValid
    }
  ];

  const questions = new Questions(questionsConfig);

  console.log(questions.currentQuestion() + ':');
  process.stdin.on('data', (input) => {
    const answer = input.trim();

    if (questions.isAnswerValid(answer)) {
      questions.recordInput(answer);
      questions.nextQuestion();
    }

    if (questions.isQuestionsOver()) {
      process.stdin.emit('close');
      const content = JSON.stringify(questions.getAnswers());
      fs.writeFileSync('formData.json', content, 'utf8');
      process.exit(0);
    }

    console.log(questions.currentQuestion() + ':');
  });

  process.stdin.on('close', () => console.log('Thank you'));
};

main();
