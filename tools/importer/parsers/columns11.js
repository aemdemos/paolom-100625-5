/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get left column content (logo + title + date)
  function getLeftContent(el) {
    const contentDiv = el.querySelector('.blog-intro--content');
    const leftContent = document.createElement('div');
    if (contentDiv) {
      // Add logo
      const logoDiv = contentDiv.querySelector('.logo-disc');
      if (logoDiv) leftContent.appendChild(logoDiv);
      // Add title
      const title = contentDiv.querySelector('.blog-intro--title');
      if (title) leftContent.appendChild(title);
      // Add date (only the date p, not its parent div, to avoid duplication)
      const notesDiv = contentDiv.querySelector('.blog-intro--notes');
      if (notesDiv) {
        const dateP = notesDiv.querySelector('p');
        if (dateP) leftContent.appendChild(dateP);
      }
    }
    return leftContent;
  }

  // Helper to get right column content (main image)
  function getRightContent(el) {
    const pictureDiv = el.querySelector('.blog-intro--picture');
    if (pictureDiv) {
      const backPic = pictureDiv.querySelector('.back-picture');
      if (backPic) return backPic;
    }
    return document.createElement('div');
  }

  // Compose table rows
  const headerRow = ['Columns (columns11)'];
  const leftCell = getLeftContent(element);
  const rightCell = getRightContent(element);
  const cells = [
    headerRow,
    [leftCell, rightCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
