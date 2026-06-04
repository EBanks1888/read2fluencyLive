const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'it', name: 'Italian' },
  { code: 'zh', name: 'Mandarin' },
  { code: 'ru', name: 'Russian' },
  { code: 'fa', name: 'Farsi' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'de', name: 'German' }
];

const books = [
  {
    title: 'The Elephant and the Tree',
    author: 'Nick De Bondt',
    language: 'en',
    level: 'A1',
    genre: 'fiction',
    amazon: 'https://www.amazon.com/dp/151538890X',
    description: 'A beginner-friendly story about a curious elephant and a forest adventure.'
  },
  {
    title: 'Spot the Dog',
    author: 'Julia Donaldson',
    language: 'en',
    level: 'A2',
    genre: 'fiction',
    amazon: 'https://www.amazon.com/dp/9780141351065',
    description: 'A charming story with clear text and memorable characters for A2 learners.'
  },
  {
    title: 'La casa de los espíritus',
    author: 'Isabel Allende',
    language: 'es',
    level: 'B2',
    genre: 'historical',
    amazon: 'https://www.amazon.com/dp/0553383807',
    description: 'A graded reader adaptation of a classic magical realism tale for high-beginner Spanish learners.'
  },
  {
    title: 'El diario de Ana Frank',
    author: 'Anne Frank',
    language: 'es',
    level: 'B1',
    genre: 'nonfiction',
    amazon: 'https://www.amazon.com/dp/8498387084',
    description: 'A simplified Spanish edition of an important historical diary.'
  },
  {
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    language: 'fr',
    level: 'A2',
    genre: 'fiction',
    amazon: 'https://www.amazon.com/dp/0156013980',
    description: 'A beloved French tale made accessible for beginning learners.'
  },
  {
    title: 'Les Misérables: Lectures Faciles',
    author: 'Victor Hugo',
    language: 'fr',
    level: 'B1',
    genre: 'historical',
    amazon: 'https://www.amazon.com/dp/2014565845',
    description: 'A simplified version of the classic novel for intermediate French learners.'
  },
  {
    title: 'Der Kleine Prinz',
    author: 'Antoine de Saint-Exupéry',
    language: 'de',
    level: 'A2',
    genre: 'fiction',
    amazon: 'https://www.amazon.com/dp/3257326207',
    description: 'A German edition of The Little Prince, ideal for beginner readers.'
  },
  {
    title: 'Mord im Jugendclub',
    author: 'Sabine Kuegler',
    language: 'de',
    level: 'B1',
    genre: 'mystery',
    amazon: 'https://www.amazon.com/dp/3126756933',
    description: 'A short mystery story set in a youth club, designed for language learners.'
  }
];

const languageSelect = document.getElementById('languageSelect');
const levelSelect = document.getElementById('levelSelect');
const genreSelect = document.getElementById('genreSelect');
const bookGrid = document.getElementById('bookGrid');
const emptyState = document.getElementById('emptyState');

function populateLanguageOptions() {
  languageSelect.innerHTML = '<option value="all">All Languages</option>' +
    languages.map(lang => `<option value="${lang.code}">${lang.name}</option>`).join('');
}

function filterBooks() {
  const language = languageSelect.value;
  const level = levelSelect.value;
  const genre = genreSelect.value;

  const filtered = books.filter(book => {
    const languageMatch = language === 'all' || book.language === language;
    const levelMatch = level === 'all' || book.level === level;
    const genreMatch = genre === 'all' || book.genre === genre;
    return languageMatch && levelMatch && genreMatch;
  });

  renderBooks(filtered);
}

function renderBooks(bookList) {
  if (!bookList.length) {
    bookGrid.innerHTML = '';
    emptyState.textContent = 'No graded readers match the selected filters. Try changing the language, level, or genre.';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  bookGrid.innerHTML = bookList.map(book => {
    const languageName = languages.find(lang => lang.code === book.language)?.name || book.language;
    return `
      <article class="book-card">
        <div>
          <h2>${book.title}</h2>
          <p class="meta"><span class="badge">${book.level}</span><span class="badge">${languageName}</span><span class="badge">${book.genre}</span></p>
          <p>${book.description}</p>
          <p><strong>Author:</strong> ${book.author}</p>
        </div>
        <a href="${book.amazon}" target="_blank" rel="noopener noreferrer">View on Amazon</a>
      </article>
    `;
  }).join('');
}

languageSelect.addEventListener('change', filterBooks);
levelSelect.addEventListener('change', filterBooks);
genreSelect.addEventListener('change', filterBooks);

populateLanguageOptions();
filterBooks();
