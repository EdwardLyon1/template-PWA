document.addEventListener('DOMContentLoaded', function() {
    fetch('/visitorCount')
        .then(response => response.json())
        .then(data => {
            const countDisplay = document.getElementById('visitorCount');
            countDisplay.textContent = data.visitorCount;
        })
        .catch(error => console.error('Error fetching visitor count:', error));
});
