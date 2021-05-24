// ======
// function interface

// todo FetchDataCallback
interface FetchDataCallback {
  (data: any, error?: Error): void;
}

interface User {
  login: string;
}

function fetchData(url: string, callback: Function): void {
}

function fetchApp() {
  fetchData('/api/users', function (users: User[], error?: Error) {
    // ...
  })
}
