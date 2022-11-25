const TelegramApi = require('node-telegram-bot-api')
// const { data } = require('./db.js')
const token = '5824203782:AAGfMMRUygCYl3hYL8-atmR9Y_1DqI4v95g'

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

const db_test = () => {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: '79.141.66.70',
        port: '6033',
        user: 'leanevent',
        password: 'GMwqbJYpJW3B',
        database: 'leanevent_db'
    });

    connection.connect();
    // let data = "S";
    // connection.query('SELECT1+1  AS solution', function (error, results, fields) {
    //     if (error) console.log(error);
    //     data = 'The solution is: ' + results[0].solution;
    // });




    console.log("hey!")
    connection.end();
}
db_test();

const start = async () => {


    bot.setMyCommands([
        {
            command: '/start', description: 'Начать'
        },
        {
            command: '/info', description: 'Подробнее'
        }
    ])
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === "/start") {
            return bot.sendMessage(chatId, 'Добро пожаловать в телеграм бот Lean Event!')
        }
        if (text === "/info") {
            return bot.sendMessage(chatId, 'Lean Event поможет организаторам МПИТ, автоматизировать соревнования')
        }
        return bot.sendMessage(chatId, "Я тебя не понимаю", someOptions)
    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        bot.sendMessage(chatId, "Спасибо за ответ!")
        return console.log(msg)
    })
}

start();