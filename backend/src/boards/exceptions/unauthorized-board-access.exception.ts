import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedBoardAccessException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN); // HTTP 상태 코드는 403(FORBIDDEN)
  }
}
