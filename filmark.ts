import { DOMParser } from "dom/deno-dom-wasm.ts";
import { Movie } from "./types.ts";

export async function getFilmark(): Promise<Movie[]> {
  const url = "https://filmarks.com/users/ryoana14";
  const res = await fetch(url);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");

  if (doc == null) {
    throw new Error("failed to fetch data from filmark");
  }

  const contentCards = doc.getElementsByClassName("c-content-card");
  const movieArray: Movie[] = [];

  let count = 1;
  for (const movie of contentCards) {
    const titleElement =
      movie.getElementsByClassName("c-content-card__title")[0]
        .getElementsByTagName("a")[0];
    const title = titleElement.innerText;
    const url = `https://filmarks.com${
      titleElement.getAttribute("href").split("?")[0]
    }`;
    movieArray.push({
      title: title,
      url: url,
    });
    count += 1;
    if (count === 5) {
      break;
    }
  }

  return movieArray;
}
