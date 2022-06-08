process.stdin.setEncoding('utf8');
const { Form } = require('./src/form.js');
const { Field } = require('./src/field.js');
const fs = require('fs');

const identity = (arg) => arg;

const splitToArray = (text) => text.length === 0 ? [] : text.split(',');

const isNameValid = (name) => name.length >= 5 && /^[a-zA-Z]*$/.test(name);

const isNotEmpty = (hobbies) => hobbies.length !== 0;

const isDateValid = (date) => /^\d{4,4}-\d{2,2}-\d{2,2}$/.test(date);

const isPNValid = (phNumber) => /^\d{10,10}$/.test(phNumber);

const registerResponse = (form, response) => {
  if (form.isResponseValid(response)) {
    form.recordResponse(response);
  }

  if (form.isFormFilled()) {
    process.stdin.destroy();
    return;
  }

  console.log(form.currentPrompt() + ':');
};

const createrForm = () => {
  const nameField = new Field('name', 'Enter you name', identity, isNameValid);
  const dobField = new Field('dob', 'Enter you Dob', identity, isDateValid);
  const hobbiesField =
    new Field('hobbies', 'Enter you hobbies', splitToArray, isNotEmpty);
  const phNumberFiled =
    new Field('phno', 'Enter your phno', identity, isPNValid);

  const fields = [nameField, dobField, hobbiesField, phNumberFiled];
  return new Form(fields);
};

const main = () => {
  const form = createrForm();

  console.log(form.currentPrompt() + ':');

  process.stdin.on('data', (input) => {
    const responses = input.trim().split('\n');
    responses.forEach(response => {
      registerResponse(form, response);
    });
  });

  process.stdin.on('close', () => {
    const content = JSON.stringify(form.getAllResponses());
    fs.writeFileSync('formData.json', content, 'utf8');
    console.log('Thank you')
  });
};

main();
