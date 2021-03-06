export default {
  translation: {
    logo: 'Smorodina Chat',
    exitBtn: 'Выйти',
    loginPage: {
      header: 'Войти',
      enterBtn: 'Войти',
      name: 'Ваш ник',
      pass: 'Пароль',
      noAcc: 'Нет аккаунта? ',
      registration: 'Регистрация',
      errors: {
        wrongNameOrPass: 'Неверные имя пользователя или пароль',
      },
    },
    signupPage: {
      header: 'Регистрация',
      regBtn: 'Зарегистрироваться',
      name: 'Имя пользователя',
      pass: 'Пароль',
      confirmPass: 'Подтвердите пароль',
      errors: {
        from3To20Symb: 'От 3 до 20 символов',
        notLessThan6Symb: 'Не менее 6 символов',
        required: 'Обязательное поле',
        passwordsMustMatch: 'Пароли должны совпадать',
        userAlreadyExists: 'Такой пользователь уже существует',
      },
    },
    chatPage: {
      channels: 'Каналы',
      enterMessage: 'Введите сообщение',
      sendMessage: 'Отправить',
      messages: {
        message_one: '{{count}} сообщение',
        message_few: '{{count}} сообщения',
        message_many: '{{count}} сообщений',
      },
      buttons: {
        rename: 'Переименовать',
        delete: 'Удалить',
      },
    },
    errorPage: {
      pageNotFound: 'страница не найдена',
      errCode: '404',
      toTheMain: 'на главную',
    },
    modals: {
      addChannel: 'Добавить канал',
      renameChannel: 'Переименовать канал',
      deleteChannel: 'Удалить канал',
      areYouShure: 'Уверены?',
      buttons: {
        cancel: 'Отменить',
        send: 'Отправить',
        delete: 'Удалить',
      },
      errors: {
        from3To20Symb: 'От 3 до 20 символов',
        channelExists: 'Должно быть уникальным',
        required: 'Обязательное поле',
      },
    },
  },
};
