import ErrorRoot from "./Error";

export default class FieldError extends ErrorRoot {
  constructor(field, ...params) {
    super(...params);

    this.field = field;

    this.params = new Error(...params);
  }
}
