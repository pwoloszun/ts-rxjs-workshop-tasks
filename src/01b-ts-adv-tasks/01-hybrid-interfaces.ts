interface AjaxFunction {
  (url: string, data?: any): XMLHttpRequest;
}

interface MyJQuery {
  (selector: string): Element;

  version: string;
  ajax: AjaxFunction;
}


const jQuery: MyJQuery = <MyJQuery>function (selector: string): Element {
  // ...
  return {
    innerHTML: ''
  } as Element;
};

jQuery.version = '2.4.1';
jQuery.ajax = function (url: string, data?: any): XMLHttpRequest {
  // ...
  return null;
};


export function clientCode($: MyJQuery) {
  $.ajax('/api/users');
  $('.my-user').innerHTML = 'a qq!';
}
