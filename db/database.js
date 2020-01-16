const mongoose = require('mongoose')

/// conntect with database
async function main() {
    await mongoose.connect(
        'mongodb://localhost/testBot', { useUnifiedTopology: true, useNewUrlParser: true })
    console.log('Successfully connected to database!')
}

main()

/// model movie schema
const movieSchema = {
    name: String,
    genre: String,
    link: String,
    imgUrl: String,
    discription: String
};

const Movie = mongoose.model("movie", movieSchema);

/// creat 7 movies 
const defaultMovies = [
    new Movie({
        name: "The Intern",
        genre: "comedy",
        link: "https://www.imdb.com/title/tt2361509/",
        imgUrl: "http://www.gstatic.com/tv/thumb/v22vodart/11550244/p11550244_v_v8_ac.jpg",
        discription: "Ben Whittaker, a seventy-year-old widower, realises that he is not cut out for retirement. He then applies to become a senior intern for a sceptical boss at an online fashion site."

    }),

    new Movie({
        name: "I Am Not an Easy Man",
        genre: "comedy",
        link: "https://www.imdb.com/title/tt6857988/",
        imgUrl: "https://upload.wikimedia.org/wikipedia/en/c/c4/I_Am_Not_an_Easy_Man.png",
        discription: "Damien, an unmarried Don Juan, finds himself propelled into a matriarchal society where he falls in love with Alexandra. To make the relationship work, Damien tries to decipher the inverted codes of this new world."
    }),

    new Movie({
        name: "Infinity Wars",
        genre: "action",
        link: "https://www.imdb.com/title/tt4154756/",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmE2vwxy5KaCu7cRuYYdgNdQKddux5OYgGwsPo0kqP_xzLnsDV",
        discription: "The Avengers must stop Thanos, an intergalactic warlord, from getting his hands on all the infinity stones. However, Thanos is prepared to go to any lengths to carry out his insane plan."
    }),

    new Movie({
        name: "Gone Girl",
        genre: "drama",
        link: "https://www.imdb.com/title/tt2267998/",
        imgUrl: "http://www.gstatic.com/tv/thumb/v22vodart/10556843/p10556843_v_v8_ab.jpg",
        discription: "Nick Dunne discovers that the entire media focus has shifted on him when his wife Amy Dunne disappears on the day of their fifth wedding anniversary."
    }),

    new Movie({
        name: "A Star Is Born",
        genre: "drama",
        link: "https://www.imdb.com/title/tt1517451/",
        imgUrl: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSLwbpCId0a7cQzED6ghMIc4PUHqv03gqcphilPJY7z4wfCw8Sg",
        discription: "After falling in love with struggling artist Ally, Jackson, a musician, coaxes her to follow her dreams, while he battles with alcoholism and his personal demons."
    }),

    new Movie({
        name: "Parasite",
        genre: "drama",
        link: "https://www.imdb.com/title/tt6751668/",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLgFST-pqPgU9CcWUDE4xqqgSxB1n7dulszo08FjRyXyCxV8TH",
        discription: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan."
    }),

    new Movie({
        name: "Die Hard",
        genre: "action",
        link: "https://www.imdb.com/title/tt0095016/",
        imgUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRagI3FRZIH6bs2V3gw3hCWorUfc-JvImrRQXSYQy_ZF-o2a_PK",
        discription: "Just as Detective McClane lands in LA to spend Christmas with his wife, he learns about a hostage situation in an office building. Hans Gruber is the culprit and McClane's wife is one of the hostages."
    })
]

/// insert default movies into database

Movie.find({}, async function(err, foundMovies) {
    if (foundMovies < 7) {

        await Movie.insertMany(defaultMovies, function(error, docs) {
            if (error) {
                console.log(error);
            } else {
                console.log("Default movies are inserted to database.")
            }
        })
    } else if (err) {
        console.log(err)
    } else {
        console.log("Default movies are set.")
    }
})


module.exports = Movie