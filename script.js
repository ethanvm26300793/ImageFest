const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const resultsContainer = document.getElementById('results');
const emptyState = document.getElementById('empty-state');
const spinner = document.getElementById('loading-spinner');
const chips = document.querySelectorAll('.chip');

async function performSearch(query) {
    if (!query.trim()) return;

    // 1. Loading State
    resultsContainer.innerHTML = '';
    emptyState.textContent = `Searching for "${query}"...`;
    spinner.classList.remove('hidden');

    try {
        const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=20&prop=imageinfo&iiprop=url|extmetadata&format=json&origin=*`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const pages = data.query ? data.query.pages : null;

        // 2. Empty State
        if (!pages) {
            spinner.classList.add('hidden');
            emptyState.textContent = `No results for "${query}". Try another search.`;
            return;
        }

        // Render Results
        spinner.classList.add('hidden');
        const items = Object.values(pages);
        emptyState.textContent = `Showing ${items.length} results for "${query}"`;

        items.forEach((item, index) => {
            const info = item.imageinfo[0];
            const imageUrl = info.url;
            const title = info.extmetadata?.ObjectName?.value || item.title.replace('File:', '');

            const card = document.createElement('a');
            card.className = 'image-card';
            card.href = imageUrl;
            card.target = '_blank'; 
            
            // Polish: Stagger the fade-in animation based on index
            card.style.animationDelay = `${index * 0.05}s`;

            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = title;

            const titleEl = document.createElement('h3');
            titleEl.textContent = title;

            card.appendChild(img);
            card.appendChild(titleEl);
            resultsContainer.appendChild(card);
        });

    } catch (error) {
        // 3. Error State
        console.error("Error fetching images:", error);
        spinner.classList.add('hidden');
        emptyState.textContent = "Something went wrong. Please try again.";
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    performSearch(input.value);
});

chips.forEach(chip => {
    chip.addEventListener('click', () => {
        const query = chip.textContent;
        input.value = query; 
        performSearch(query); 
    });
});