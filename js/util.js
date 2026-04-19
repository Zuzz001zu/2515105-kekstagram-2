export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const showSuccessMessage = () => {
  const successTemplateElement = document.querySelector('#success');
  const successElement = successTemplateElement.content.cloneNode(true);
  const successMessageElement = successElement.querySelector('.success');
  const successButtonElement = successMessageElement.querySelector('.success__button');

  document.body.appendChild(successMessageElement);

  const onCloseSuccessMessage = () => {
    successMessageElement.remove();
    document.removeEventListener('keydown', onSuccessEscKeydown);
  };

  function onSuccessEscKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      onCloseSuccessMessage();
    }
  }

  successButtonElement.addEventListener('click', onCloseSuccessMessage);
  successMessageElement.addEventListener('click', (evt) => {
    if (evt.target === successMessageElement) {
      onCloseSuccessMessage();
    }
  });
  document.addEventListener('keydown', onSuccessEscKeydown);
};

export const showErrorMessage = (message) => {
  const errorTemplateElement = document.querySelector('#error');
  const errorElement = errorTemplateElement.content.cloneNode(true);
  const errorMessageElement = errorElement.querySelector('.error');
  const errorButtonElement = errorMessageElement.querySelector('.error__button');

  if (message) {
    const errorTitleElement = errorMessageElement.querySelector('.error__title');
    if (errorTitleElement) {
      errorTitleElement.textContent = message;
    }
  }

  document.body.appendChild(errorMessageElement);

  const onCloseErrorMessage = () => {
    errorMessageElement.remove();
    document.removeEventListener('keydown', onErrorEscKeydown);
  };

  function onErrorEscKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      onCloseErrorMessage();
    }
  }

  errorButtonElement.addEventListener('click', onCloseErrorMessage);
  errorMessageElement.addEventListener('click', (evt) => {
    if (evt.target === errorMessageElement) {
      onCloseErrorMessage();
    }
  });
  document.addEventListener('keydown', onErrorEscKeydown);
};

export const showDataErrorMessage = () => {
  const templateElement = document.querySelector('#data-error');
  const element = templateElement.content.cloneNode(true);
  document.body.appendChild(element);

  setTimeout(() => {
    document.querySelector('.data-error')?.remove();
  }, 5000);
};
