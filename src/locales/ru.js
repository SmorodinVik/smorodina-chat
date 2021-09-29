export default {
  translation: {
    logo: 'Hexlet Chat',
    exitBtn: 'Выйти',
    loginPage: {
      header: 'Войти',
      enterBtn: 'Войти',
      name: 'Ваш ник',
      pass: 'Пароль',
      noAcc: 'Нет аккаунта? ',
      registration: 'Регистрация',
      errors: {
        wrongNameOrPass: 'Неверное имя пользователя или пароль',
      },
    },
    signupPage: {
      header: 'Регистрация',
      regBtn: 'Зарегистрироваться',
      name: 'Имя пользователя',
      pass: 'Пароль',
      passConf: 'Подтвердите пароль',
      errors: {
        notLessThan3Symb: 'Не менее 3 символов',
        notMoreThan20Symb: 'Не более 20 символов',
        notLessThan6Symb: 'Не менее 6 символов',
        required: 'Обязательное поле',
        passwordsMustMatch: 'Пароли должны совпадать',
        userAlreadyExists: 'Пользователь с таким именем уже существует',
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
    modals: {
      addChannel: 'Добавить канал',
      renameChannel: 'Переименовать канал',
      deleteChannel: 'Удалить канал',
      areYouShure: 'Уверены?',
      buttons: {
        cancel: 'Отменить',
        add: 'Добавить',
        send: 'Отправить',
        delete: 'Удалить',
      },
      errors: {
        notLessThan3Symb: 'Не менее 3 символов',
        notMoreThan20Symb: 'Не более 20 символов',
        channelExists: 'Упс, такой канал уже есть',
        required: 'Обязательное поле',
      },
    },
  },
};
