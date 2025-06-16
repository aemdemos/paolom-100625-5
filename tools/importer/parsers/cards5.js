/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards5)'];
  const cards = [];

  // Find the section containing related articles (the cards)
  const relatedSection = element.querySelector('section.related-articles-partial');
  if (relatedSection) {
    const cardsList = relatedSection.querySelectorAll('.small-image-above-title');
    cardsList.forEach(card => {
      // Get image (first image in .back-picture)
      let imgElem = null;
      const pictureAnchor = card.querySelector('.small-image-above-title--picture');
      if (pictureAnchor) {
        const backPic = pictureAnchor.querySelector('.back-picture');
        if (backPic) {
          imgElem = backPic.querySelector('img');
        }
      }

      // Get text content (category, title)
      const textCell = document.createElement('div');
      const contentDiv = card.querySelector('.small-image-above-title--content');
      if (contentDiv) {
        // Category (optional)
        const category = contentDiv.querySelector('.category-title.small-image-above-title--category');
        if (category) {
          const small = document.createElement('small');
          small.textContent = category.textContent.trim();
          textCell.appendChild(small);
          textCell.appendChild(document.createElement('br'));
        }
        // Title (mandatory)
        const title = contentDiv.querySelector('.small-image-above-title--title');
        if (title) {
          const titleLink = document.createElement('a');
          titleLink.href = title.href;
          titleLink.textContent = title.textContent.trim();
          const strong = document.createElement('strong');
          strong.appendChild(titleLink);
          textCell.appendChild(strong);
        }
      }
      cards.push([
        imgElem,
        textCell
      ]);
    });
  }
  if (cards.length > 0) {
    const tableRows = [headerRow, ...cards];
    const table = WebImporter.DOMUtils.createTable(tableRows, document);
    element.replaceWith(table);
  }
  // No return statement!
}
