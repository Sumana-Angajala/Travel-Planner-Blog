
document.addEventListener('DOMContentLoaded', () => {
  const map = L.map('map').setView([20.5937, 78.9629], 4);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  const form = document.getElementById('destination-form');
  const list = document.getElementById('destinations-list');
  let destinations = JSON.parse(localStorage.getItem('destinations')) || [];

  form.addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const notes = document.getElementById('notes').value;
    const image = document.getElementById('image').files[0];

    map.once('click', function(e) {
      const latlng = e.latlng;
      const destination = { title, date, notes, lat: latlng.lat, lng: latlng.lng };
      destinations.push(destination);
      localStorage.setItem('destinations', JSON.stringify(destinations));
      L.marker(latlng).addTo(map).bindPopup(`<b>${title}</b><br>${date}`).openPopup();
      renderDestinations();
    });

    alert('Now click on the map to choose location.');
  });

  function renderDestinations() {
    list.innerHTML = "";
    destinations.forEach(d => {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${d.title}</strong> - ${d.date}<br>${d.notes}<hr/>`;
      list.appendChild(div);
      L.marker([d.lat, d.lng]).addTo(map).bindPopup(d.title);
    });
  }

  renderDestinations();
});
document.getElementById('searchInput').addEventListener('input', function () {
  const filter = this.value.toLowerCase();
  const cards = document.querySelectorAll('.blog-card');
  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(filter) ? '' : 'none';
  });
});
function toggleMenu() {
  const navList = document.querySelector('nav ul');
  navList.classList.toggle('active');
}
function openLightbox(img) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = img.src;
  lightbox.style.display = 'block';
}
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("destinationForm");
  const list = document.getElementById("destinationList");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("destinationName").value;
    const date = document.getElementById("destinationDate").value;
    const notes = document.getElementById("destinationNotes").value;

    if (name.trim() === '' || date.trim() === '') {
      alert("Please fill in all required fields.");
      return;
    }

    const card = document.createElement("div");
    card.className = "destination-card";
    card.innerHTML = `
      <h3>${name}</h3>
      <p><strong>Date:</strong> ${date}</p>
      <p>${notes}</p>
    `;

    list.appendChild(card);
    form.reset();
  });
});
blogForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('blog-title').value.trim();
  const content = document.getElementById('blog-content').value.trim();
  const sticker = document.getElementById('blog-sticker').value;
  const imageInput = document.getElementById('blog-image');
  const imageUrlInput = document.getElementById('blog-image-url').value.trim();
  const imageFile = imageInput.files[0];

  if (!title || !content) return;

  const savePost = (imageData = "") => {
    const newPost = {
      title,
      content,
      image: imageData || imageUrlInput || "",
      sticker,
      views: 1,
      likes: 0,
      author: username,
      date: new Date().toLocaleString()
    };
    blogPosts.push(newPost);
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    blogForm.reset();
    renderPosts();
  };

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function () {
      savePost(reader.result);
    };
    reader.readAsDataURL(imageFile);
  } else {
    savePost(); // use image URL or none
  }
});
