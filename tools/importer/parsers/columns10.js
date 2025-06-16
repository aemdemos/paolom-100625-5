/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the main columns grid wrapper in the footer
  const grid = element.querySelector(':scope > .footer-grid, :scope > .footer-grid.wrapper');
  if (!grid) return;

  // 2. Get all top-level columns in the grid (direct children only)
  // Each column is a div with class sf_colsIn
  const columns = Array.from(grid.querySelectorAll(':scope > div'));

  // 3. For each column, extract the relevant visible children blocks
  function getColumnBlocks(col) {
    const blocks = [];
    Array.from(col.children).forEach(child => {
      if (
        child.classList.contains('footer-list') ||
        child.classList.contains('social-media-links') ||
        child.classList.contains('content-block') ||
        child.classList.contains('footer-nav')
      ) {
        blocks.push(child);
      }
    });
    if (blocks.length === 0 && col.innerHTML.trim() !== '') {
      blocks.push(col);
    }
    if (blocks.length === 0) return '';
    return blocks.length === 1 ? blocks[0] : blocks;
  }
  const colCells = columns.map(getColumnBlocks);

  // The header row must be a SINGLE CELL array: ['Columns (columns10)']
  // The next row is an array with N cells (N = number of columns)
  const cells = [
    ['Columns (columns10)'],
    colCells
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
