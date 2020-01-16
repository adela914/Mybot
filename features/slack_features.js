const { SlackDialog } = require('botbuilder-adapter-slack');
const mongoose = require('mongoose')
const Movie = require('../db/database')


module.exports = function(controller) {

    controller.hears(['Hi', 'Hello', 'Hey'], 'message,direct_message', async(bot, message) => {
        const content = {
            "blocks": [{
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Hello, how can I help you?🤓"
                    }
                },

                {
                    "type": "actions",
                    "elements": [{
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Recommend a movie",
                                "emoji": true
                            },
                            "value": "choice1"
                        },
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Not at all",
                                "emoji": true
                            },
                            "value": "choice2"
                        }

                    ]
                }
            ]

        };

        await bot.reply(message, content);

    });

    controller.on('block_actions', async(bot, message) => {

        const userChoice = message.incoming_message.channelData.actions[0].value
        if (userChoice === "choice1") {

            const content = {
                "blocks": [{
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "What movie genre?🎥"
                        }
                    },

                    {
                        "type": "actions",
                        "elements": [{
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Comedy",
                                    "emoji": true
                                },
                                "value": "comedy"
                            },
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Action",
                                    "emoji": true
                                },
                                "value": "action"
                            },
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Drama",
                                    "emoji": true
                                },
                                "value": "drama"
                            }

                        ]
                    }
                ]

            }


            await bot.reply(message, content);


        } else if (userChoice === "choice2") {
            await bot.reply(message, "Ok, just let me know if you need my help!🤗")
        }


    })

    controller.hears(['comedy', 'action', 'drama'], 'block_actions', async(bot, message) => {


            const chosenGenre = message.incoming_message.channelData.actions[0].value

            const returnedMovies = await Movie.find({ genre: chosenGenre })

            const randomMovie = returnedMovies[Math.floor(Math.random() * returnedMovies.length)]

            const content = {
                "blocks": [{
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": `You should watch <${randomMovie.link}|${randomMovie.name}> tonight!👇`
                        }
                    },
                    {
                        "type": "section",
                        "block_id": "section567",
                        "text": {
                            "type": "mrkdwn",
                            "text": `${randomMovie.discription}`
                        },
                        "accessory": {
                            "type": "image",
                            "image_url": `${randomMovie.imgUrl}`,
                            "alt_text": "Movie image"
                        }
                    }

                ]
            }
            await bot.reply(message, content)

        }

    )


    controller.hears(['Thanks', 'Thank you', 'Danke'], 'message,direct_message', async(bot, message) => {
        await bot.say('You are welcome!☺️')

    })

    controller.hears(['Bye', 'Good bye'], 'message,direct_message', async(bot, message) => {
        await bot.say('See you soon ❤️')

    })


    controller.hears(['Day', 'Date'], 'message,direct_message', async(bot, message) => {

        var utc = await new Date().toJSON().slice(0, 10).replace(/-/g, '/');

        await bot.say(`Today is ${utc}`)
    })


}