/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match: Cards (cards29)
  const headerRow = ['Cards (cards29)'];

  // Find all card elements (direct children)
  const cardEls = Array.from(element.querySelectorAll(':scope > .small-image-above-title'));

  // Build card rows
  const rows = cardEls.map((card) => {
    // --- IMAGE CELL ---
    let imgEl = null;
    const pictureLink = card.querySelector('.small-image-above-title--picture');
    if (pictureLink) {
      const backPicture = pictureLink.querySelector('.back-picture');
      if (backPicture) {
        const img = backPicture.querySelector('img');
        if (img) imgEl = img;
      }
    }

    // --- TEXT CELL ---
    const textDiv = document.createElement('div');
    const contentDiv = card.querySelector('.small-image-above-title--content');
    // Title (as heading/strong)
    if (contentDiv) {
      const title = contentDiv.querySelector('.small-image-above-title--title');
      if (title) {
        // Use existing <a> for semantic/behavioral fidelity, but add bold
        const strong = document.createElement('strong');
        strong.append(title.textContent.trim());
        textDiv.appendChild(strong);
      }
      // Description: Not available in this markup, skip
      // CTA link
      const cta = contentDiv.querySelector('.arrowed-link');
      if (cta) {
        // Add <br> if title exists, to match example visual
        if (title) textDiv.appendChild(document.createElement('br'));
        textDiv.appendChild(cta);
      }
    }
    return [imgEl, textDiv];
  });

  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
