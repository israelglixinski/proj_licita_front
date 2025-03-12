const sidebar       = document.querySelector('.sidebar')    ;   // Selects the sidebar element using its class name
const menuToggle    = document.querySelector('.menu-toggle');   // Selects the menu toggle element using its class name
const content       = document.getElementById('content')    ;   // Selects the content element by its ID

menuToggle.addEventListener('click', () => {                    // Adds a click event listener to the menu toggle button
    sidebar.classList.toggle('hidden');                         // Toggles the 'hidden' class on the sidebar element
    if (sidebar.classList.contains('hidden')) {                 // Adjusts the margin of the content based on the sidebar's visibility
        content.style.marginLeft = '20px';                      // Content shifts to the left
    } else {
        content.style.marginLeft = '220px';                     // Content adjusts for visible sidebar
    }
});

function loadPage(pageUrl) {                                    // Function to load a page dynamically into the content element
    fetch(pageUrl)                                              // Fetches the HTML content from the specified URL
        .then(response => {
            if (!response.ok) {                                 // Checks if the response is OK (status 200–299)
                throw new Error('Error loading page');          // Throws an error if the response is not successful
            }
            return response.text();                             // Returns the response as text (HTML content)
        })
        .then(html => {
            content.innerHTML = html;                           // Replaces the inner HTML of the content element with the fetched HTML
        })
        .catch(error => {
            // Displays an error message inside the content element if an error occurs
            content.innerHTML = `<p>Error loading content: ${error.message}</p>`;
        });
}
