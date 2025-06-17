/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Cards (cardsNoImages25)'];

  // Get all the immediate cards
  const cards = element.querySelectorAll(':scope > .small-image-above-title');

  // For each card, extract the content container (category, title, reading time)
  // Each content container is referenced directly in the table cell
  const rows = [];
  cards.forEach(card => {
    const content = card.querySelector('.small-image-above-title--content');
    // If content exists, push it, else push an empty string
    rows.push([content ? content : '']);
  });

  // Compose the full table cells array
  const cells = [headerRow, ...rows];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
