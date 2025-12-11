const Method = {
  GET: 'GET',
  POST: 'POST',
};

const Url = {
  GET: 'https://31.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://31.javascript.htmlacademy.pro/kekstagram'
};

const ErrorText = {
  [Method.GET] : 'Не удалось получить данные. Попробуйте еще раз.',
  [Method.POST]: 'Не удалось отправить форму.',
};

const getData = (onSuccess, onFail) => {
  fetch(Url.GET)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail(ErrorText[Method.GET]);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(Url.POST, { method: Method.POST, body })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail(ErrorText[Method.POST]);
      }
    })
    .catch(() => {
      onFail(ErrorText[Method.POST]);
    });
};

export { getData, sendData };
