const TelegramApi = require('node-telegram-bot-api')
// const { data } = require('./db.js')
const token = '5824203782:AAGfMMRUygCYl3hYL8-atmR9Y_1DqI4v95g'
const { db_create_table, db_add_team, db_drop_table } = require('./db.js')
const bot = new TelegramApi(token, { polling: true })

const someOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Готов', callback_data: 'true' }],
            [{
                text: 'Не готов', callback_data: 'false'
            }]
        ]
    })
}

// db_create_table();
// db_drop_table();

let adminID = 342559638;
let chats = []
const db_all_chatID = () => {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: '79.141.66.70',
        port: '6033',
        user: 'stef',
        password: 'password',
        database: 'leanevent_db'
    });

    connection.connect();
    connection.query("select distinct chatID from registrations", function (error, results, fields) {
            if (error) throw error;
            chats = results;
            noti();
            console.log('The solutions is: ' + results)
        })
    connection.end();
}


const db_create_team = (form) => {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: '79.141.66.70',
        port: '6033',
        user: 'stef',
        password: 'password',
        database: 'leanevent_db'
    });

    connection.connect();
    connection.query("INSERT INTO registrations (name, regions, email, chatID) VALUES ('" +
        form.name + "', '" +
        form.regions + "' , '" +
        form.email + "', '" +
        form.chatID + "')", function (error, results, fields) {
            if (error) throw error;
            console.log('The solutions is: ' + results)
        })
    
    connection.end();
}

const noti = async () => {
    console.log(chats[0].chatID)
    for (let i = 0; i < chats.length; i++) {
        bot.sendMessage(chats[i].chatID, "Разбудить Андрея в 7ч")
    }

}


const start = async () => {
    let checker = 0;
    let form = {
        name: undefined,
        regions: undefined,
        email: undefined,
        chatID: undefined
    }
    bot.setMyCommands([
        {
            command: '/start', description: 'Начать'
        },
        {
            command: '/stop', description: 'Остановить регистрацию'
        },
        {
            command: '/info', description: 'Подробнее'
        },
        {
            command: '/register', description: 'Регистрация команды'
        }
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (chatId === adminID) {
            bot.setMyCommands([
                {
                    command: '/start', description: 'Начать'
                },
                {
                    command: '/notiall', description: 'Всем написать'
                }
            ])
        }

        if (text === "/notiall" && chatId === adminID) {
            db_all_chatID();
        }
        if (text === "/stop") {
            checker = 0;
            return bot.sendMessage(chatId, 'Пока!')
        }
        if (checker === 1) {
            form.name = text;
            checker = 2;
            return bot.sendMessage(chatId, 'Укажите ваш email адрес!')
        }
        if (checker === 2) {
            form.email = text;
            checker = 3;
            return bot.sendMessage(chatId, 'Укажите ваш регион')
        }
        if (checker === 3) {
            form.regions = text;
            checker = 0;
            console.log(form)
            db_create_team(form)
            return bot.sendMessage(chatId, 'Данные отправлены!')
        }
        if (text === "/register") {
            form.chatID = chatId;
            checker = 1;
            return bot.sendMessage(chatId, 'Какое название вашей команды?')
        }
        if (text === "/start") {
            return bot.sendMessage(chatId, 'Добро пожаловать в телеграм бот Lean Event! Чтобы зарегистрировать команду, напишите /register')
        }
        if (text === "/info") {
            return bot.sendMessage(chatId, 'Lean Event поможет организаторам МПИТ, автоматизировать соревнования')
        }
    })


    // bot.onText(/команда (.+)/, async (msg, match) => {
    //     const chatId = msg.from.id;
    //     const text = match[1];
    //     if (text.length < 2) {
    //         return bot.sendMessage(chatId, "Название слишком короткое")
    //     }
    //     db_create_team(text, chatId);
    //     bot.sendMessage(chatId, 'Отлично! Ваша команда ' + text);
    // })
    // bot.on('message', async msg => {
    //     const text = msg.text;
    //     const chatId = msg.chat.id;
    //     if (text === "/start") {

    //         return bot.sendMessage(chatId, 'Добро пожаловать в телеграм бот Lean Event!')
    //     }
    //     if (text === "/info") {
    //         return bot.sendMessage(chatId, 'Lean Event поможет организаторам МПИТ, автоматизировать соревнования')
    //     }
    //     // return bot.sendMessage(chatId, "Я тебя не понимаю", someOptions)
    // })

    // bot.on('callback_query', msg => {
    //     const data = msg.data;
    //     const chatId = msg.message.chat.id;

    //     bot.sendMessage(chatId, "Спасибо за ответ!")
    //     return console.log(msg)
    // })
}

start();