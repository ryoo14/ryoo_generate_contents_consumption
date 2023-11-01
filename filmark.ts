import { DOMParser } from "dom/deno-dom-wasm.ts";

export type Movie = {
  title: string;
};

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

  for (const movie of contentCards) {
    const title = movie.getElementsByClassName("c-content-card__title")[0].getElementsByTagName("a")[0].innerText;
    movieArray.push({
      title: title,
    });
  }

  return movieArray;
}
