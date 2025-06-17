/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs of section (the columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // There should be 3 columns: the large-image-text-on-image and two small-image-above-title
  // If any are missing, fallback to empty nodes
  const col1 = columnDivs.find(div => div.classList.contains('large-image-text-on-image')) || document.createTextNode('');
  const smalls = columnDivs.filter(div => div.classList.contains('small-image-above-title'));
  const col2 = smalls[0] || document.createTextNode('');
  const col3 = smalls[1] || document.createTextNode('');

  // Table header exactly as specified in the requirements
  const cells = [
    ['Columns (columns15)'],
    [col1, col2, col3]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
