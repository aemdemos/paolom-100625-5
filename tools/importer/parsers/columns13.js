/* global WebImporter */
export default function parse(element, { document }) {
  // Gather the four main columns by class, in layout order
  const selectors = [
    '.V3-Homepage-Header-V2--big.widget-container',
    '.V3-Homepage-Header-V2--medium.widget-container',
    '.V3-Homepage-Header-V2--small1.widget-container',
    '.V3-Homepage-Header-V2--small2.widget-container',
  ];
  // Select only those that exist in the element (be robust to missing columns)
  const columns = selectors
    .map(sel => element.querySelector(sel))
    .filter(Boolean);

  // If nothing found, do nothing
  if (columns.length === 0) return;

  // Build the block rows
  const headerRow = ['Columns (columns13)'];
  const contentRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
