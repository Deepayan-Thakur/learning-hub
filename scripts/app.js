async function loadResources() {
  const response = await fetch('data/resources.json');
  const data = await response.json();

  const container = document.getElementById('content');

  for (const category in data) {
    const section = document.createElement('div');
    section.className = 'category';

    const title = document.createElement('h2');
    title.innerText = category;
    section.appendChild(title);

    data[category].forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <a href="${item.url}" target="_blank">Visit</a>
      `;

      section.appendChild(card);
    });

    container.appendChild(section);
  }
}

loadResources();