Introduction

This script provides functionality for displaying beer information and reviews from an API. When the document content has been fully loaded, the script initializes by setting the API base URL, and then fetches and displays a menu of beers and the details of a default beer (with ID 1).

Features

Display Document Readiness: As soon as the document is fully loaded, a console log indicates its readiness.
Fetch and Display Specific Beer: A function fetches details of a specific beer using its ID from the API and displays its name, description, image, and associated reviews.
Fetch and Display Beer Menu: Another function fetches a list of all beers and displays them as clickable menu items. Clicking a beer name fetches and displays its details.
Submit a Review: Users can add a review for a beer using a form. On form submission, the review gets displayed in the review list without making an API call.

Code Overview

Variables
baseUrl: The base URL for the API.
Functions
fetchAndDisplayBeer(beerId): Fetches a beer's details using the provided ID and then displays its name, description, image, and associated reviews.

fetchAndDisplayBeerMenu(): Fetches a list of beers from the API and displays them. When a beer name is clicked, its details are fetched and displayed.

Event Listeners


DOMContentLoaded: Ensures the script runs after the entire document content has loaded.
Click Event on Beer Names: When a beer name from the menu is clicked, it fetches and displays that beer's details.
Submit Event on Review Form: On submitting a review via the review form, the review gets added to the review list.
Requirements


This script expects specific HTML elements to be present in the document:
Elements with IDs: beer-name, beer-description, beer-image, review-list, beer-list, and review-form.
The backend server (API) is expected to be running at http://localhost:3000 with endpoints:
/beers: Returns a list of all beers.
/beers/{beerId}: Returns details of a specific beer by ID.
Setup
Ensure your backend server is running at the specified baseUrl.
Integrate this script into your HTML document.
Ensure that the required HTML elements (as mentioned in 'Requirements') are present in your document.
Serve your HTML document and you should see the beer menu and default beer details on load.
