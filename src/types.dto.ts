import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';

/**
 * Abstract class representing a request body whit a single object.
 */
export abstract class ObjectRequestBody<T> {
  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested()
  abstract data: T;
}

/**
 * Abstract class representing a request body with an array of objects.
 */
export abstract class ArrayRequestBody<T> {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  abstract data: T[];
}

/**
 * Represents a response body with a status of 'success'.
 * @template T - The type of data included in the response body.
 * @property {string} status - The status of the response, always set to 'success'.
 * @property {T | null} data - The actual data included in the response body, can be of type T or null.
 * @property {unknown} [meta] - Additional metadata that may be included in the response body.
 */
export class SuccessResponseBody<T> {
  /** @example success */
  readonly status: 'success';
  data: T | null;
  meta?: unknown;
}

/**
 * Represents a response body for client errors.
 * @property {string} status - The status of the response, always set to 'fail'.
 * @property {object} data - Contains error details.
 * @property {string} data.errorCode - The error code, e.g., 'BAD_REQUEST'.
 * @property {unknown[]} data.errors - An array of error messages.
 */
export class FailResponseBody {
  /** @example fail */
  readonly status: 'fail';
  data: {
    /** @example BAD_REQUEST */
    errorCode: string;
    /** @example [ "data.title should not be empty", "data.title must be a string"] */
    errors: unknown[];
  };
}

/**
 * Represents a response body for server errors.
 * @property {string} status - The status of the response, always set to 'error'.
 * @property {object} data - Contains error details.
 * @property {string} data.errorCode - The error code, e.g., 'INTERNAL_SERVER_ERROR'.
 * @property {string} message - The error message, e.g., "Internal Server Error".
 */
export class ErrorResponseBody {
  /** @example error */
  readonly status: 'error';
  data: {
    /** @example INTERNAL_SERVER_ERROR */
    errorCode: string;
  };
  /** @example "Internal Server Error" */
  message: string;
}
