/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: one column only, per the requirement
  const headerRow = ['Cards (cards22)'];
  const rows = [headerRow];

  // Select all direct card elements
  const cardDivs = element.querySelectorAll(':scope > .small-image-above-title');
  cardDivs.forEach(cardDiv => {
    // --- IMAGE CELL ---
    let imageEl = null;
    const pictureLink = cardDiv.querySelector(':scope > .small-image-above-title--picture');
    if (pictureLink) {
      const backPicture = pictureLink.querySelector('.back-picture');
      if (backPicture) {
        const img = backPicture.querySelector('img');
        if (img) {
          imageEl = img;
        }
      }
    }

    // --- TEXT CELL ---
    const contentDiv = cardDiv.querySelector(':scope > .small-image-above-title--content');
    const textCellChildren = [];
    if (contentDiv) {
      // Title (as heading)
      const titleLink = contentDiv.querySelector('.small-image-above-title--title');
      if (titleLink) {
        textCellChildren.push(titleLink);
        textCellChildren.push(document.createElement('br'));
      }
      // Arrowed-link as CTA
      const ctaLink = contentDiv.querySelector('.arrowed-link');
      if (ctaLink && ctaLink.textContent.trim()) {
        textCellChildren.push(ctaLink);
      }
    }
    // Each card row: an array of TWO elements [image, text-content]
    rows.push([
      imageEl,
      textCellChildren.length > 0 ? textCellChildren : ''
    ]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
