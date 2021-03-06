const sort = (data, chanel, chanel_n, revers) => {
  if (revers) {
    return data[chanel][0] - data[chanel_n][0];
  } else return data[chanel_n][0] - data[chanel][0];
};

const filter = (data, chanel, name_f = "", count_f = 1) => {
  if (name_f || count_f != 1)
    return chanel.toLowerCase().includes(name_f) && data[chanel][0] >= count_f;
  return true;
};

const remove_chanel = (e) => {
  chrome.storage.local.remove(e.target.dataset.chanel);
  render_chanels();
};

const render_chanels = (reverse, name_f, count_f) => {
  const chanels_container = document.getElementById("chanels_container");

  chanels_container.innerHTML = `<div style="width: 310px;"></div>`;
  chrome.storage.local.get(null, (data) => {
    let keys = Object.keys(data);
    if (keys.length) {
      keys
        .sort((chanel, chanel_n) => sort(data, chanel, chanel_n, reverse))
        .filter((chanel) => filter(data, chanel, name_f, count_f))
        .forEach((chanel) => {
          const chanel_element = document.createElement("div");
          chanel_element.className = "chanel_element";
          chanel_element.innerHTML = `<div class="create_element_data"><img src=${data[chanel][1]} /><span style="line-height: 1.5">${chanel}: ${data[chanel][0]}</span></div>`;
          const cross = document.createElement("div");
          cross.innerText = "x";
          cross.setAttribute("data-chanel", chanel);
          cross.style.marginRight = "5px";
          cross.style.cursor = "pointer";
          cross.addEventListener("click", remove_chanel);
          chanel_element.appendChild(cross);
          chanels_container.appendChild(chanel_element);
        });
    } else {
      const tools_container = document.getElementById("tools_container");
      tools_container.style.display = "none";
      document.body.innerText = "Start watch video!";
    }
  });
};

window.onload = () => {
  render_chanels();

  let sort_button = document.getElementById("sort");
  let name_filter = document.getElementById("name_filter");
  let count_filter = document.getElementById("count_filter");
  let range_max = document.getElementById("range_max");

  const get_reverse = () =>
    Number(document.getElementById("sort").getAttribute("reverse"));

  const get_name = () =>
    document.getElementById("name_filter").value.toLowerCase();

  const get_count = () => Number(document.getElementById("count_filter").value);

  sort_button.addEventListener("click", () => {
    render_chanels(get_reverse());
    sort_button.setAttribute("reverse", get_reverse() == 0 ? 1 : 0);
  });
  name_filter.addEventListener("keyup", () => {
    render_chanels(get_reverse(), get_name(), get_count());
  });
  count_filter.addEventListener("change", () => {
    document.getElementById("current_count").innerText = get_count();
    render_chanels(get_reverse(), get_name(), get_count());
  });

  range_max.addEventListener("keyup", (e) => {
    document
      .getElementById("count_filter")
      .setAttribute("max", Number(e.target.value));
  });
};
