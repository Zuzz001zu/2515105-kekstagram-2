function lineLength (theLine, maxLinelength) {
  return theLine.length <= maxLinelength;
}

lineLength('проверяемаястрока', 20);
lineLength('проверяемаястр', 18);
lineLength('провер', 10);

function checkPalidrome (theLine) {
  const str = theLine.replaceAll(' ', '').toLowerCase();
  let obtainedString = '';

  for (let i = str.length - 1; i >= 0; i--) {
    obtainedString += str.at(i);
  }
  return str === obtainedString;
}

checkPalidrome('топот');
checkPalidrome('ДовОд');
checkPalidrome('Кекс');
checkPalidrome('Лёша на полке клопа нашёл ');
