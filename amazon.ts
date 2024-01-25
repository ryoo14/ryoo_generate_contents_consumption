import {
  Builder,
  By,
  Capabilities,
  Key,
  until,
  WebDriver,
} from "npm:selenium-webdriver";
import { Book } from "./book-meter.ts";

const capabilities: Capabilities = Capabilities.chrome();
capabilities.set("chromeOptions", {
  args: [
    "--disable-gpu",
    "--no-sandbox",
    "--window-size=1920,1080",
  ],
  w3c: false,
});

export async function search(queries: Book[]): Promise<Book[]> {
  const booksWithShortURL: Book[] = [...queries];
  const driver: WebDriver = await new Builder()
    .withCapabilities(capabilities)
    .build();
  try {
    // Login
    await driver.get(
      "https://www.amazon.co.jp/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.co.jp%2F%3Fref_%3Dnav_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=jpflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0",
    );
    let urlAfterLogin = "";
    while (urlAfterLogin !== "https://www.amazon.co.jp/?ref_=nav_signin") {
      await driver.sleep(3000);
      urlAfterLogin = await driver.getCurrentUrl();
    }

    for (const [index, query] of queries.entries()) {
      // Search
      await driver
        .wait(until.elementLocated(By.name("field-keywords")), 5000)
        .sendKeys(query.title, Key.RETURN);

      // Generate URL
      await driver
        .wait(until.elementLocated(By.linkText("テキスト")), 5000)
        .click();
      await driver.sleep(5000);

      // Copy URL
      const itemShortURL = await driver
        .findElement(By.id("amzn-ss-text-shortlink-textarea")).getAttribute(
          "value",
        );

      // Clear SearchBox
      await driver
        .wait(until.elementLocated(By.name("field-keywords")), 5000)
        .clear();

      booksWithShortURL[index].url = itemShortURL;
    }
    return booksWithShortURL;
  } catch (e) {
    console.log(e);
    return booksWithShortURL;
  } finally {
    driver && await driver.quit();
  }
}
