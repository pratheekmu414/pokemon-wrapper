import { Response } from "express";

export interface IResonseHandler {
  handleSuccess: (res: Response, message: string, data: Object) => {};
  handleError: (res: Response, message: string, data: unknown) => {};
}

class ResponseHandlers implements IResonseHandler {
  handleSuccess(res: Response, message: string, data: Object) {
    const status = {
      success: true,
      message,
    };
    return res.json({ status, result: data });
  }
  handleError(res: Response, message: string, data: unknown) {
    const status = {
      success: false,
      message,
    };
    return res.json({ status, error: data });
  }
}

export const responseHandler = new ResponseHandlers();
