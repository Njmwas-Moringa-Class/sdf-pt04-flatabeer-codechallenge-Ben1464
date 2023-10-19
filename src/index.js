document.addEventListener("DOMContentLoaded", () => {
    // Define the base URL 
    const baseUrl = "http://localhost:3000";
  
    // Function to fetch beer data and display it
    const fetchAndDisplayBeer = (beerId) => {
      fetch(`${baseUrl}/beers/${beerId}`)
        .then((response) => response.json())
        .then((beerData) => {
          // To display beer details in the main section
          const beerName = document.getElementById("beer-name");
          const beerDescription = document.getElementById("beer-description");
          const beerImage = document.getElementById("beer-image");
          const reviewList = document.getElementById("review-list");
  
          beerName.textContent = beerData.name;
          beerDescription.textContent = beerData.description;
          beerImage.src = beerData.image_url;
  
          // To Display reviews
          reviewList.innerHTML = "";
          beerData.reviews.forEach((review) => {
            const li = document.createElement("li");
            li.textContent = review;
            reviewList.appendChild(li);
          });
        });
    };
  
    // Function to fetch and display all beers in the menu
    const fetchAndDisplayBeerMenu = () => {
      const beerList = document.getElementById("beer-list");
  
      fetch(`${baseUrl}/beers`)
        .then((response) => response.json())
        .then((beers) => {
          beers.forEach((beer) => {
            const li = document.createElement("li");
            li.textContent = beer.name;
            li.addEventListener("click", () => {
              fetchAndDisplayBeer(beer.id);
            });
            beerList.appendChild(li);
          });
        });
    };
  
    // Add event listener to the review form for adding new reviews
    const reviewForm = document.getElementById("review-form");
    reviewForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const newReview = document.getElementById("review").value;
      const reviewList = document.getElementById("review-list");
      const li = document.createElement("li");
      li.textContent = newReview;
      reviewList.appendChild(li);
      document.getElementById("review").value = ""; // Clear the review input
    });
  
  
    fetchAndDisplayBeerMenu();
    fetchAndDisplayBeer(1); 
  });