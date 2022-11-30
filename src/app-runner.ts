import { myImportsApp } from "./01-ts-tasks/00-modules/00-modules-presentation/my-imports";

// TS
// import { moduleTaskApp } from "./01-ts-tasks/00-modules/01-modules-task";
// import { stringsApp } from "./01-ts-tasks/01-basics/02-strings";
// import { hotObservableApp } from "./02-rxjs-tasks/05-hot-observables/01-hot-observables";
// import { webSocketTaskApp } from "./02-rxjs-tasks/05-hot-observables/web-socket-task";
// import { enumsApp } from "./01-ts-tasks/01-basics/03-enums";
// import { functionsApp } from "./01-ts-tasks/01-basics/04-functions";
// import { functionsContextApp } from "./01-ts-tasks/01-basics/06-functions-context";
// import { adminTaskApp } from "./01-ts-tasks/02-oop/01-classes/01-admin-task";
// import { eventedExampleUsageApp } from "./01-ts-tasks/02-oop/03-timer-task/01-evented-example-usage";
// import { timerApp } from "./01-ts-tasks/02-oop/03-timer-task/01-timerApp";
// import { arrayListTaskApp } from "./01-ts-tasks/03-generics/02-array-list-task";
// import { decoratorsTaskApp } from "./01-ts-tasks/04-decorators/01-decorators-task";
// import { logClassApp } from "./01-ts-tasks/04-decorators/00-decrators-presentation/01-class-decorators";
// import { methodDecoratorApp } from "./01-ts-tasks/04-decorators/00-decrators-presentation/02-method-decorator";
// import { propertyDecoratorsApp } from "./01-ts-tasks/04-decorators/00-decrators-presentation/03-property-decorators";

// RxJS
import { myObservablesApp } from "./02-rxjs-tasks/01-my-observables";
import { mySubscriptionsApp } from "./02-rxjs-tasks/02-my-subscriptions";
import { myOperatorsApp } from "./02-rxjs-tasks/03-my-operators";
import { builtInApp } from "./02-rxjs-tasks/04-built-in";
import { combineMultipleStreamsApp } from "./02-rxjs-tasks/05-combine-mutiple-streams";
import { myHooOperatorsApp } from "./02-rxjs-tasks/06-my-hoo-operators";
import { higherOrderObservablesApp } from "./02-rxjs-tasks/07-higher-order-observable";
import { catchRetryTaskApp } from "./02-rxjs-tasks/08-catch-retry-task";
import { complexTaskApp } from "./02-rxjs-tasks/09-complex-task";
import { autocompleteTaskApp } from "./02-rxjs-tasks/10-autocomplete-task";
import { ajaxWebSocketTaskApp } from "./02-rxjs-tasks/11-ajax-web-sockets-tasks";
import { simpleFormTaskApp } from "./02-rxjs-tasks/12-simple-form-task";
import { subjectExamplesApp } from "./02-rxjs-tasks/13-subject-examples";
import { intersectionTypesApp } from "./01b-ts-adv-tasks/03-intersection-types";
import { mixinsApp } from "./01b-ts-adv-tasks/04-mixin";
import { unionsAliasesApp } from "./01b-ts-adv-tasks/02-unions-aliases";
import { realEstatesServiceTaskApp } from "./02-rxjs-tasks/14-real-estates-service-task";
import { customRxOperators } from './02-rxjs-tasks/15-custom-rx-operators';

// promises
// import { promiseBasiscsApp } from './03-promises-tasks/07-cy-promises-examples/01-promise-basics';
// import { basicsTasksApp } from './03-promises-tasks/08-cy-tasks/01-basics-tasks';
// import { cyPromiseTasksApp } from './03-promises-tasks/08-cy-tasks/02-cy-promise-tasks';
// import { asyncAwaitExamplesApp } from './03-promises-tasks/07-cy-promises-examples/04-async-await-examples';
// import { promiseChainingApp } from './03-promises-tasks/07-cy-promises-examples/02-promise-chaining';


export class AppRunner {
  run() {
    // myObservablesApp();
    mySubscriptionsApp();
  }
}
