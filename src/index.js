document.addEventListener("DOMContentLoaded", async () => {
  const baseUrl = "http://localhost:3000";

  async function fetchBeerById(beerId) {
      const response = await fetch(`${baseUrl}/beers/${beerId}`);
      return await response.json();
  }

  async function fetchAllBeers() {
      const response = await fetch(`${baseUrl}/beers`);
      return await response.json();
  }

  function displayBeerDetails(beerData) {
      document.getElementById("beer-name").textContent = beerData.name;
      document.getElementById("beer-description").textContent = beerData.description;
      document.getElementById("beer-image").src = beerData.image_url;

      const reviewList = document.getElementById("review-list");
      reviewList.innerHTML = "";

      beerData.reviews.forEach(review => {
          const li = document.createElement("li");
          li.textContent = review;
          reviewList.appendChild(li);
      });
  }

  async function displayBeerMenu() {
      const beers = await fetchAllBeers();
      const beerList = document.getElementById("beer-list");

      beers.forEach(beer => {
          const li = document.createElement("li");
          li.textContent = beer.name;
          li.addEventListener("click", async () => {
              const beerData = await fetchBeerById(beer.id);
              displayBeerDetails(beerData);
          });
          beerList.appendChild(li);
      });
  }

  document.getElementById("review-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const newReview = document.getElementById("review").value;
      const li = document.createElement("li");
      li.textContent = newReview;

      document.getElementById("review-list").appendChild(li);
      document.getElementById("review").value = "";
  });

  await displayBeerMenu();
  const initialBeerData = await fetchBeerById(1);
  displayBeerDetails(initialBeerData);
});