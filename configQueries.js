class ConfigQueries {
  constructor() {
    this.Questions = [];
  }

  config(title, question, parser, validate) {
    const field = { title, question, parser, validate };
    this.Questions.push(field);
  }

  getConfig() {
    return this.Questions;
  }
}

exports.ConfigQueries = ConfigQueries;
