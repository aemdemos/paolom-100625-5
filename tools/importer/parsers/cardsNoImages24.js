/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cardsNoImages24) block for 4-column sustainability section
  // 1 column, 1 header, 1 row per card; each card = title + download link (if present)
  const headerRow = ['Cards (cardsNoImages24)'];
  const rows = [headerRow];

  // Find all direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div.sf_colsIn'));
  columns.forEach(col => {
    // Each column contains a single .sustainability card
    const card = col.querySelector(':scope > .sustainability');
    if (!card) return;
    const content = card.querySelector('.sustainability--content');
    if (!content) return;

    const contentParts = [];
    // Use the heading as <strong> (to match example)
    const title = content.querySelector('.sustainability--title');
    if (title) {
      // Use a <strong> element, but preserve all child nodes (no data loss)
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      contentParts.push(strong);
    }

    // Download/call-to-action link (if present)
    const link = content.querySelector('a');
    if (link) {
      // Add a blank line between title and link if both exist, per example
      if (contentParts.length > 0) {
        contentParts.push(document.createElement('br'));
        contentParts.push(document.createElement('br'));
      }
      contentParts.push(link);
    }
    // Only add row if there's something to show (avoid empty cards)
    if (contentParts.length > 0) {
      rows.push([contentParts]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
