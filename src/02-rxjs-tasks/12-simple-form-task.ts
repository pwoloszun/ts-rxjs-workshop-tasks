import { Observable, merge, fromEvent, combineLatest, NEVER } from "rxjs";
import {
  concatMap,
  debounceTime, distinctUntilChanged, exhaustMap, map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';

import { RegistrationService } from "./services/registration.service";
import { fullObserver } from "./utils";

export class RegistrationFormComponent {

  private registrationService = new RegistrationService();

  private firstName$!: Observable<string>;
  private lastName$!: Observable<string>;
  private selectedPermision$!: Observable<string>;
  private monthlyIncome$!: Observable<number>;
  private monthsCount$!: Observable<number>;

  constructor() {
    this.initForm();
    // TODO
    // this.search();
    // this.calculateTax();
    // this.validateMonthlyIncome();
    // this.validateLastNamePermision();
  }

  // TODO: search()
  // simultaneously get values from both: firstNameControl & lastNameControl ->
  // debounce received values pair due to 0.3sec ->
  // for every received value send search(query) request AND
  //    listen to all responses
  search() {
  }

  // TODO: calculateTax()
  // get latest pair of values from: monthlyIncomeControl & monthsCountControl ->
  // debounce received values pair due to 0.3sec ->
  // for each received pair of values send calculateTax request BUT
  //    listen to only latest request (ignore all previously send requests)
  calculateTax() {
  }

  // TODO: validateMonthlyIncome()
  // for each received value of: monthlyIncomeControl ->
  // debounce each value due to 0.3sec ->
  // for each value send validation request BUT
  //    each subsequent validation request shuld be queued and wait for previous until completed
  validateMonthlyIncome() {
  }

  // TODO: validateLastNamePermision()
  // get latest pair of values from: lastNameControl & selectedPermisionControl ->
  // debounce each value due to 0.3sec ->
  // for each pair of values send validation request BUT
  //    for each subsequent validation request: start new only if previous has finished
  validateLastNamePermision() {
  }

  private initForm() {
    this.firstName$ = this.valueFrom$('.firstName');
    this.lastName$ = this.valueFrom$('.lastName');
    this.selectedPermision$ = this.valueFrom$('.selectedPermision');
    this.monthlyIncome$ = this.valueFrom$('.monthlyIncome');
    this.monthsCount$ = this.valueFrom$('.monthsCount');
  }

  private valueFrom$(selector: string): Observable<any> {
    // TODO stream of last field value
    // event 'keyup'
    // emit only changed values
    return NEVER;
  }

  private getEl(selector: string): Element {
    return document.querySelector(selector)!;
  }

}


function initSimpleForm() {
  new RegistrationFormComponent();
}

export function simpleFormTaskApp() {
  // initSimpleForm();
}
