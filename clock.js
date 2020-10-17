const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h2");
const dateTitle = clockContainer.querySelector("h1");

function getTime() {
  const today = new Date();
  const minutes = today.getMinutes();
  const hours = today.getHours();
  const seconds = today.getSeconds();
  const date = today.getDate();
  const month = today.getMonth();

  clockTitle.innerHTML = `${hours < 10 ? `0${hours}` : hours} : ${
    minutes < 10 ? `0${minutes}` : minutes
  } : ${seconds < 10 ? `0${seconds}` : seconds}`;

  dateTitle.innerHTML = `${month < 10 ? `0${month}` : month} / ${
    date < 10 ? `0${date}` : date
  }`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
