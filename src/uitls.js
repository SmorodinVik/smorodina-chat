// @ts-check

import * as yup from 'yup';

export const validateChannelName = (name, channelNames) => {
  const schema = yup
    .string()
    .min(3, 'modals.errors.from3To20Symb')
    .max(20, 'modals.errors.from3To20Symb')
    .notOneOf(channelNames, 'modals.errors.channelExists')
    .required('modals.errors.required');

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
