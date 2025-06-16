/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards8)'];
  const cardDivs = element.querySelectorAll(':scope > .small-image-above-title, :scope > .small-image-above-title.active');
  const rows = [headerRow];

  cardDivs.forEach(card => {
    // First cell: image
    let imgEl = null;
    const pictureLink = card.querySelector('.small-image-above-title--picture');
    if (pictureLink) {
      imgEl = pictureLink.querySelector('img');
    }

    // Second cell: text content with category (as small) and title (as link)
    const contentDiv = card.querySelector('.small-image-above-title--content');
    const textCell = [];
    if (contentDiv) {
      // If a category exists, render it as a div (with link inside)
      const category = contentDiv.querySelector('.small-image-above-title--category');
      if (category) {
        // Use the element reference directly, don't clone
        textCell.push(category);
      }
      // Title as link
      const title = contentDiv.querySelector('.small-image-above-title--title');
      if (title) {
        textCell.push(title);
      }
    }
    rows.push([imgEl, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
