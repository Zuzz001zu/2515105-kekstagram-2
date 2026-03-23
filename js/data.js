import { getRandomInt } from './util.js';

function createCommentIdGenerator() {
  let lastId = 0;
  return () => {
    lastId++;
    return lastId;
  };
}

const getNextCommentId = createCommentIdGenerator();

const SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Александр', 'Екатерина', 'Дмитрий', 'Анна', 'Михаил',
  'Ольга', 'Сергей', 'Татьяна', 'Андрей', 'Наталья',
  'Иван', 'Мария', 'Владимир', 'Елена', 'Николай'
];

const PHOTO_DESCRIPTIONS = [
  'Красивый закат над морем', 'Уютное кафе в центре города',
  'Прогулка по осеннему парку', 'Мой любимый кот', 'Вкусный завтрак',
  'Новый рассвет', 'Вечерний город', 'Встреча с друзьями',
  'Путешествие в горы', 'Цветущий сад', 'Архитектурная деталь',
  'Уличный музыкант', 'Дождливый день', 'Семейный ужин',
  'Спортивный момент', 'Художественная инсталляция', 'Ночное небо',
  'Летний пляж', 'Зимняя сказка', 'Весеннее настроение',
  'Книга и кофе', 'Городская суета', 'Природная красота',
  'Момент счастья', 'Вдохновение'
];

function generateRandomMessage() {
  const sentenceCount = Math.random() > 0.5 ? 1 : 2;
  const randomIndex = Math.floor(Math.random() * SENTENCES.length);
  let message = SENTENCES[randomIndex];

  if (sentenceCount === 2) {
    let secondIndex;
    do {
      secondIndex = Math.floor(Math.random() * SENTENCES.length);
    } while (secondIndex === randomIndex);
    message += ` ${SENTENCES[secondIndex]}`;
  }

  return message;
}

function generateComments(count) {
  const comments = [];

  for (let i = 0; i < count; i++) {
    comments.push({
      id: getNextCommentId(),
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: generateRandomMessage(),
      name: NAMES[getRandomInt(0, NAMES.length - 1)]
    });
  }

  return comments;
}

export function generatePhotos() {
  const generatedPhotos = [];

  for (let i = 1; i <= PHOTO_DESCRIPTIONS.length; i++) {
    generatedPhotos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: PHOTO_DESCRIPTIONS[i - 1],
      likes: getRandomInt(15, 200),
      comments: generateComments(getRandomInt(0, 30))
    });
  }

  return generatedPhotos;
}
