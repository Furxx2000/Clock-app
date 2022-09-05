const mainElement = document.querySelector("main") as HTMLElement;
const stateInfo = document.querySelector(".state-info") as HTMLDivElement;
const button = document.querySelector(".more-button") as HTMLButtonElement;
const iconRefresh = document.querySelector(
  ".icon-refresh"
) as HTMLOrSVGImageElement;
const iconArrowDown = document.querySelector(
  ".icon-arrow-down"
) as HTMLOrSVGImageElement;
const quoteElement = document.querySelector(".quote q") as HTMLQuoteElement;
const authorElement = document.querySelector(".quote h1") as HTMLHeadingElement;
const localTime = document.querySelector(
  ".locale-time span"
) as HTMLSpanElement;
const stateInfoValue = stateInfo.querySelectorAll(".value") as NodeList;
let publicIpAddress: string;

const toggleStateInfo = () => {
  [mainElement, stateInfo, iconArrowDown].forEach((el) =>
    el.classList.toggle("show")
  );
};

const fetchNewQuote = async () => {
  iconRefresh.classList.toggle("fetch");

  try {
    const url = "https://programming-quotes-api.herokuapp.com/Quotes/random";
    const res = await fetch(url);

    if (!res.ok) throw new Error("Problem getting new quote");

    const data = await res.json();
    const { author, en } = data;

    quoteElement.textContent = en;
    authorElement.textContent = author;
  } catch (e) {
    console.error(`Fetch new quote got ${e}`);
  }

  iconRefresh.classList.toggle("fetch");
};

const getIpAddress = async () => {
  try {
    const url = "https://api64.ipify.org?format=json";
    const res = await fetch(url);
    const data = await res.json();
    publicIpAddress = data.ip;
  } catch (e) {
    console.error(`Get ip address got ${e}`);
  }
};

const getTimeInfo = async () => {
  try {
    const url2 = `https://worldtimeapi.org/api/ip/${publicIpAddress}`;
    const res2 = await fetch(url2);
    const data2 = await res2.json();
    const {
      abbreviation,
      day_of_week,
      day_of_year,
      timezone,
      week_number,
      datetime,
    } = data2;
    const arrayOfValue = [timezone, day_of_year, day_of_week, week_number];

    localTime.textContent = abbreviation;
    stateInfoValue.forEach((value, index) => {
      value.textContent = arrayOfValue[index];
    });
  } catch (e) {
    console.error(`Get time information got ${e}`);
  }
};

const init = async () => {
  await getIpAddress();
  await getTimeInfo();
};

init();

button.addEventListener("click", toggleStateInfo);
iconRefresh.addEventListener("click", fetchNewQuote);
