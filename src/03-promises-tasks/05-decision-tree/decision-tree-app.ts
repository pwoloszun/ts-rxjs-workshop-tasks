/* eslint-disable no-alert */

/* eslint-disable no-else-return */

function alertPromise(text) {
  return new Promise((resolve) => {
    window.alert(text);
    resolve(true);
  });
}

function confirmPromise(text) {
  return new Promise((resolve) => {
    resolve(window.confirm(text));
  });
}

function promptPromise(text) {
  return new Promise((resolve) => {
    const result = window.prompt(text);
    resolve(result);
  });
}

function selectPromise(text, successResp, rejectResp) {
  const validResponses = [successResp.toUpperCase(), rejectResp.toUpperCase()];
  const question = `${text} [${validResponses.join(', ')}]`;
  return new Promise((resolve) => {
    let isValidResponse = false;
    let result = null;
    while (!isValidResponse) {
      result = window.prompt(question);
      isValidResponse = validResponses.indexOf(result.toUpperCase()) > -1;
    }
    resolve(result.toUpperCase() === successResp.toUpperCase());
  });
}


export default function decisionTreeApp() {
  selectPromise('Co chcesz robic w zyciu?', 'Pracowac', 'Lowic ryby').then((hasChosenFirstOption) => {
    if (hasChosenFirstOption) {
      return confirmPromise('Czy chcesz dalej pracowac?').then((hasConfirmed) => {
        if (hasConfirmed) {
          return alertPromise('Brawo! Zostales pracownikiem miesiaca!');
        } else {
          return alertPromise('Zostales bezrobotny');
        }
      });
    } else {
      return confirmPromise('Udalo Ci sie juz cos zlowic?').then((hasConfirmed) => {
        if (hasConfirmed) {
          return promptPromise('Ile wazyla Twoja zdobycz? [kg]').then((fishWeight) => {
            const msg = (+fishWeight > 2.5) ? `${fishWeight}?!? Congratz!` : `${fishWeight} to niezle, ale stac Cie na wiecej`;
            return alertPromise(msg);
          });
        } else {
          return alertPromise('Nie poddawaj sie :)');
        }
      });
    }
  }).catch((error) => {
    console.log('decisionTreeApp ERROR', error);
  });
}
