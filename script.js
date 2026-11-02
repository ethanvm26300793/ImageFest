const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const resultsContainer = document.getElementById('results');
const emptyState = document.getElementById('empty-state');
const chips = document.querySelectorAll('.chip');

async function performSearch(query) {
    // Ignore blank searches
    if (!query.trim()) return;

    // Clear previous results and update status
    resultsContainer.innerHTML = '';
    emptyState.textContent = `Searching for "${query}"...`;

    try {
        // Fetch from Wikimedia Commons API
        const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=20&prop=imageinfo&iiprop=url|extmetadata&format=json&origin=*`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const pages = data.query ? data.query.pages : null;

        if (!pages) {
            emptyState.textContent = `No results found for "${query}".`;
            return;
        }

        const items = Object.values(pages);
        emptyState.textContent = `Showing ${items.length} results for "${query}"`;

        items.forEach(item => {
            const info = item.imageinfo[0];
            const imageUrl = info.url;
            // Get a clean title, fallback to the file name
            const title = info.extmetadata?.ObjectName?.value || item.title.replace('File:', '');

            // Create card element (Enhancement: clickable link to full image)
            const card = document.createElement('a');
            card.className = 'image-card';
            card.href = imageUrl;
            card.target = '_blank'; 

            // Create image element
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = title;

            // Create title element
            const titleEl = document.createElement('h3');
            titleEl.textContent = title;

            // Assemble the card
            card.appendChild(img);
            card.appendChild(titleEl);

            // Add to grid
            resultsContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error fetching images:", error);
        emptyState.textContent = "An error occurred while searching. Please try again.";
    }
}

// 1. Catch the search form submit
form.addEventListener('submit', (event) => {
    event.preventDefault();
    performSearch(input.value);
});

// Enhancement: Wire up the category chips
chips.forEach(chip => {
    chip.addEventListener('click', () => {
        const query = chip.textContent;
        input.value = query; // Update the input box
        performSearch(query); // Run the search
    });
});