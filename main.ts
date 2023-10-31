import { Book, getBookmeter } from "./book-meter.ts";
import { Anime, getAnnict } from "./annict.ts";

const books: Book[] = await getBookmeter();
const _animes: Anime[] = await getAnnict();

for (const book of books) {
  console.log(`${book.readDate}:${book.title}`);
}
