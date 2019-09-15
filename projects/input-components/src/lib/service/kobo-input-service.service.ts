import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KoboInputServiceService {
  private dismissSelectSubject: Subject<string> = new Subject();
  dismissSelectObservable = this.dismissSelectSubject.asObservable();
  constructor() { }

  dismissSelect(id: string) {
    this.dismissSelectSubject.next(id);
  }
}
