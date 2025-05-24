const spotlightContainer = document.querySelector("#spotlight-container");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Error fetching members.");
        const data = await response.json();

        displaySpotlights(data.members);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

function displaySpotlights(members) {
    const qualifiedMembers = members.filter(member =>
        member.membership === "gold" || member.membership === "silver"
    );

    const availableMembers = [...qualifiedMembers];
    const numSpotlights = Math.min(3, Math.max(2, availableMembers.length));

    const spotlights = availableMembers
        .sort(() => Math.random() - 0.5)
        .slice(0, numSpotlights);

    spotlights.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");

        const imageSrc = member.image ? member.image : "images/default-logo.webp";

        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${imageSrc}" alt="${member.name} logo">
            <p>${member.address || "Address not available"}</p>
            <p>${member.phone || "Phone not available"}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        spotlightContainer.appendChild(card);
    });
}

getMembers();
