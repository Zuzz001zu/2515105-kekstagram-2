function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createCommentIdGenerator() {
  let lastId = 0;
  return function() {
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
  'Александр',
  'Екатерина',
  'Дмитрий',
  'Анна',
  'Михаил',
  'Ольга',
  'Сергей',
  'Татьяна',
  'Андрей',
  'Наталья',
  'Иван',
  'Мария',
  'Владимир',
  'Елена',
  'Николай'
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
    const avatarNumber = getRandomInt(1, 6);
    const nameIndex = getRandomInt(0, NAMES.length - 1);

    comments.push({
      id: getNextCommentId(),
      avatar: `img/avatar-${avatarNumber}.svg`,
      message: generateRandomMessage(),
      name: NAMES[nameIndex]
    });
  }
  return comments;
}

function generatePhotos() {
  const generatedPhotos = [];

  for (let i = 1; i <= 25; i++) {
    const commentsCount = getRandomInt(0, 30);
    const likesCount = getRandomInt(15, 200);

    const descriptions = [
      'Красивый закат над морем',
      'Уютное кафе в центре города',
      'Прогулка по осеннему парку',
      'Мой любимый кот',
      'Вкусный завтрак',
      'Новый рассвет',
      'Вечерний город',
      'Встреча с друзьями',
      'Путешествие в горы',
      'Цветущий сад',
      'Архитектурная деталь',
      'Уличный музыкант',
      'Дождливый день',
      'Семейный ужин',
      'Спортивный момент',
      'Художественная инсталляция',
      'Ночное небо',
      'Летний пляж',
      'Зимняя сказка',
      'Весеннее настроение',
      'Книга и кофе',
      'Городская суета',
      'Природная красота',
      'Момент счастья',
      'Вдохновение'
    ];

    generatedPhotos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: descriptions[i - 1],
      likes: likesCount,
      comments: generateComments(commentsCount)
    });
  }

  return generatedPhotos;
}

const photos = generatePhotos();

window.photos = photos;
