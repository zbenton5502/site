// Slider Functionality
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showNextSlide() {
    slides.forEach(slide => slide.classList.remove('active'));
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add('active');
}

setInterval(showNextSlide, 5000); // Change slide every 5 seconds

// Podcast Fetching Functionality
document.addEventListener('DOMContentLoaded', () => {
    const rssFeedUrl = 'https://feeds.libsyn.com/482802/rss';
    const proxyUrl = 'https://api.allorigins.win/raw?url='; // Free CORS proxy
    const podcastContainer = document.getElementById('podcast-episodes');

    fetch(proxyUrl + encodeURIComponent(rssFeedUrl))
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');
            const items = xmlDoc.getElementsByTagName('item');
            let html = '<ul>';

            for (let i = 0; i < Math.min(items.length, 5); i++) { // Limit to 5 episodes
                const title = items[i].getElementsByTagName('title')[0].textContent;
                const audioUrl = items[i].getElementsByTagName('enclosure')[0].getAttribute('url');
                html += `
                    <li>
                        <h3>${title}</h3>
                        <audio controls>
                            <source src="${audioUrl}" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                    </li>
                `;
            }
            html += '</ul>';
            podcastContainer.innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching podcast:', error);
            podcastContainer.innerHTML = '<p>Sorry, unable to load podcast episodes at this time.</p>';
        });
});
