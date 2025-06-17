/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content block with the accordion content
  // This is the .wysiwyg div in the main column
  const contentBlock = element.querySelector('.content-block .wysiwyg');
  if (!contentBlock) return;

  // Only h2s are titles; content is all following elements until next h2
  const children = Array.from(contentBlock.children);
  const accordionRows = [];
  let i = 0;
  while (i < children.length) {
    if (children[i].tagName === 'H2') {
      const title = children[i];
      // Collect all elements after this h2 until the next h2 or end
      const contentEls = [];
      let j = i + 1;
      while (j < children.length && children[j].tagName !== 'H2') {
        contentEls.push(children[j]);
        j++;
      }
      // If we have no content, ensure we add a blank paragraph for consistent structure
      let contentCell;
      if (contentEls.length === 0) {
        const p = document.createElement('p');
        contentCell = [p];
      } else {
        contentCell = contentEls;
      }
      accordionRows.push([title, contentCell]);
      i = j;
    } else {
      // Skip any elements before the first h2
      i++;
    }
  }

  // Compose final table array with correct header
  const cells = [
    ['Accordion (accordion3)'],
    ...accordionRows
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
