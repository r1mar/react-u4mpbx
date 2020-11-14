import ErrorRoot from "./Error";

export default class NotFoundError extends ErrorRoot {
  constructor(...params) {
    super("Nicht gefunden", ...params);
  }
}
