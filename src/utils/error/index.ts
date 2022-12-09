import { ERROR_STATUS } from "./error.constants";
import { IErrorMessage } from "./error.interface";

export const createErrorMessage = (
  status: number,
  e: any,
  message?: string
): IErrorMessage => {
  switch (status) {
    case ERROR_STATUS.INTERNAL_SERVER_ERROR:
      return {
        status: ERROR_STATUS.INTERNAL_SERVER_ERROR,
        error: e,
        message: message ?? "Internal Server Error",
      };
    case ERROR_STATUS.BAD_REQUEST:
      return {
        status: ERROR_STATUS.BAD_REQUEST,
        error: e,
        message: message ?? "Bad Request",
      };
    default:
      return {
        status: ERROR_STATUS.BAD_REQUEST,
        error: e,
        message: "Bad Request",
      };
  }
};
