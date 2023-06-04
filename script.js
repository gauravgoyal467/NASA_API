const key = "v081zQKHcoBBrpK60ZO5KIZZje2tiqRTbaru2NaH";
const currentDate = new Date().toJSON().split("T")[0];
(async function getCurrentImageOfTheDay() {
  console.log(currentDate);
  const url = `https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${key}`;
  const response = await fetch(url);
  if(!response.ok){
    alert('Error fetching data from NASA API');
  }else{
  const data = await response.json();
  console.log(data);
  loadDataOnDom(data);
  let dates = localStorage.getItem("searches");
  if (dates == null) {
    let dates = [];
    localStorage.setItem("searches", JSON.stringify(dates));
  }
  addSearchToHistory();
}
})();

const firstContainer = document.getElementById("first-container");
const submit = document.getElementById("submit");
const input = document.getElementById("search-input");
const searchHistory=document.getElementById("search-history");

function loadDataOnDom(data) {
  firstContainer.innerHTML = "";
  let span = document.createElement("span");
  span.innerText = "NASA Picture of the Day";
  span.setAttribute("id", "top-disp");
  firstContainer.appendChild(span);

  let div = document.createElement("div");
  div.className = "current-image-container";
  div.setAttribute("id", "current-image-container");

  let img = document.createElement("img");
  img.src = data.url;
  div.appendChild(img);
  let spn = document.createElement("span");
  spn.innerText = data.title;
  div.appendChild(spn);
  let p = document.createElement("p");
  p.innerText = data.explanation;
  div.appendChild(p);
  firstContainer.appendChild(div);
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(input.value);
  if (input.value == "") {
    alert("please select a date");
  } else if (input.value > currentDate) {
    alert("please select past date");
  } else {
    getImageOfTheDay(input.value);
    saveSearch(input.value);
  }
});

function saveSearch(searchedDate) {
  let dates = JSON.parse(localStorage.getItem("searches"));
  if (!dates.includes(searchedDate)) {
    dates.push(searchedDate);
    localStorage.setItem("searches", JSON.stringify(dates));
  }
  addSearchToHistory();
}

async function getImageOfTheDay(date) {
  const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${key}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  loadDateDataOnDom(data);
}

function loadDateDataOnDom(data) {
  firstContainer.innerHTML = "";
  let span = document.createElement("span");
  span.innerText = `Picture on ${data.date} `;
  span.setAttribute("id", "top-disp");
  firstContainer.appendChild(span);

  let div = document.createElement("div");
  div.className = "current-image-container";
  div.setAttribute("id", "current-image-container");

  let img = document.createElement("img");
  img.src = data.url;
  div.appendChild(img);
  let spn = document.createElement("span");
  spn.innerText = data.title;
  div.appendChild(spn);
  let p = document.createElement("p");
  p.innerText = data.explanation;
  div.appendChild(p);
  firstContainer.appendChild(div);
}

function addSearchToHistory() {
    searchHistory.innerHTML="";
  let dates = JSON.parse(localStorage.getItem("searches"));
  dates.forEach((element) => {
    console.log(element);
    let li=document.createElement("li");
    li.innerText=element;
    li.addEventListener("click", function () {
        getImageOfTheDay(element);
      });
    searchHistory.appendChild(li);
  });
}
