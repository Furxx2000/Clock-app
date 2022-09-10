// Helper function for fetching data
export const AJAX = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(`${data.message} ${res.status}`);
  return data;
};

// Helper function to calculate height of the container
export const setMainElementHeight = (element: HTMLElement) => {
  let windowsVH = window.innerHeight / 100;
  element.style.setProperty("--vh", `${windowsVH}px`);
};

export const renderLocalTimeTemplate = (
  element: HTMLElement,
  hr: string,
  min: string,
  timeZone: string
) => {
  const html = `
    ${hr}:${min}<span class="fw-300 fs-15 uppercase">${timeZone}</span>`;
  element.innerHTML = "";
  element.insertAdjacentHTML("afterbegin", html);
};

export const renderStateInfoTemplate = (
  element: HTMLElement,
  timeZone: string,
  dayOfTheYear: string,
  dayOfTheWeek: string,
  weekNumber: string
) => {
  const html = `
    <div class="flex">
      <span class="fs-10 uppercase title">current timezone</span>
      <span class="fs-20 fw-700 value">${timeZone}</span>
    </div>
    <div class="flex">
      <span class="fs-10 uppercase title">day of the year</span>
      <span class="fs-20 fw-700 value">${dayOfTheYear}</span>
    </div>
    <div class="flex divider"></div>
    <div class="flex">
      <span class="fs-10 uppercase title">day of the week</span>
      <span class="fs-20 fw-700 value">${dayOfTheWeek}</span>
    </div>
    <div class="flex">
      <span class="fs-10 uppercase title">week number</span>
      <span class="fs-20 fw-700 value">${weekNumber}</span>
    </div>`;
  element.innerHTML = "";
  element.insertAdjacentHTML("afterbegin", html);
};

export const renderGeoLocationTemplate = (
  element: HTMLElement,
  cityName: string
) => {
  const text = `in ${cityName}, TW`;
  element.textContent = text;
};

export const renderMoonIconTemplate = (element: HTMLElement) => {
  const html = `<use xlink:href="./symbol-defs.svg#icon-moon"></use>`;
  element.innerHTML = "";
  element.insertAdjacentHTML("afterbegin", html);
};
