import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from '@pizzabot/api-interfaces';
import { scan, takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pizzabot-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  private messages$$ = new Subject<Message>();
  private destroy$$ = new Subject();

  messages$: Observable<Message[]> = this.messages$$.pipe(
    scan((acc: Message[], curr: Message) => [...acc, curr], [])
  );

  constructor(private httpClient: HttpClient) { }

  ngOnDestroy(): void {
    this.destroy$$.next();
  }

  sendMessage({message}: {message: string, files: File[]}): void {
    const newMessage: Message = {
      text: message,
      date: new Date(),
      sender: 'Ruthi',
      reply: false,
      avatar: '/assets/ruthi.png'
    };

    this.messages$$.next(newMessage);

    this.getMessage(newMessage).pipe(
      takeUntil(this.destroy$$)
    ).subscribe(reply => this.messages$$.next(reply));
  }

  private getMessage(message: Message): Observable<Message> {
    return this.httpClient.post<Message>('/api/message', message);
  }
}
