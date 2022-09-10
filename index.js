import { QUOTE_URL, IP_ADDRESS_URL, WORLD_TIME_API_URL } from "./config.js";
import { AJAX, setMainElementHeight, renderLocalTimeTemplate, renderStateInfoTemplate, renderGeoLocationTemplate, renderMoonIconTemplate, } from "./helper.js";
const mainElement = document.querySelector("main");
const stateInfo = document.querySelector(".state-info");
const button = document.querySelector(".more-button");
const iconRefresh = document.querySelector(".icon-refresh");
const iconArrowDown = document.querySelector(".icon-arrow-down");
const quoteElement = document.querySelector(".quote q");
const authorElement = document.querySelector(".quote h1");
const localTime = document.querySelector(".locale-time");
const geoLocation = document.querySelector(".geolocation");
const greeting = document.querySelector(".greeting");
const greetingIcon = document.querySelector(".icon");
const body = document.querySelector("body");
let publicIpAddress;
const checkViewHeight = () => {
    setMainElementHeight(mainElement);
    window.addEventListener("resize", () => {
        setMainElementHeight(mainElement);
    });
};
// Press more button and toggle all the elements
const toggleStateInfo = () => {
    [mainElement, stateInfo, iconArrowDown].forEach((el) => el.classList.toggle("show"));
    const buttonText = button.querySelector("p");
    buttonText.textContent = buttonText.textContent === "more" ? "less" : "more";
};
const fetchNewQuote = async () => {
    iconRefresh.classList.toggle("fetch");
    try {
        const data = await AJAX(QUOTE_URL);
        const { author, en } = data;
        quoteElement.textContent = en;
        authorElement.textContent = author;
        iconRefresh.classList.toggle("fetch");
    }
    catch (e) {
        throw e;
    }
};
const getIpAddress = async () => {
    try {
        const data = await AJAX(IP_ADDRESS_URL);
        const { ip } = data;
        publicIpAddress = ip;
    }
    catch (e) {
        throw e;
    }
};
const getTimeInfo = async () => {
    try {
        const data = await AJAX(`${WORLD_TIME_API_URL}${publicIpAddress}`);
        const { abbreviation, day_of_week, day_of_year, timezone, week_number, datetime, } = data;
        let currentHours = new Date(datetime).getHours();
        const currentMins = new Date(datetime)
            .getMinutes()
            .toString()
            .padStart(2, "0");
        const cityName = timezone.split("/")[1];
        // Check time of the day
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
            // Render moon icon
            renderMoonIconTemplate(greetingIcon);
            body.classList.add("night-time");
            stateInfo.classList.add("night-time");
        }
        // Turn hours type to string
        currentHours = currentHours.toString().padStart(2, "0");
        // Render Local time
        renderLocalTimeTemplate(localTime, currentHours, currentMins, abbreviation);
        // Render expand information
        renderStateInfoTemplate(stateInfo, timezone, day_of_year, day_of_week, week_number);
        // Render geolocation text
        renderGeoLocationTemplate(geoLocation, cityName);
    }
    catch (e) {
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
