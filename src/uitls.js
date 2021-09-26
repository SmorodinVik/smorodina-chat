// @ts-check

import * as yup from 'yup';

export default (name, channelNames) => {
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
