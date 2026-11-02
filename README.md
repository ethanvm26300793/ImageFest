# ImageFest

ImageFest is a dynamic image discovery app designed to help users quickly find high-resolution photography based on their search inputs. Users can search for specific topics and view the results in a fluid, responsive gallery populated by the Wikimedia Commons API.

### Design Decisions
1. **Empty-State Messaging & Result Count:** I included a dedicated empty-state paragraph (`#empty-state`) that remains visible while the results grid is empty, providing immediate feedback to the user on what action to take next. Once a search is completed, this element updates dynamically to show the exact number of results returned.
2. **Category Suggestion Chips:** I added a row of clickable category chips below the search bar. This serves as a quick-start guide to inspire users, and the chips are wired directly to the search function to execute a query in one click.

gi
### Part 3: Polish and Deploy

Added robust state management and UI polish to complete the ImageFest application.

**Updates:**
- Implemented a CSS loading spinner that displays before fetch resolves.
- Added strict empty-state checking ("No results for that word. Try another search.").
- Wrapped API call in a `try...catch` block to handle network errors gracefully.
- Polish: Added a staggered CSS fade-in animation to the result cards for a smoother viewing experience.

**Links:**
- Repo URL: https://github.com/ethanvm26300793/ImageFest
- Live URL: https://ethanvm26300793.github.io/ImageFest/