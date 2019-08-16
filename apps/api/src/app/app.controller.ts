import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { Message } from '@pizzabot/api-interfaces';
import { PizzaService } from './pizza.service';

@Controller()
export class AppController {
  constructor(private pizzaService: PizzaService) { }

  @Post('message')
  @HttpCode(HttpStatus.OK)
  async message(@Body() message: Message): Promise<Message> {
    return {
      text: await this.pizzaService.sendMessage(message),
      date: new Date(),
      sender: '🍕🤖 Pizzabot',
      avatar: 'https://images.unsplash.com/photo-1490717064594-3bd2c4081693?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
      reply: true
    };
  }
}
