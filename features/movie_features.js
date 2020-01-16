const { SlackDialog } = require('botbuilder-adapter-slack');
const request = require('request');

const apiKey = '1b7effc917760a74d985147f907eea11';
const language = 'en';
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${language}-US&page=1`

let foundMovie = ''

request(url, async function(err, response, body) {
    if (err) {
        console.log('error:', error);
    } else {
        const movie = JSON.parse(body)
        foundMovie = movie.results[0].title
    }
})

module.exports = function(controller) {

    controller.hears(['Popular', 'Hot'], 'message,direct_message', async(bot, message) => {

        await bot.say(`${foundMovie} is most popular movie at the moment 🍿`)

    })

}