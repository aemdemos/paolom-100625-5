/* global WebImporter */
export default function parse(element, { document }) {
  // Find the related-articles section
  const relatedSection = element.querySelector('section.related-articles-partial');
  if (!relatedSection) return;

  // Get all cards in the related articles section
  const cardNodes = relatedSection.querySelectorAll('.small-image-above-title');
  const rows = [['Cards (cards31)']]; // header row

  cardNodes.forEach(card => {
    // image (mandatory)
    let image = null;
    const imgContainer = card.querySelector('.back-picture');
    if (imgContainer) {
      const img = imgContainer.querySelector('img');
      if (img) {
        // Ensure the src is set
        if (img.hasAttribute('data-src')) {
          img.src = img.getAttribute('data-src');
        }
        image = img;
      }
    }

    // text content (mandatory): Title (optional, but always present in this layout)
    const textContainer = card.querySelector('.small-image-above-title--content');
    let textContent = [];
    if (textContainer) {
      // The title is a link, include it as element
      const titleLink = textContainer.querySelector('.small-image-above-title--title');
      if (titleLink) {
        textContent.push(titleLink);
      }
    }
    rows.push([image, textContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  relatedSection.replaceWith(table);
}
