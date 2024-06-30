import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';

// export type RequestBody<T> = {
//   data: T;
// };

// export type ResponseBody<T> =
//   | SuccessResponseBody<T>
//   | FailResponseBody
//   | ErrorResponseBody;

// export type SuccessResponseBody<T> = {
//   status: 'success';
//   data: T | null;
// };

// export type FailResponseBody = {
//   status: 'fail';
//   data: {
//     errorCode: string;
//     errors: unknown[];
//   };
// };

// export type ErrorResponseBody = {
//   status: 'error';
//   data: {
//     errorCode: string;
//     meta: unknown;
//   };
//   message: string;
// };

export abstract class ObjectRequestBody<T> {
  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested()
  abstract data: T;
}

export abstract class ArrayRequestBody<T> {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  abstract data: T[];
}

// TODO Revisar la declaración de estos tipos luego de ver la generación automática de documentación.
export abstract class ResponseBody {
  abstract status: string;
}

export class SuccessResponseBody<T> extends ResponseBody {
  readonly status: 'success';
  data: T | null;
}

export class FailResponseBody extends ResponseBody {
  readonly status: 'fail';
  data: {
    errorCode: string;
    errors: unknown[];
  };
}

export class ErrorResponseBody extends ResponseBody {
  readonly status: 'error';
  data: {
    errorCode: string;
    meta: unknown;
  };
  message: string;
}
