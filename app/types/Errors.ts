export enum ErrorTypes {
  ERR_AUTH = "ERR_AUTH",
}

export interface IError extends Error {
  statusCode: number;
}
