class Field {
  #name;
  #prompt;
  #response;
  #validate;
  #parser;

  constructor(name, prompt, parser, validator) {
    this.#name = name;
    this.#prompt = prompt;
    this.#response = null;
    this.#parser = parser;
    this.#validate = validator;
  }

  getPrompt() {
    return this.#prompt;
  }

  fill(response) {
    this.#response = response;
  }

  getDetails() {
    return { name: this.#name, response: this.#parser(this.#response) };
  }

  isValid(response) {
    return this.#validate(response);
  }

  isFilled() {
    return this.#response !== null;
  }
}

module.exports = { Field };
