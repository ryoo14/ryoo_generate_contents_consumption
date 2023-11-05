import { Book, getBookmeter } from "./book-meter.ts";
import { Anime, getAnnict } from "./annict.ts";
import { Movie, getFilmark } from "./filmark.ts";

const books: Book[] = await getBookmeter();
const animes: Anime[] = await getAnnict();
const movies: Movie[] = await getFilmark();

for (const book of books) {
  console.log(`Book ${book.readDate} ${book.title}`);
}

for (const anime of animes) {
  console.log(`Anime ${anime.date} ${anime.title} ${anime.episode} ${anime.url}`);
}

for (const movie of movies) {
  console.log(`Movie ${movie.title} ${movie.url}`);
}
