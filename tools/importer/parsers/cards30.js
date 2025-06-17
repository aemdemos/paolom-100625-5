/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: a single cell, but must match the block's column count (2), as per createTable spec
  // Per spec/example: header row is an array of a single string, not two columns, so we use ['Cards (cards30)']
  // The WebImporter.DOMUtils.createTable will handle the colspan for us
  const headerRow = ['Cards (cards30)'];
  const rows = [];
  const cards = element.querySelectorAll(':scope > div.small-image-above-title');
  cards.forEach((card) => {
    // Find the card image (first cell)
    let imgEl = '';
    const pictureLink = card.querySelector(':scope > a.small-image-above-title--picture');
    if (pictureLink) {
      const img = pictureLink.querySelector('img');
      if (img) imgEl = img;
    }
    // Find the text content (second cell)
    const textContent = document.createElement('div');
    const contentBox = card.querySelector(':scope > .small-image-above-title--content');
    if (contentBox) {
      // Category
      const category = contentBox.querySelector('.small-image-above-title--category');
      if (category) {
        const catDiv = document.createElement('div');
        catDiv.appendChild(category);
        textContent.appendChild(catDiv);
      }
      // Title
      const title = contentBox.querySelector('.small-image-above-title--title');
      if (title) {
        const titleDiv = document.createElement('div');
        titleDiv.appendChild(title);
        textContent.appendChild(titleDiv);
      }
    }
    rows.push([imgEl, textContent]);
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
