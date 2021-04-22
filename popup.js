window.onload = () => {
  chrome.storage.local.get(null, (data) => {
    const container = document.getElementById("container");
    Object.keys(data).forEach((chanel) => {
      const div = document.createElement("div");
      div.style.display = "flex";
      div.style.backgroundColor = "white";
      div.style.borderRadius = "5px";
      div.style.marginTop = "5px";
      div.style.paddingLeft = "3px";
      div.style.fontSize = "17px";
      div.innerHTML = `<img style="width: 30px; height: 30px; border-radius: 100%; margin-right: 5px;" src=${data[chanel][1]} /><span style="line-height: 1.5">${chanel}: ${data[chanel][0]}</span>`;
      container.appendChild(div);
    });
  });
};
