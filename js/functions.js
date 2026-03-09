function lineLength (theLine, maxLinelength) {
  if (theLine.length <= maxLinelength) {
    return true;
  }
  return false;
}
lineLength('проверяемаястрока', 20);
lineLength('проверяемаястр', 18);
lineLength('провер', 10);

function polidrome (theLine) {
  const string = theLine.replaceAll(' ', '');
  const str = string.toLowerCase();
  let str1 = '';
  for (let i = str.length - 1; i >= 0; i--) {
    str1 += str.at(i);
  }
  return str === str1;
}

polidrome('топот');
polidrome('ДовОд');
polidrome('Кекс');
polidrome('Лёша на полке клопа нашёл ');
