import { DOMParser } from "deno-dom"

export async function httpFetch(url: string) {
  try {
    const denoBuild = Deno.build
    const denoVersion = Deno.version
    const req = new Request(url, {
      headers: {
        "user-agent": `RGCC/0.0.1 (Deno/${denoVersion.deno}; ${denoBuild.arch}; ${denoBuild.os})`,
      },
    })
    const res = await fetch(req)
    const html = await res.text()
    const doc = new DOMParser().parseFromString(html, "text/html")

    if (doc == null) {
      throw new Error(`Failed to fetch data from ${url}`)
    }

    return doc
  } catch (e) {
    console.log(e)
  }
}
