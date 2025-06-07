import { places } from '../data/places.mjs';

const showHere = document.querySelector("#allplaces");

function displayItems(places) {
  places.forEach(x => {
    const thecard = document.createElement('div');
    thecard.classList.add('place-card'); 

    const thetitle = document.createElement('h2');
    thetitle.innerText = x.name;
    thecard.appendChild(thetitle);

    const thephoto = document.createElement('img');
    thephoto.src = x.image || x.image_url || '';
    thephoto.alt = x.name;
    thecard.appendChild(thephoto);

    const thedesc = document.createElement('p');
    thedesc.innerText = x.description;
    thecard.appendChild(thedesc);

    const theaddress = document.createElement('address');
    theaddress.innerText = x.address;
    thecard.appendChild(theaddress);

    showHere.appendChild(thecard);
  });
}

displayItems(places);

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && mobileMenu) {
    mobileMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = "☰";

    menuToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      const isExpanded = mobileMenu.classList.contains("active");
      mobileMenu.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", !isExpanded);
      menuToggle.innerHTML = mobileMenu.classList.contains("active") ? "✖" : "☰";
    });

    document.addEventListener("click", function (event) {
      if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
        mobileMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = "☰";
      }
    });
  } else {
    console.error("Elementos menu-toggle ou mobile-menu não encontrados no DOM.");
  }
});
