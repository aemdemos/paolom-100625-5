/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Select immediate children columns
  const columns = Array.from(element.querySelectorAll(':scope > div.sf_colsIn[data-sf-element]'));

  // 2. Build up the rows for the cards block
  const headerRow = ['Cards (cardsNoImages33)'];
  const rows = [headerRow];

  columns.forEach(col => {
    // Defensive: find the .sustainability--content within each card
    const content = col.querySelector('.sustainability--content');
    if (content) {
      // Gather title and call-to-action link if they exist
      const title = content.querySelector('.sustainability--title');
      const link = content.querySelector('a.sustainability--link');
      // Compose cell, preserving semantic structure and referencing actual elements
      const cell = [];
      if (title) cell.push(title);
      if (link) {
        cell.push(document.createElement('br'));
        cell.push(link);
      }
      rows.push([cell]);
    }
  });

  // 3. Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
