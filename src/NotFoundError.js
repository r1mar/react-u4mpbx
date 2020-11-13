import Error from "./Error";

export default class NotFoundError extends Error {
  constructor(...params) {
    super("Nicht gefunden", ...params);
  }
}
