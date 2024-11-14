/* eslint-disable prettier/prettier */
// there i put the code 
import { Injectable } from '@nestjs/common';

@Injectable() // for refrence
export class AppService {
  getHello(): string {
    return 'Hello World!!';
  }
}
