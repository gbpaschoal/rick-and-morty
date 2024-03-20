export class BadRequest extends Error {
  message = 'aconteceu error x';
  type = 'erro de render';

  constructor() {
    super();
    this.type;
  }
}
