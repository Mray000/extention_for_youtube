window.onload = () => {
  chrome.storage.local.get(null, (data) => {
    const container = document.getElementById("container");
    let keys = Object.keys(data);
    if (keys.length) {
      keys.forEach((chanel) => {
        const div = document.createElement("div");
        div.style.display = "flex";
        div.style.backgroundColor = "white";
        div.style.borderRadius = "5px";
        div.style.marginTop = "5px";
        div.style.paddingLeft = "3px";
        div.style.fontSize = "16px";
        div.style.fontWeight = "500";
        div.style.color = "#202020";
        div.style.padding = "4px";
        div.innerHTML = `<img style="width: 25px; height: 25px; border-radius: 100%; margin-right: 5px;" src=${data[chanel][1]} /><span style="line-height: 1.5">${chanel}: ${data[chanel][0]}</span>`;
        container.appendChild(div);
      });
    } else {
      document.body.innerText = "Start watch video!";
    }
  });
};
