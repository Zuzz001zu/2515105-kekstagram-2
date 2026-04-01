import Pristine from '../vendor/pristine/pristine.min.js';

const form = document.querySelector('.img-upload__form');
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');

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

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text__error',
});

pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  'Некорректный хэштег. Хэштег должен начинаться с #, содержать только буквы и цифры, не более 20 символов. Максимум 5 хэштегов.'
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagsUnique,
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  descriptionInput,
  validateDescription,
  'Комментарий не должен превышать 140 символов'
);

hashtagsInput.addEventListener('input', () => {
  pristine.validate(hashtagsInput);
});

descriptionInput.addEventListener('input', () => {
  pristine.validate(descriptionInput);
});

export { pristine };
