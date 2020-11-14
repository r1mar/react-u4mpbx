export default class ErrorRoot {
  constructor(message, fileName, lineNumber) {
    this.message = message;
    this.fileName = fileName;
    this.lineNumber = lineNumber;
  }
}
