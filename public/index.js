document.addEventListener("DOMContentLoaded", function() {
    var jokeElement = document.getElementById('joke');
    var refreshButton = document.getElementById('refresh-btn');

    function fetchJoke() {
        fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function(data) {
            jokeElement.innerText = data.joke;
        })
        .catch(function(error) {
            console.error('Error fetching joke:', error);
            jokeElement.innerText = "Failed to load joke.";
        });
    }

    // Fetch initial joke
    fetchJoke();

    // Set up event listener for button
    refreshButton.addEventListener('click', fetchJoke);
});