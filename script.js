const inputHtml = document.querySelector("#input-html");
const inputCss = document.querySelector("#input-css");
const langSelect = document.querySelector("#langSelect");

let htmlParam = "";
let cssParam = "";

function start() {
  const urlParams = new URLSearchParams(window.location.search);

  htmlParam = urlParams.get("html");
  cssParam = urlParams.get("css");
  const lang = urlParams.get("lang");

  if (htmlParam) {
    inputHtml.value = htmlParam;
  }

  if (cssParam) {
    inputCss.value = cssParam;
  }

  if (lang == "html" || lang == "css") {
    langSelect.value = lang;
  }

  selectLang();
  update();

  output.removeAttribute("hidden");

  enableTab("#input-html");
  enableTab("#input-css");
}

function update() {
  output.contentDocument.open();
  output.contentDocument.write(`<style>${inputCss.value}</style>`);
  output.contentDocument.write(inputHtml.value);
  output.contentDocument.close();
}

function selectLang() {
  value = langSelect.value;

  switch (value) {
    case "html":
      inputHtml.removeAttribute("hidden");
      inputCss.setAttribute("hidden", "true");
      break;

    case "css":
      inputCss.removeAttribute("hidden");
      inputHtml.setAttribute("hidden", "true");
      break;

    default:
      break;
  }
}

function enableTab(query) {
  const el = document.querySelector(query);
  el.onkeydown = function (e) {
    if (e.keyCode === 9) {
      const val = this.value;
      const start = this.selectionStart;
      const end = this.selectionEnd;

      this.value = val.substring(0, start) + "\t" + val.substring(end);
      this.selectionStart = this.selectionEnd = start + 1;

      return false;
    }
  };
}

function onClickReset() {
  lang = langSelect.value;

  switch (lang) {
    case "html":
      inputHtml.value = htmlParam;
      break;

    case "css":
      inputCss.value = cssParam;
      break;

    default:
      break;
  }

  update();
}
