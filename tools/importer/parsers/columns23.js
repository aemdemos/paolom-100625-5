/* global WebImporter */
export default function parse(element, { document }) {
  // Get all the key figure elements
  const ul = element.querySelector('ul.key-figure');
  if (!ul) return;
  const items = Array.from(ul.querySelectorAll(':scope > li.key-figure--element'));
  if (!items.length) return;

  // Put all key-figure--element-containers in a single array for one cell
  const contentElements = items.map((li) => {
    const container = li.querySelector('.key-figure--element-container');
    return container || document.createElement('div');
  });

  // The header row as specified
  const headerRow = ['Columns (columns23)'];
  // One cell (single column) containing all the content
  const contentRow = [contentElements];

  const tableArr = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(tableArr, document);
  element.replaceWith(table);
}
