import { getBookmeter } from "./book-meter.ts"
import { getAnnict } from "./annict.ts"
import { getFilmark } from "./filmark.ts"
import { Anime, Book, Movie } from "./types.ts"

const books: Book[] = await getBookmeter()
const animes: Anime[] = await getAnnict()
const movies: Movie[] = await getFilmark()

for (const book of books) {
  console.log(`Book ${book.readDate} ${book.title} ${book.url}`)
}

for (const anime of animes) {
  console.log(
    `Anime ${anime.date} ${anime.title} ${anime.episode} ${anime.url}`,
  )
}

for (const movie of movies) {
  console.log(`Movie ${movie.title} ${movie.url}`)
}
