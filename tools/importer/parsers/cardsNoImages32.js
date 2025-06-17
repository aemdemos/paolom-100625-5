/* global WebImporter */
export default function parse(element, { document }) {
  // Find the middle column containing the cards (with class 'column-content-slot')
  const column = element.querySelector('.column-content-slot');
  if (!column) return;

  // Each card is a .content-block (there can be 0 or more)
  const cards = column.querySelectorAll('.content-block');

  // Prepare rows: header first
  const rows = [['Cards (cardsNoImages32)']];

  cards.forEach(card => {
    // Get the .wysiwyg child which contains the heading and content
    const wysiwyg = card.querySelector('.wysiwyg');
    if (wysiwyg && wysiwyg.textContent.trim()) {
      rows.push([wysiwyg]);
    }
  });

  // Only create and replace if there is at least the header row + one card row
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
