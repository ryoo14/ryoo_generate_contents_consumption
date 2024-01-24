import { getBookmeter } from "./book-meter.ts";
import { Anime, getAnnict } from "./annict.ts";
import { getFilmark, Movie } from "./filmark.ts";
import { BookSet } from "./amazon.ts";

const books: BookSet[] = await getBookmeter();
const animes: Anime[] = await getAnnict();
const movies: Movie[] = await getFilmark();

for (const book of books) {
  console.log(`Book ${book.book.readDate} ${book.book.title} ${book.shortURL}`);
}

for (const anime of animes) {
  console.log(
    `Anime ${anime.date} ${anime.title} ${anime.episode} ${anime.url}`,
  );
}

for (const movie of movies) {
  console.log(`Movie ${movie.title} ${movie.url}`);
}
