"use strict";
const mainElement = document.querySelector("main");
const stateInfo = document.querySelector(".state-info");
const button = document.querySelector(".more-button");
const iconRefresh = document.querySelector(".icon-refresh");
const iconArrowDown = document.querySelector(".icon-arrow-down");
const toggleStateInfo = () => {
    [mainElement, stateInfo, iconArrowDown].forEach((el) => el.classList.toggle("show"));
};
const fetchNewQuote = () => {
    iconRefresh.classList.toggle("fetch");
};
button.addEventListener("click", toggleStateInfo);
iconRefresh.addEventListener("click", fetchNewQuote);
