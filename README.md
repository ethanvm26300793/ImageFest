# ImageFest

ImageFest is a dynamic image discovery app designed to help users quickly find high-resolution photography based on their search inputs. Users can search for specific topics and view the results in a fluid, responsive gallery populated by the Wikimedia Commons API.

### Design Decisions
1. **Empty-State Messaging & Result Count:** I included a dedicated empty-state paragraph (`#empty-state`) that remains visible while the results grid is empty, providing immediate feedback to the user on what action to take next. Once a search is completed, this element updates dynamically to show the exact number of results returned.
2. **Category Suggestion Chips:** I added a row of clickable category chips below the search bar. This serves as a quick-start guide to inspire users, and the chips are wired directly to the search function to execute a query in one click.