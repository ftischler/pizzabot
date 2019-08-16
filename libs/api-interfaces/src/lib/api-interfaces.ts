export interface Message {
  text: string;
  sender: 'Ruthi' | '🍕🤖 Pizzabot';
  date: Date;
  reply: boolean;
  avatar?: string;
}
