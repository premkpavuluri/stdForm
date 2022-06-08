process.stdin.setEncoding('utf8');
const { Questions } = require('./questions.js');
const { Field } = require('./field.js');
const fs = require('fs');

const identity = (arg) => arg;

const splitToArray = (text) => text.length === 0 ? [] : text.split(',');

const isNameValid = (name) => name.length >= 5 && /^[a-zA-Z]*$/.test(name);

const isHobbiesValid = (hobbies) => hobbies.length !== 0;

const isDateValid = (date) => /^[0-9]{4,4}-[0-9]{2,2}-[0-9]{2,2}$/.test(date);

const isPNValid = (phNumber) => /^[0-9]{10,10}$/.test(phNumber);

const isAddressValid = (address) => address.length !== 0;

const registerResponse = (questions, response) => {
  if (questions.isAnswerValid(response)) {
    questions.recordAnswer(response);
    questions.nextQuestion();
  }

  if (questions.isQuestionsOver()) {
    process.stdin.destroy();
    return;
  }

  console.log(questions.currentQuestion() + ':');
};

const main = () => {
  // queries.config('ADDRESS', 'Enter Address line1', identity, isAddressValid);
  // queries.config('ADDRESS', 'Enter Address line2', identity, isAddressValid);

  const nameField = new Field('name', 'Enter you name', identity, isNameValid);
  const dobField = new Field('dob', 'Enter you Dob', identity, isDateValid);
  const hobbiesField = new Field('hobbies', 'Enter you hobbies', splitToArray, isHobbiesValid);
  const phNumberFiled = new Field('phno', 'Enter your phno', identity, isPNValid);

  const fields = [nameField, dobField, hobbiesField, phNumberFiled];
  const questions = new Questions(fields);

  console.log(questions.currentQuestion() + ':');
  process.stdin.on('data', (input) => {
    registerResponse(questions, input.trim());
  });

  process.stdin.on('close', () => {
    const content = JSON.stringify(questions.getAnswers());
    fs.writeFileSync('formData.json', content, 'utf8');
    console.log('Thank you')
  });
};

main();
