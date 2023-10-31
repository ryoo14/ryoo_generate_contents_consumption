import { Book, getBookmeter } from "./book-meter.ts";
import { Anime, getAnnict } from "./annict.ts";

const books: Book[] = await getBookmeter();
const animes: Anime[] = await getAnnict();

for (const book of books) {
  console.log(`Book ${book.readDate} ${book.title}`);
}

for (const anime of animes) {
  console.log(`Anime ${anime.date} ${anime.title} ${anime.episode}`);
}
