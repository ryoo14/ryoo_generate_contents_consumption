import { httpFetch } from "./utils.ts"
import { amazonItemSearch } from "./amazon.ts"
import { Book } from "./types.ts"

export async function getBookmeter(): Promise<Book[]> {
  const bookArray: Book[] = []
  const url = "https://bookmeter.com/users/1319439/books/read?page=1"
  const doc = await httpFetch(url)

  if (doc == null) {
    throw new Error("failed to fetch data from bookmeter")
  }

  const bookGroups = doc.getElementsByClassName("book-list__group")

  for (const books of bookGroups) {
    for (const book of books.getElementsByClassName("group__book")) {
      const bookTitle = book.getElementsByClassName("thumbnail__cover")[0]
        .getElementsByTagName("img")[0].getAttribute("alt")
      const readDate = book.getElementsByClassName("detail__date")[0].innerText
      bookArray.push({
        title: bookTitle || "not found??",
        readDate: readDate,
        url: "",
      })
    }
  }
  const searchResult: Book[] = await amazonItemSearch(bookArray)
  return searchResult
}
