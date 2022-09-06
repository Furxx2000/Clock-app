"use strict";
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
const toggleStateInfo = () => {
    [mainElement, stateInfo, iconArrowDown].forEach((el) => el.classList.toggle("show"));
};
const fetchNewQuote = async () => {
    iconRefresh.classList.toggle("fetch");
    try {
        const url = "https://programming-quotes-api.herokuapp.com/Quotes/random";
        const res = await fetch(url);
        if (!res.ok)
            throw new Error("Problem getting new quote");
        const data = await res.json();
        const { author, en } = data;
        quoteElement.textContent = en;
        authorElement.textContent = author;
    }
    catch (e) {
        console.error(`Fetch new quote got ${e}`);
    }
    iconRefresh.classList.toggle("fetch");
};
const getIpAddress = async () => {
    try {
        const url = "https://api64.ipify.org?format=json";
        const res = await fetch(url);
        if (!res.ok)
            throw new Error("Problem getting ip address");
        const data = await res.json();
        publicIpAddress = data.ip;
    }
    catch (e) {
        console.error(`Get ip address got ${e}`);
    }
};
const getTimeInfo = async () => {
    try {
        const url = `https://worldtimeapi.org/api/ip/${publicIpAddress}`;
        const res = await fetch(url);
        if (!res.ok)
            throw new Error("Problem getting time information");
        const data = await res.json();
        const { abbreviation, day_of_week, day_of_year, timezone, week_number, datetime, } = data;
        let currentHours = new Date(datetime).getHours();
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
        if (currentHours > 12)
            currentHours -= 12;
        currentHours = currentHours.toString().padStart(2, "0");
        const localTimeHtml = `
    ${currentHours}:${currentMins}<span class="fw-300 fs-15 uppercase">${abbreviation}</span>`;
        const timeInfoHtml = `
    <div class="fs-10 uppercase title">current timezone</div>
    <div class="fs-20 fw-700 value">${timezone}</div>
    <div class="fs-10 uppercase title">day of the year</div>
    <div class="fs-20 fw-700 value">${day_of_year}</div>
    <div class="fs-10 uppercase title">day of the week</div>
    <div class="fs-20 fw-700 value">${day_of_week}</div>
    <div class="fs-10 uppercase title">week number</div>
    <div class="fs-20 fw-700 value">${week_number}</div>`;
        stateInfo.innerHTML = "";
        localTime.innerHTML = "";
        stateInfo.insertAdjacentHTML("afterbegin", timeInfoHtml);
        localTime.insertAdjacentHTML("afterbegin", localTimeHtml);
    }
    catch (e) {
        console.error(`Get time information got ${e}`);
    }
};
const getGeolocation = async () => {
    try {
        const url = `https://api.ipbase.com/v2/info?apikey=VNIDVTgYDEuG7pURjugeg3u7UzbhSpCSK7IGIDzT&ip=${publicIpAddress}`;
        const res = await fetch(url);
        if (!res.ok)
            throw new Error("Problem getting geolocation");
        const data = await res.json();
        const { city, country } = data.data.location;
        const cityName = city.name.split(" ")[0];
        const countryName = country.alpha2;
        geoLocation.textContent = `in ${cityName}, ${countryName}`;
    }
    catch (e) {
        console.error(`Get geo location got ${e}`);
    }
};
const init = async () => {
    await getIpAddress();
    await getTimeInfo();
    await getGeolocation();
};
init();
button.addEventListener("click", toggleStateInfo);
iconRefresh.addEventListener("click", fetchNewQuote);
