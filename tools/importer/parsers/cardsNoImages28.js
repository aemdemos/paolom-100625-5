/* global WebImporter */
export default function parse(element, { document }) {
  // Build header row, exact as specified
  const headerRow = ['Cards (cardsNoImages28)'];
  const rows = [headerRow];

  // Get all immediate card container divs (columns)
  const columns = element.querySelectorAll(':scope > div');

  columns.forEach((col) => {
    const card = col.querySelector('.sustainability');
    if (card) {
      const content = card.querySelector('.sustainability--content');
      if (content) {
        const cellContent = [];
        // Title (as <strong> text only)
        const title = content.querySelector('.sustainability--title');
        if (title) {
          const strong = document.createElement('strong');
          strong.textContent = title.textContent.trim();
          cellContent.push(strong);
        }
        // CTA link: reference the existing <a> if present
        const link = content.querySelector('a.sustainability--link');
        if (link) {
          cellContent.push(link);
        }
        // Only add row if at least some content exists
        if (cellContent.length > 0) {
          rows.push([cellContent]);
        }
      }
    }
  });

  // Only replace if there's at least the header and one card
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
