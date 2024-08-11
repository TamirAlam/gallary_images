const accessKey = "3BU3imgoCeR8rELWeAEo-o2UpGC6dVnqsLThFL-PUUc";

const formEl = document.querySelector('form');
const inputEl = document.getElementById("search-input");
const searchResult = document.querySelector(".search-result");
const showmoreEl = document.getElementById("show-more");

let inputData = "";
let page = 1;

async function searchImage() {
  inputData = inputEl.value;
  const url =`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
      searchResult.innerHTML = '';
    }

    results.map((result) => {
      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add("search");

      const image = document.createElement('img');
      image.src = result.urls.small;
      image.alt = result.alt_description;

      const imageLink = document.createElement('a');
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description || "No Description";

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResult.appendChild(imageWrapper); 
    });

    page++;

    if (page > 1) {
      showmoreEl.style.display = "block";
    }

  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImage();
});

showmoreEl.addEventListener("click", () => {
  searchImage();
});
