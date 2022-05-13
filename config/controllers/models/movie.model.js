module.exports = (mongoose) => {
    const Movies = mongoose.model(
      "Movies",
      mongoose.Schema({
        movieid: Number,
        title: String,
        published: Boolean,
        released: Boolean,
        poster_url: String,
        release_date: String,
        publish_date: String,
        artists: [
          {
            artistid: Number,
            first_name: String,
            last_name: String,
            wiki_url: String,
            profile_url: String,
            movies: [{ type: String }],
          },
        ],
      })
    );
    return Movies;
  };