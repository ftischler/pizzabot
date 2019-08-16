import { Logger, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { PizzaService } from './pizza.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    PizzaService,
    { provide: Logger, useValue: new Logger('🍕 PIZZABOT 🍕') }
  ]
})
export class AppModule {
}
