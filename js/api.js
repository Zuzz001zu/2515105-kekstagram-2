const BASE_URL = 'https://25.javascript.pages.academy/kekstagram';
const GET_DATA_URL = `${BASE_URL}/data`;
const POST_DATA_URL = BASE_URL;

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
};

export const getPhotos = async () => {
  try {
    const response = await fetch(GET_DATA_URL);
    return await checkResponse(response);
  } catch (error) {
    throw new Error('Не удалось загрузить фотографии. Попробуйте позже.');
  }
};

export const sendPhoto = async (formData) => {
  try {
    const response = await fetch(POST_DATA_URL, {
      method: 'POST',
      body: formData,
    });
    return await checkResponse(response);
  } catch (error) {
    throw new Error('Не удалось отправить фото. Проверьте соединение и попробуйте снова.');
  }
};
