/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import * as R from "ramda";
import Api from "../tools/api";

const api = new Api();

/**
 * Я – пример, удали меня
 */
const wait = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const isLengthValid = R.allPass([
  R.pipe(R.length, R.lt(R.__, 10)),
  R.pipe(R.length, R.gt(R.__, 2)),
]);
const isPositive = R.pipe(Number, R.gt(R.__, 0));
const isNumber = R.test(/^\d*\.?\d+$/);

const round = R.pipe(Number, Math.round);

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  const log = R.tap(writeLog);
  const onError = () => handleError("ValidationError");

  log(value);

  // Валидация
  if (!isLengthValid(value) || !isPositive(value) || !isNumber(value)) {
    onError();
    return;
  }

  const rounded = round(value);
  log(String(rounded));

  // Перевод в двоичную систему
  api
    .get("https://api.tech/numbers/base", {
      from: 10,
      to: 2,
      number: String(rounded),
    })
    .then(({ result }) => {
      log(result);
      const length = result.length;
      log(String(length));
      const squared = Math.pow(length, 2);
      log(String(squared));
      const mod3 = squared % 3;
      log(String(mod3));
      return api.get(`https://animals.tech/${mod3}`);
    })
    .then(({ result }) => {
      handleSuccess(result);
    })
    .catch(() => handleError("ValidationError"));
};

export default processSequence;
