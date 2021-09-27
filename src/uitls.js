// @ts-check

import * as yup from 'yup';

export const validateChannelName = (name, channelNames) => {
  const schema = yup
    .string()
    .min(3, 'Не менее 3 символов')
    .max(20, 'Не более 20 символов')
    .notOneOf(channelNames, 'Упс, такой канал уже есть')
    .required('Обязательное поле');

  try {
    schema.validateSync(name);
    return null;
  } catch (err) {
    return err.message;
  }
};

export const getNoun = (number, one, two, five) => {
  // eslint-disable-next-line functional/no-let
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
};
