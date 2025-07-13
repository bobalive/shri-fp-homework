/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import * as R from "ramda";

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({ star, square, triangle, circle }) => {
  if (triangle !== "white" || circle !== "white") {
    return false;
  }

  return star === "red" && square === "green";
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = ({ star, square, triangle, circle }) =>
  R.pipe(
    R.values,
    R.filter(R.equals("green")),
    R.length,
    R.gte(R.__, 2)
  )({ star, square, triangle, circle });

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = ({ star, square, triangle, circle }) => {
  const colors = R.values({ star, square, triangle, circle });
  return R.equals(
    R.count(R.equals("red"), colors),
    R.count(R.equals("blue"), colors)
  );
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = ({ star, square, triangle, circle }) =>
  star === "red" && square === "orange" && circle === "blue";

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = ({ star, square, triangle, circle }) => {
  const colors = R.values({ star, square, triangle, circle });
  const colorCounts = R.countBy(R.identity, colors);
  return R.pipe(
    R.toPairs,
    R.filter(([color]) => color !== "white"),
    R.map(([, count]) => count),
    R.any(R.gte(R.__, 3))
  )(colorCounts);
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = ({ star, square, triangle, circle }) => {
  const colors = { star, square, triangle, circle };
  const greenCount = R.count(R.equals("green"), R.values(colors));
  const redCount = R.count(R.equals("red"), R.values(colors));
  const triangleIsGreen = triangle === "green";
  return greenCount === 2 && redCount === 1 && triangleIsGreen;
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = ({ star, square, triangle, circle }) =>
  R.all(R.equals("orange"), R.values({ star, square, triangle, circle }));

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = ({ star }) => star !== "red" && star !== "white";

// 9. Все фигуры зеленые.
export const validateFieldN9 = ({ star, square, triangle, circle }) =>
  R.all(R.equals("green"), R.values({ star, square, triangle, circle }));

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = ({ star, square, triangle, circle }) => {
  return triangle === square && triangle !== "white";
};
