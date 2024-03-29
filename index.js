import fetch from "node-fetch"
import { load } from "cheerio"
import urlParser from "url"
import {macbookPro} from "./DB/Shemas/macbookpro.js"
import {macbookAir} from "./DB/Shemas/macbookair.js"
import {iphoneColl} from "./DB/Shemas/iphone.js"
import {bigDataX} from "./DB/Shemas/bigData.js"
const seenUrls = {};

function isEmpty(arr) {
  try {
    let somArray = []
    for (const key in arr) {
      if (Object.hasOwnProperty.call(arr, key)) {
        if (arr[key]) {
          somArray.push(arr[key])
        }


      }
    }
    return somArray
  } catch (error) {
    console.error("Fim ", error)
  }
}
function ChangeData(arr) {
  if (arr.length > 0) {
    let myStringArr = arr.join(" ")
    var newarr = myStringArr.split("€")

  }
  return newarr

}
function makeIterable(arr) {
  try {
    let somArray = []
    for (const key in arr) {
      if (Object.hasOwnProperty.call(arr, key)) {
        somArray.push(arr[key])

      }
    }
    return somArray
  } catch (error) {
    console.error("Fim ", error)
  }


}

function saveTodatabaseImage(shema, array) {
  try {
    for (let index = 0; index < array.length; index++) {
      if (array[index].startsWith("http") || array[index].startsWith("https")) {
        shema.findOneAndUpdate({ image: array[index] }, { image: array[index] }, {
          new: true,
          upsert: true 
        });
      }
    }

  } catch (error) {
    console.error("Done in DB ", error)
  }

}
async function  saveTodatabaseTitle(shema, array) {
  try {
    for (let index = 0; index < array.length; index++) {
      if (array[index].length > 0) {
        await shema.findOneAndUpdate({ title: array[index] }, { title: array[index] }, {
          new: true,
          upsert: true 
        })
      }
    }

  } catch (error) {
    console.error("Done in DB ", error)
  }
}
function saveTodatabasePrice(shema, array) {
  try {
    for (let index = 0; index < array.length; index++) {
      if (array[index].length > 0) {
        shema.findOneAndUpdate({ price: array[index] }, { price: array[index] }, {
          new: true,
          upsert: true 
        });
      }
    }

  } catch (error) {
    console.error("Done in DB ", error)
  }
}

const getUrl = (link, host, protocol) => {
  if (link.startsWith("https")) {
    return link;
  } else if (link.startsWith("/")) {
    return `${protocol}//${host}${link}`;
  } else {
    return `${protocol}//${host}/${link}`;
  }
};

const crawl = async ({ url, ignore }) => {
  if (seenUrls[url]) return;
  seenUrls[url] = true;
  const { host, protocol } = urlParser.parse(url);

  const response = await fetch(url);
  const html = await response.text();
  const $ = load(html);

  const links = $("a")
    .map((i, link) => link.attribs.href)
    .get();
  let myArray = []
  myArray.push($("title")
    .map((i, link) => { return link })
    .text());
  let objTitle = {}
  let arrPrice = []
  let arrImage = []
  $("img")
    .map((i, link) => arrImage.push(getUrl(link.attribs.src)))
    .get();
    
  for (let index = 0; index < myArray.length; index++) {
    const Regex = /[a-zA-Z]$/
    const myText = Regex.test(myArray[index])
    if (myText == false) { continue }
    else {
      let data = $(".has-padding-small-bottom")
      let dataTitle = $(".has-padding-small-bottom")
      let dataPrice = $(".price")


      for (let index = 0; index < data.length; index++) {
        let regex = /^\n/
        let dataVerify = regex.test(dataTitle.text())
        if (dataVerify == false) {
          objTitle.title = dataTitle.text()
        }
        if (dataPrice.text() != '' && dataPrice.text() != {}) arrPrice.push((dataPrice.text()))

      }

    }
   

  }

  links
    .filter((link) => link.includes(host) && !link.includes(ignore))
    .forEach((link) => {
      crawl({
        url: getUrl(link, host, protocol),
        ignore,
      });
    });
};

crawl({
  //url: process.env.Source_LINK,
  ignore: "/search",
});




















