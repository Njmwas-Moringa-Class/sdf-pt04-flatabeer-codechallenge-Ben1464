//The event listener is to execute once the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", async () => {
    //Base url of the API
  const baseUrl = "http://localhost:3000";
//Fuction to fetch a beer data using its Id
  async function fetchBeerById(beerId) {
      const response = await fetch(`${baseUrl}/beers/${beerId}`);
      return await response.json();
  }
//Fuction to fetch all beers data using its Id
  async function fetchAllBeers() {
      const response = await fetch(`${baseUrl}/beers`);
      return await response.json();
  }
//Fuction to display the details of a beer 
  function displayBeerDetails(beerData) {
      document.getElementById("beer-name").textContent = beerData.name;
      document.getElementById("beer-description").textContent = beerData.description;
      document.getElementById("beer-image").src = beerData.image_url;
// To clear and populate the reviews for the beers
      const reviewList = document.getElementById("review-list");
      reviewList.innerHTML = "";

      beerData.reviews.forEach(review => {
          const li = document.createElement("li");
          li.textContent = review;
          reviewList.appendChild(li);
      });
  }
//Fuction to list all beers 
  async function displayBeerMenu() {
    // Fetch all beers and diplay them in the beer list
      const beers = await fetchAllBeers();
      const beerList = document.getElementById("beer-list");

      beers.forEach(beer => {
          const li = document.createElement("li");
          li.textContent = beer.name;
          // Attached a click event listener to each beer to display its details when clicked
          li.addEventListener("click", async () => {
              const beerData = await fetchBeerById(beer.id);
              displayBeerDetails(beerData);
          });
          beerList.appendChild(li);
      });
  }
// Attached an event listener to the review form to handle its submission
  document.getElementById("review-form").addEventListener("submit", (event) => {
    //// To prevent the form from  submitting prematurely
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