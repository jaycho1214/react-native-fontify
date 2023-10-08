export const ErrorCodeiOS = [
  'ERR_FILE_NOT_FOUND',
  'ERR_FONT_LOAD',
  'ERR_FONT_REGISTRATION_UNKNOWN',
  'ERR_FONT_REGISTRATION',
] as const;
export const ErrorCodeAndroid = [
  'ERR_FILE_NOT_FOUND',
  'ERR_FONT_REGISTRATION',
] as const;

export type ErrorCodeiOS = (typeof ErrorCodeiOS)[number];
export type ErrorCodeAndroid = (typeof ErrorCodeAndroid)[number];
export type ErrorCode = ErrorCodeiOS | ErrorCodeAndroid;

export class FontifyError extends Error {
  message: string;

  code: ErrorCode;

  constructor(message: string, code: ErrorCode) {
    super(message);
    this.message = message;
    this.code = code;
    this.name = 'FontifyError';
  }

  static readonly ERR_FILE_NOT_FOUND = 'ERR_FILE_NOT_FOUND';
  static readonly ERR_FONT_LOAD = 'ERR_FONT_LOAD';
  static readonly ERR_FONT_REGISTRATION_UNKNOWN =
    'ERR_FONT_REGISTRATION_UNKNOWN';
  static readonly ERR_FONT_REGISTRATION = 'ERR_FONT_REGISTRATION';

  toJSON() {
    return {
      message: this.message,
      name: this.name,
      cause: this.cause,
      code: this.code,
      stack: this.stack,
    };
  }
}
