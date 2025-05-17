async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();  // pega o objeto completo
    const members = data.members;         // pega o array de membros

    const container = document.getElementById('members-list');
    container.innerHTML = '';  // limpa antes de adicionar

    members.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('member-card');
      card.innerHTML = `
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
      `;
      container.appendChild(card);
    });

  } catch (error) {
    console.error('Error loading members:', error);
  }
}

loadMembers();
