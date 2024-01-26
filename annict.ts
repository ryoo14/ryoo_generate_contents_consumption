import { DOMParser } from "dom/deno-dom-wasm.ts"
import { Anime } from "./types.ts"

export async function getAnnict(): Promise<Anime[]> {
  // https://annict.com/@ryoo14/records?month=10&year=2023
  const url = "https://annict.com/@ryoo14/records?page=1"
  const res = await fetch(url)
  const html = await res.text()
  const doc = new DOMParser().parseFromString(html, "text/html")

  if (doc == null) {
    throw new Error("failed to fetch data from annict")
  }

  const recordList = doc.getElementsByClassName("c-record-list")[0]
  const animeList = recordList.getElementsByClassName("card mt-3 u-card-flat")
  const animeArray: Anime[] = []

  for (const anime of animeList) {
    const col = anime.getElementsByClassName("col")
    // date
    const date = col[0].getElementsByClassName("small text-muted")[0].innerText
      .split(" ")[0].replaceAll("-", "/")
    // title
    const titleElement = col[1].getElementsByClassName("text-body")[0]
    const title = titleElement.innerText
    const url = `https://annict.com${titleElement.getAttribute("href")}`
    // episode number
    const episodeInfo = col[1].getElementsByClassName("px-1")
    // if episodeInfo's length equal 0, it is overall impression of the anime.
    if (episodeInfo.length === 0) {
      continue
    }
    const episodeString = episodeInfo[0].innerText
    const episodeNum = Number(episodeString.match(/[0-9]+/))
    animeArray.push({
      date: date,
      title: title,
      episode: episodeNum,
      url: url,
    })
  }

  return animeArray
}
