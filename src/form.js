class Form {
  constructor(fields) {
    this.fields = fields;
    this.index = 0;
    this.answers = {};
  }

  currentPrompt() {
    return this.fields[this.index].getPrompt();
  }

  isResponseValid(response) {
    const currentField = this.fields[this.index];
    return currentField.isValid(response);
  }

  isFormFilled() {
    return this.fields.every(field => field.isFilled());
  }

  recordResponse(response) {
    const currentField = this.fields[this.index];
    currentField.fill(response);
    this.index++;
  }

  getAllResponses() {
    const responses = {};
    this.fields.forEach(field => {
      const { name, response } = field.getDetails();
      responses[name] = response;
    });

    return responses;
  }
}

module.exports = { Form };
