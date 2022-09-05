"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mainElement = document.querySelector("main");
const stateInfo = document.querySelector(".state-info");
const button = document.querySelector(".more-button");
const iconRefresh = document.querySelector(".icon-refresh");
const iconArrowDown = document.querySelector(".icon-arrow-down");
const quoteElement = document.querySelector(".quote q");
const authorElement = document.querySelector(".quote h1");
const localTime = document.querySelector(".locale-time span");
const stateInfoValue = stateInfo.querySelectorAll(".value");
let publicIpAddress;
const toggleStateInfo = () => {
    [mainElement, stateInfo, iconArrowDown].forEach((el) => el.classList.toggle("show"));
};
const fetchNewQuote = () => __awaiter(void 0, void 0, void 0, function* () {
    iconRefresh.classList.toggle("fetch");
    try {
        const url = "https://programming-quotes-api.herokuapp.com/Quotes/random";
        const res = yield fetch(url);
        if (!res.ok)
            throw new Error("Problem getting new quote");
        const data = yield res.json();
        const { author, en } = data;
        quoteElement.textContent = en;
        authorElement.textContent = author;
    }
    catch (e) {
        console.error(`Fetch new quote got ${e}`);
    }
    iconRefresh.classList.toggle("fetch");
});
const getIpAddress = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = "https://api64.ipify.org?format=json";
        const res = yield fetch(url);
        const data = yield res.json();
        publicIpAddress = data.ip;
    }
    catch (e) {
        console.error(`Get ip address got ${e}`);
    }
});
const getTimeInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url2 = `http://worldtimeapi.org/api/ip/${publicIpAddress}`;
        const res2 = yield fetch(url2);
        const data2 = yield res2.json();
        const { abbreviation, day_of_week, day_of_year, timezone, week_number, datetime, } = data2;
        const arrayOfValue = [timezone, day_of_year, day_of_week, week_number];
        localTime.textContent = abbreviation;
        stateInfoValue.forEach((value, index) => {
            value.textContent = arrayOfValue[index];
        });
    }
    catch (e) {
        console.error(`Get time information got ${e}`);
    }
});
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    yield getIpAddress();
    yield getTimeInfo();
});
init();
// window.addEventListener("load", async () => {
// });
button.addEventListener("click", toggleStateInfo);
iconRefresh.addEventListener("click", fetchNewQuote);
