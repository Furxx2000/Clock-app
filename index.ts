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
const localTime = document.querySelector(".locale-time") as HTMLSpanElement;
const geoLocation = document.querySelector(
  ".geolocation"
) as HTMLParagraphElement;
const greeting = document.querySelector(".greeting") as HTMLSpanElement;
const greetingIcon = document.querySelector(".icon") as HTMLDivElement;
const body = document.querySelector("body") as HTMLBodyElement;
let publicIpAddress: string;

const setMainElementHeight = () => {
  let windowsVH = window.innerHeight / 100;
  mainElement.style.setProperty("--vh", `${windowsVH}px`);
};

const checkViewHeight = () => {
  setMainElementHeight();

  window.addEventListener("resize", () => {
    setMainElementHeight();
  });
};

const toggleStateInfo = () => {
  [mainElement, stateInfo, iconArrowDown].forEach((el) =>
    el.classList.toggle("show")
  );
  const buttonText = button.querySelector("p") as HTMLParagraphElement;
  buttonText.textContent = buttonText.textContent === "more" ? "less" : "more";
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
    throw e;
  }

  iconRefresh.classList.toggle("fetch");
};

const getIpAddress = async () => {
  try {
    const url = "https://api64.ipify.org?format=json";
    const res = await fetch(url);

    if (!res.ok) throw new Error("Problem getting ip address");

    const data = await res.json();
    publicIpAddress = data.ip;
  } catch (e) {
    console.error(`Get ip address got ${e}`);
    throw e;
  }
};

const getTimeInfo = async () => {
  try {
    const url = `https://worldtimeapi.org/api/ip/${publicIpAddress}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error("Problem getting time information");

    const data = await res.json();
    const {
      abbreviation,
      day_of_week,
      day_of_year,
      timezone,
      week_number,
      datetime,
    } = data;
    let currentHours: number | string = new Date(datetime).getHours();
    const currentMins = new Date(datetime)
      .getMinutes()
      .toString()
      .padStart(2, "0");

    if (currentHours >= 5 && currentHours < 12) {
      greeting.textContent = "Good morning";
      body.classList.add("day-time");
    }
    if (currentHours >= 12 && currentHours < 18) {
      greeting.textContent = "Good afternoon";
      body.classList.add("day-time");
    }
    if (currentHours >= 18 || currentHours < 5) {
      greeting.textContent = "Good evening";
      const greetingIconHTML = `<use xlink:href="./symbol-defs.svg#icon-moon"></use>`;
      greetingIcon.innerHTML = "";
      greetingIcon.insertAdjacentHTML("afterbegin", greetingIconHTML);

      body.classList.add("night-time");
      stateInfo.classList.add("night-time");
    }

    currentHours = currentHours.toString().padStart(2, "0");

    const localTimeHtml = `
    ${currentHours}:${currentMins}<span class="fw-300 fs-15 uppercase">${abbreviation}</span>`;

    const timeInfoHtml = `
    <div class="flex">
      <span class="fs-10 uppercase title">current timezone</span>
      <span class="fs-20 fw-700 value">${timezone}</span>
    </div>
    <div class="flex">
      <span class="fs-10 uppercase title">day of the year</span>
      <span class="fs-20 fw-700 value">${day_of_year}</span>
    </div>
    <div class="flex divider"></div>
    <div class="flex">
      <span class="fs-10 uppercase title">day of the week</span>
      <span class="fs-20 fw-700 value">${day_of_week}</span>
    </div>
    <div class="flex">
      <span class="fs-10 uppercase title">week number</span>
      <span class="fs-20 fw-700 value">${week_number}</span>
    </div>`;

    stateInfo.innerHTML = "";
    localTime.innerHTML = "";
    stateInfo.insertAdjacentHTML("afterbegin", timeInfoHtml);
    localTime.insertAdjacentHTML("afterbegin", localTimeHtml);

    const cityName = timezone.split("/")[1];
    geoLocation.textContent = `in ${cityName}, TW`;
  } catch (e) {
    console.error(`Get time information got ${e}`);
    throw e;
  }
};

// const getGeolocation = async () => {
//   try {
//     const url = `https://api.ipbase.com/v2/info?apikey=VNIDVTgYDEuG7pURjugeg3u7UzbhSpCSK7IGIDzT&ip=${publicIpAddress}`;
//     const res = await fetch(url);

//     if (!res.ok) throw new Error("Problem getting geolocation");

//     const data = await res.json();
//     const { city, country } = data.data.location;
//     const cityName = city.name.split(" ")[0];
//     const countryName = country.alpha2;

//     geoLocation.textContent = `in ${cityName}, ${countryName}`;
//   } catch (e) {
//     console.error(`Get geo location got ${e}`);
//     throw e;
//   }
// };

const init = async () => {
  checkViewHeight();
  await getIpAddress();
  await getTimeInfo();
  // await getGeolocation();
  button.addEventListener("click", toggleStateInfo);
  iconRefresh.addEventListener("click", fetchNewQuote);
};

init();
