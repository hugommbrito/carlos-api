import { ArgumentsHost, Catch, ExceptionFilter, HttpException, NotImplementedException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
  catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp()
      const response = ctx.getResponse<Response>()
      const request = ctx.getRequest<Request>()
      const status = exception.getStatus()
      const cause = exception?.cause

      response
        .status(status)
        .json({
          statusCode: status,
          message: exception['message'],
          description: exception['options']['description'] || exception['response']['message'],
          timestamp: new Date().toISOString(),
          path: request.url,
          where: cause
        })
  }
}