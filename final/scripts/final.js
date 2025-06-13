document.addEventListener('DOMContentLoaded', () => {
    
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            if (navMenu.classList.contains('open')) {
                menuButton.innerHTML = "&times;";
            } else {
                menuButton.innerHTML = "&#9776;";
            }
            console.log('Menu button clicked!');
        });
    }

    
    loadPlaces();

    
    const yearElem = document.getElementById('year');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }

    const lastModifiedElem = document.getElementById('lastModified');
    if (lastModifiedElem) {
        lastModifiedElem.textContent = `Last Modified: ${document.lastModified}`;
    }
});

async function loadPlaces() {
    const container = document.getElementById('places-container');
    if (!container) return;

    try {
        const response = await fetch('data/final.json');
        if (!response.ok) throw new Error('Failed to load JSON');
        const places = await response.json();
        console.log('Loaded places:', places);

        places.forEach(place => {
            const card = document.createElement('article');
            card.classList.add('place-card');

            card.innerHTML = `
        <h2>${place.name}</h2>
        <img src="${place.image}" alt="${place.name}" loading="lazy">
        <p>${place.inspiration}</p>
        <address>${place.location}</address>
        <button class="view-map">View Map</button>

      `;

            
            const viewMapBtn = card.querySelector('.view-map');
            if (viewMapBtn) {
                viewMapBtn.addEventListener("click", (event) => {
                    event.stopPropagation(); 
                    openMapModal(place.location);
                });
            }

            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading places:', error);
        container.innerHTML = `<p class="error">Sorry, we couldn't load the magical places right now.</p>`;
    }
}


function openMapModal(location) {
    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;
    const mapIframe = document.getElementById("mapIframe");
    if (!mapIframe) {
        console.error('Element with id "mapIframe" not found.');
        return;
    }
    mapIframe.src = mapUrl;
    document.getElementById("mapModal").style.display = "block";
}


function closeMapModal() {
    document.getElementById("mapModal").style.display = "none";
    document.getElementById("mapIframe").src = "";
}


document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector("#mapModal .close");
    if (closeBtn) {
        closeBtn.addEventListener("click", closeMapModal);
    }

    window.addEventListener("click", (event) => {
        const modal = document.getElementById("mapModal");
        if (event.target === modal) {
            closeMapModal();
        }
    });
});
