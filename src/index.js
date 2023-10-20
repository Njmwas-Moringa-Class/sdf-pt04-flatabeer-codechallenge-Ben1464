// The event lister is to make sure the html is loaded first before the content is loaded
document.addEventListener("DOMContentLoaded", async () => {

  //The base url of the API
  const baseUrl = "http://localhost:3000";

  // A generalized fetch function for making API calls
  async function fetchData(endpoint) {
      const response = await fetch(`${baseUrl}${endpoint}`);
      // Parse and return the JSON response
      return await response.json();
  }

  // Function to add list items to a specified parent element
  function addListItem(parentId, textContent, clickCallback) {
      const li = document.createElement("li");
      li.textContent = textContent;

      // To attach a click callback when called
      if (clickCallback) {
          li.addEventListener("click", clickCallback);
      }

      // to append the created list item to the specified parent
      document.getElementById(parentId).appendChild(li);
  }

  //To display details of a specific beer
  function displayBeerDetails(beerData) {
      // To Set beer name, description, and image
      document.getElementById("beer-name").textContent = beerData.name;
      document.getElementById("beer-description").textContent = beerData.description;
      document.getElementById("beer-image").src = beerData.image_url;

      //  To clear and populate the reviews list for the beer
      const reviewList = document.getElementById("review-list");
      reviewList.innerHTML = "";
      beerData.reviews.forEach(review => addListItem("review-list", review));
  }

  // To display the menu of all beers
  async function displayBeerMenu() {
      // To fetch all available beers from the API
      const beers = await fetchData('/beers');

      // Toa add each beer as a list item with a click event to show its details
      beers.forEach(beer => {
          addListItem("beer-list", beer.name, async () => {
              const beerData = await fetchData(`/beers/${beer.id}`);
              displayBeerDetails(beerData);
          });
      });
  }

  // Event listener to handle the review form submission
  document.getElementById("review-form").addEventListener("submit", (event) => {
      //  To prevent the form from its default submition behavior
      event.preventDefault();

      // To get the review text, add it as a list item, then clear the input
      const newReview = document.getElementById("review").value;
      addListItem("review-list", newReview);
      document.getElementById("review").value = "";
  });

  // To initially display the beer menu and the details of the first beer
  await displayBeerMenu();
  const initialBeerData = await fetchData('/beers/1');
  displayBeerDetails(initialBeerData);
});