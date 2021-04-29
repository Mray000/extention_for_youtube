//получение имени и аватарки канала
const get_chanel_info = async (new_href) => {
  //делаем запрос с урлом из href и вырезаем строку из <script></script> с данными
  let data = await fetch(new_href)
    .then((data) => data.text())
    .then((body) =>
      JSON.parse(
        body.substring(
          body.indexOf("var ytInitialData") + 19,
          body.indexOf("</script>", body.indexOf("var ytInitialData")) - 1
        )
      )
    );
  //берем данные из полученного парсом объекта
  let obj =
    data.contents.twoColumnWatchNextResults.results.results.contents[1]
      .videoSecondaryInfoRenderer.owner.videoOwnerRenderer;
  let name = obj.title.runs[0].text;
  let img = obj.thumbnail.thumbnails[1].url;
  return [name, img];
};

let last_href = null;

setInterval(async () => {
  let new_href = window.location.href;
  //сравниваем два href, и если они зменились, то сетаем в локалку данные;
  if (last_href != new_href && new_href.includes("watch")) {
    last_href = new_href;
    let [chanel, img] = await get_chanel_info(new_href);
    chrome.storage.local.get([chanel], (data) => {
      chrome.storage.local.set({
        [chanel]: data[chanel]
          ? [data[chanel][0] + 1, data[chanel][1]]
          : [1, img],
      });
    });
  }
}, 4000);
