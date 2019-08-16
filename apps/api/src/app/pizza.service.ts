import { Injectable, Logger } from '@nestjs/common';
import * as dialogflow from 'dialogflow';
import { DetectIntentRequest, DetectIntentResponse } from 'dialogflow';
import * as uuid from 'uuid/v4';
import { Message } from '@pizzabot/api-interfaces';

import * as creds from '../creds/creds.json';
import { PizzaParameters } from './models/pizza-parameters';

@Injectable()
export class PizzaService {
  private sessionClient = new dialogflow.SessionsClient({
    credentials: {
      private_key: creds.private_key,
      client_email: creds.client_email
    }
  });
  private sessionPath = this.sessionClient.sessionPath('mybot-vogftu', uuid());

  constructor(private logger: Logger) { }

  async sendMessage({text}: Message): Promise<string> {
    const request: DetectIntentRequest = {
      session: this.sessionPath,
      queryInput: {
        text: {
          text,
          languageCode: 'de-DE',
        },
      },
    };

    const responses: DetectIntentResponse[] = await this.sessionClient.detectIntent(request);

    if (responses.length < 1 || !responses[0].queryResult) {
      return 'I was not able to understand you. Please try again';
    }

    const parameters: PizzaParameters = responses[0].queryResult.parameters;

    this.logger.log(parameters);

    const fulfillmentText = responses[0].queryResult.fulfillmentText;

    return fulfillmentText || `Ich werde dir deine Pizza mit ${parameters.fields.belag.listValue.values.map(lv => lv.stringValue).join(', ')} ${parameters.fields.schneiden.stringValue === 'ja' ? 'geschnitten' : 'ungeschnitten'} ${parameters.fields.lieferzeitpunkt.stringValue} liefern.`;
  }
}
