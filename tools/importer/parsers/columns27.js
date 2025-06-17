/* global WebImporter */
export default function parse(element, { document }) {
  // Get all column elements
  const columns = Array.from(element.querySelectorAll('ul.key-figure > li.key-figure--element'));
  // Header row: exactly one column with block name
  const headerRow = ['Columns (columns27)'];
  // Content row: as many columns as in the source
  const contentRow = columns.map(li => {
    const container = li.querySelector('.key-figure--element-container');
    return container || '';
  });
  const cells = [ headerRow, contentRow ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
