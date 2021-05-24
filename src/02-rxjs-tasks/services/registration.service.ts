import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

function fakeResults(query) {
  const results = [];
  const resultsCount = 3;
  for (let i = 0; i < resultsCount; i++) {
    results.push(`Result for ${query} [${Math.random()}]`);
  }
  return results;
}

const delayInMs = 2400;

export class RegistrationService {

  search(query: string): Observable<string[]> {
    console.log(`REQ search()`, query);
    return of(fakeResults(query)).pipe(
      delay(delayInMs),
    );
  }

  calculateTax(income: number, monthsCount: number): Observable<number> {
    console.log(`REQ calculateTax()`, income);
    const taxRate = 0.2;
    return of(income * monthsCount * taxRate).pipe(
      delay(delayInMs),
    );
  }

  validate(value: any): Observable<Object> {
    console.log(`REQ validate()`, value);
    return of({ value, isValid: true }).pipe(
      delay(delayInMs),
    );
  }

}
