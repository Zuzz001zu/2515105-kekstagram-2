export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success');
  const successElement = successTemplate.content.cloneNode(true);
  const successMessage = successElement.querySelector('.success');
  const successButton = successMessage.querySelector('.success__button');

  document.body.appendChild(successMessage);

  const closeSuccessMessage = () => {
    successMessage.remove();
    document.removeEventListener('keydown', onSuccessEscKeydown);
  };

  function onSuccessEscKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeSuccessMessage();
    }
  }

  successButton.addEventListener('click', closeSuccessMessage);
  successMessage.addEventListener('click', (evt) => {
    if (evt.target === successMessage) {
      closeSuccessMessage();
    }
  });
  document.addEventListener('keydown', onSuccessEscKeydown);
};

export const showErrorMessage = (message) => {
  const errorTemplate = document.querySelector('#error');
  const errorElement = errorTemplate.content.cloneNode(true);
  const errorMessage = errorElement.querySelector('.error');
  const errorButton = errorMessage.querySelector('.error__button');

  if (message) {
    const errorTitle = errorMessage.querySelector('.error__title');
    if (errorTitle) {
      errorTitle.textContent = message;
    }
  }

  document.body.appendChild(errorMessage);

  const closeErrorMessage = () => {
    errorMessage.remove();
    document.removeEventListener('keydown', onErrorEscKeydown);
  };

  function onErrorEscKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeErrorMessage();
    }
  }

  errorButton.addEventListener('click', closeErrorMessage);
  errorMessage.addEventListener('click', (evt) => {
    if (evt.target === errorMessage) {
      closeErrorMessage();
    }
  });
  document.addEventListener('keydown', onErrorEscKeydown);
};
