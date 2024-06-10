const Actor = require("./Actor");
const Movie = require("./Movie");
const Director = require("./Director");
const Genre = require("./Genre");

Movie.belongsToMany(Actor, { through: "movieActor" });
Movie.belongsToMany(Director, { through: "movieDirector" });
Movie.belongsToMany(Genre, { through: "movieGenre" });
