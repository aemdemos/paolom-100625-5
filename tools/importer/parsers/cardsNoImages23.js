/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cardsNoImages23) block: Only one table, header: Cards (cardsNoImages23)
  // Each card = a .content-block .wysiwyg
  const headerRow = ['Cards (cardsNoImages23)'];
  const cardRows = [];

  // Find all immediate child .content-block elements (not from sidebar etc)
  // It's safe because only the main content column has .content-block under the #Footer_C003_Col01
  const mainColumn = element.querySelector('#Footer_C003_Col01');
  if (mainColumn) {
    const contentBlocks = mainColumn.querySelectorAll('.content-block');
    contentBlocks.forEach(block => {
      const wysiwyg = block.querySelector('.wysiwyg');
      if (wysiwyg && wysiwyg.textContent.trim()) {
        // Use the actual wysiwyg node (don't clone), keep all structure
        cardRows.push([wysiwyg]);
      }
    });
  }

  // Only create table if at least one card row was found
  if (cardRows.length > 0) {
    const cells = [headerRow, ...cardRows];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
