/* global WebImporter */
export default function parse(element, { document }) {
  // Get the three columns from the wrapper section
  const cols = Array.from(element.querySelectorAll(':scope > div'));
  const [col1, col2, col3] = [cols[0], cols[1], cols[2]];

  // LEFT COLUMN: social share (sticky) and blue-circles share box
  const leftContent = [];
  if (col1) {
    const stickyShare = col1.querySelector('.social-share');
    if (stickyShare) leftContent.push(stickyShare);
    const blueCircles = col1.querySelector('.blue-circles');
    if (blueCircles) leftContent.push(blueCircles);
  }

  // CENTER COLUMN: all content-blocks and related articles
  const centerContent = [];
  if (col2) {
    const blocks = col2.querySelectorAll(':scope > .content-block');
    blocks.forEach(b => centerContent.push(b));
    const related = col2.querySelector('.related-articles-partial');
    if (related) centerContent.push(related);
  }

  // RIGHT COLUMN: related-category list
  const rightContent = [];
  if (col3) {
    const relatedCategory = col3.querySelector('.related-category');
    if (relatedCategory) rightContent.push(relatedCategory);
  }

  // Header row: must be a SINGLE column, per the example
  const headerRow = ['Columns (columns2)'];
  // Second row: multi-column (3 columns)
  const contentRow = [
    leftContent.length === 1 ? leftContent[0] : (leftContent.length ? leftContent : ''),
    centerContent.length === 1 ? centerContent[0] : (centerContent.length ? centerContent : ''),
    rightContent.length === 1 ? rightContent[0] : (rightContent.length ? rightContent : '')
  ];

  // For the WebImporter DOMUtils, the header row is single cell, the second row is N columns
  const table = document.createElement('table');
  // Header row
  const trHeader = document.createElement('tr');
  const th = document.createElement('th');
  th.colSpan = '3';
  th.textContent = headerRow[0];
  trHeader.appendChild(th);
  table.appendChild(trHeader);
  // Content row
  const trContent = document.createElement('tr');
  contentRow.forEach(cell => {
    const td = document.createElement('td');
    if (Array.isArray(cell)) {
      cell.forEach(el => td.append(el));
    } else if (cell) {
      td.append(cell);
    }
    trContent.appendChild(td);
  });
  table.appendChild(trContent);

  element.replaceWith(table);
}
