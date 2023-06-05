const { firefox } = require("playwright");
var fs = require("fs");
const commonModel = require("./models/common.model");
const db = require("./models");
const moment = require("moment");
const tmService = require("./services/tm.service");
(async () => {
  const browser = await firefox.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Get date between dates Start

  // Handle XHR response
  // return;
  const saveResponse = async (dbname, collectionName, data) => {
    tmService.add(dbname, collectionName, data);
  };

  const handleResponse = async (response) => {
    let responseUrl = response.url();
    let url = await page.url();

    let currentDate = moment().format("MMDDYYYY");
    if (responseUrl.includes("/facets?resaleChannelId")) {
      let responseJson = await response.json();
      console.log(
        "responseJson.facetsresponseJson.facets",
        responseJson.facets
      );
      await saveResponse("niallHoran", `venue_${currentDate}`, {
        data: responseJson.facets,
      });
    }
  };

  // End Handle XHR response
  // Handle sleep
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  page.on("response", handleResponse);

  await page.goto(
    "https://www.ticketmaster.com/event/0D005EB79421B0D2?irgwc=1&clickid=X0cyfEzCfxyNTpPzoKRIEQ4NUkASPYy2KRYsW40&camefrom=CFC_BUYAT_219208&impradid=219208&REFERRAL_ID=tmfeedbuyat219208&wt.mc_id=aff_BUYAT_219208&utm_source=219208-Bandsintown&impradname=Bandsintown&utm_medium=affiliate&ircid=4272",
    {
      waitUntil: "networkidle",
    }
  );
  await sleep(50000);

  browser.close();

  // ---------------------
  await context.close();
})();
