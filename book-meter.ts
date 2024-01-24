import { DOMParser } from "dom/deno-dom-wasm.ts";
import { BookSet, search } from "./amazon.ts";

export type Book = {
  title: string;
  readDate: string;
};

export async function getBookmeter(): Promise<BookSet[]> {
  const bookArray: Book[] = [];
  const url = "https://bookmeter.com/users/1319439/books/read?page=1";
  const res = await fetch(url);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");

  if (doc == null) {
    throw new Error("failed to fetch data from bookmeter");
  }

  const bookGroups = doc.getElementsByClassName("book-list__group");

  for (const books of bookGroups) {
    for (const book of books.getElementsByClassName("group__book")) {
      const bookTitle = book.getElementsByClassName("thumbnail__cover")[0]
        .getElementsByTagName("img")[0].getAttribute("alt");
      const readDate = book.getElementsByClassName("detail__date")[0].innerText;
      bookArray.push({
        title: bookTitle || "not found??",
        readDate: readDate,
      });
    }
  }
  const searchResult: BookSet[] = await search(bookArray);
  return searchResult;
}

/* https://bookmeter.com/users/1319439/books/read
  <div class="content-with-header__content">
  <div class="books book-list book-list--grid">
  <ul class="book-list__group">
  <li class="group__book">
  <div class="book__thumbnail">
  <div class="thumbnail__cover">
  <a href="/books/21526324">
  <img alt="ヘルモード ~やり込み好きのゲーマーは廃設定の異世界で無双する~ はじまりの召喚士 (7) (アース・スターコミックス)" class="cover__image" src="https://m.media-amazon.com/images/I/51cYCqInCyL._SL500_.jpg"/>
  </a>
  <div class="cover__icon"></div>
  </div>
  <div class="thumbnail__action">
  <div data-modal="{&quot;id&quot;:&quot;js_modal_8a084196a97be4e1eec4516282e14f00&quot;}" class="js-modal-button modal-button">
  <span class="action__icon">
  <nil></nil>
  </span>
  <span class="action__text">本を登録する</span>
  </div>
  </div>
  </div>
  <div class="book__detail">
  <div class="detail__date">2023/10/15</div>
  <div class="detail__title">
  <a href="/books/21526324">ヘルモード ~やり込み好きのゲーマーは廃設定…</a>
  </div>
  <ul class="detail__authors">
  <li>
  <a href="/search?author=%E9%89%84%E7%94%B0%E7%8C%BF%E5%85%90">鉄田猿児</a>
  </li>
  </ul>
  <div class="detail__page">194</div>
  <dl class="detail__options">
  <dt class="options__title">登録</dt>
  <dd class="options__item">16</dd>
  </dl>
  </div>
  </li>
*/
