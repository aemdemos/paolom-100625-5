/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns (direct children of the grid wrapper)
  const wrapper = element.querySelector('.footer-grid.wrapper');
  if (!wrapper) return;

  // Get all direct column divs
  const columns = Array.from(wrapper.querySelectorAll(':scope > div'));

  // Use nodeType constants from the document object
  const ELEMENT_NODE = document.ELEMENT_NODE || 1;
  const TEXT_NODE = document.TEXT_NODE || 3;

  // For each column, extract its semantic contents (not wrapper)
  const columnCells = columns.map((col) => {
    const colContent = Array.from(col.childNodes).filter(
      node => (
        node.nodeType === ELEMENT_NODE ||
        (node.nodeType === TEXT_NODE && node.textContent.trim() !== '')
      )
    );
    if (colContent.length === 1) {
      return colContent[0];
    }
    return colContent;
  });

  // Build the cells array for createTable: header row should be a single cell
  const cells = [
    ['Columns (columns9)'],
    columnCells
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
