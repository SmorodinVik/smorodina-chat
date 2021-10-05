// @ts-check

import * as yup from 'yup';

const validateChannelName = (name, channelNames) => {
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

export default validateChannelName;
