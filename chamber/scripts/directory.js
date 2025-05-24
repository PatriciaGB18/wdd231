const membersContainer = document.getElementById('members-container');
const membersList = document.getElementById('members-list');
const gridViewBtn = document.getElementById('gridViewBtn');
const listViewBtn = document.getElementById('listViewBtn');

async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    membersList.innerHTML = '<p>Error loading members.</p>';
    console.error(error);
  }
}

function displayMembers(members) {
  membersList.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('article');
    card.classList.add('member-card', member.membership.toLowerCase());

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name}" />
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Website</a></p>
      <p><strong>Membership Level:</strong> ${membershipLevelName(member.membership)}</p>
    `;

    membersList.appendChild(card);
  });
}

function membershipLevelName(level) {
  switch (level.toLowerCase()) {
    case 'bronze': return 'Bronze';
    case 'silver': return 'Silver';
    case 'gold': return 'Gold';
    default: return 'Unknown';
  }
}

gridViewBtn.addEventListener('click', () => {
  membersContainer.classList.remove('list-view');
  membersContainer.classList.add('grid-view');
  gridViewBtn.disabled = true;
  listViewBtn.disabled = false;
});

listViewBtn.addEventListener('click', () => {
  membersContainer.classList.remove('grid-view');
  membersContainer.classList.add('list-view');
  listViewBtn.disabled = true;
  gridViewBtn.disabled = false;
});

loadMembers();

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
