const levelSelect = document.getElementById('levelSelect');
const genreSelect = document.getElementById('genreSelect');
const bookGrid = document.getElementById('bookGrid');
const emptyState = document.getElementById('emptyState');

const farsiBooks = books.filter(book => book.language === 'fa');

function filterBooks() {
  const level = levelSelect.value;
  const genre = genreSelect.value;

  const filtered = farsiBooks.filter(book => {
    const levelMatch = level === 'all' || book.level === level;
    const genreMatch = genre === 'all' || book.genre === genre;
    return levelMatch && genreMatch;
  });

  renderBooks(filtered);
}

function renderBooks(bookList) {
  if (!bookList.length) {
    bookGrid.innerHTML = '';
    emptyState.textContent = 'No Farsi graded readers match the selected filters. Try changing the level or genre.';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  bookGrid.innerHTML = bookList.map(book => {
    return `
      <article class="book-card">
        <div>
          <h2>${book.title}</h2>
          <p class="meta"><span class="badge">${book.level}</span><span class="badge">${book.genre}</span></p>
          <p>${book.description}</p>
          <p><strong>Author:</strong> ${book.author}</p>
        </div>
        <a href="${book.amazon}" target="_blank" rel="noopener noreferrer">View on Amazon</a>
      </article>
    `;
  }).join('');
}

levelSelect.addEventListener('change', filterBooks);
genreSelect.addEventListener('change', filterBooks);

filterBooks();
