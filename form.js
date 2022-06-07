process.stdin.setEncoding('utf8');
const { Questions } = require('./questions.js');
const { ConfigQueries } = require('./configQueries');
const fs = require('fs');

const identity = (arg) => arg;

const splitToArray = (text) => text.length === 0 ? [] : text.split(',');

const isNameValid = (name) => name.length >= 5 && /^[a-zA-Z]*$/.test(name);

const isHobbiesValid = (hobbies) => hobbies.length !== 0;

const isDateValid = (date) => /^[0-9]{4,4}-[0-9]{2,2}-[0-9]{2,2}$/.test(date);

const isPNValid = (phNumber) => /^[0-9]{10,10}$/.test(phNumber);

const isAddressValid = (address) => address.length !== 0;

const main = () => {
  const queries = new ConfigQueries();

  queries.config('Name', 'Enter your name', identity, isNameValid);
  queries.config('DOB', 'Enter your DOB(yyyy-mm-dd)', identity, isDateValid);
  queries.config('Hobbies', 'Enter your hobbies', splitToArray, isHobbiesValid);
  queries.config('PHNO', 'Enter your Ph no', identity, isPNValid);
  queries.config('ADDRESS', 'Enter Address line1', identity, isAddressValid);
  queries.config('ADDRESS', 'Enter Address line2', identity, isAddressValid);

  const questions = new Questions(queries.getConfig());

  console.log(questions.currentQuestion() + ':');
  process.stdin.on('data', (input) => {
    const answer = input.trim();

    if (questions.isAnswerValid(answer)) {
      questions.recordAnswer(answer);
      questions.nextQuestion();
    }

    if (questions.isQuestionsOver()) {
      process.stdin.emit('close');
      process.exit(0);
    }

    console.log(questions.currentQuestion() + ':');
  });

  process.stdin.on('close', () => {
    const content = JSON.stringify(questions.getAnswers());
    fs.writeFileSync('formData.json', content, 'utf8');
    console.log('Thank you')
  });
};

main();
