import '../vendor/pristine/pristine.min.js';

const Pristine = window.Pristine;
const formElement = document.querySelector('.img-upload__form');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const descriptionInputElement = formElement.querySelector('.text__description');

const validateHashtags = (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > 5) {
    return false;
  }

  return hashtags.every((hashtag) => hashtag.startsWith('#') && /^#[a-zа-яё0-9]{1,19}$/i.test(hashtag));
};

const validateHashtagsUnique = (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = value.trim().toLowerCase().split(/\s+/);
  const uniqueHashtags = new Set(hashtags);

  return hashtags.length === uniqueHashtags.size;
};

const validateDescription = (value) => value.length <= 140;

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text__error',
});

pristine.addValidator(
  hashtagsInputElement,
  validateHashtags,
  'Некорректный хэштег. Хэштег должен начинаться с #, содержать только буквы и цифры, не более 20 символов. Максимум 5 хэштегов.'
);

pristine.addValidator(
  hashtagsInputElement,
  validateHashtagsUnique,
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  descriptionInputElement,
  validateDescription,
  'Комментарий не должен превышать 140 символов'
);

hashtagsInputElement.addEventListener('input', () => {
  pristine.validate(hashtagsInputElement);
});

descriptionInputElement.addEventListener('input', () => {
  pristine.validate(descriptionInputElement);
});

export { pristine };
