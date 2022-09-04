const mainElement = document.querySelector("main") as HTMLElement;
const stateInfo = document.querySelector(".state-info") as HTMLDivElement;
const button = document.querySelector(".more-button") as HTMLButtonElement;
const iconRefresh = document.querySelector(
  ".icon-refresh"
) as HTMLOrSVGImageElement;
const iconArrowDown = document.querySelector(
  ".icon-arrow-down"
) as HTMLOrSVGImageElement;

const toggleStateInfo = () => {
  [mainElement, stateInfo, iconArrowDown].forEach((el) =>
    el.classList.toggle("show")
  );
};

const fetchNewQuote = () => {
  iconRefresh.classList.toggle("fetch");
};

button.addEventListener("click", toggleStateInfo);
iconRefresh.addEventListener("click", fetchNewQuote);
