/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the first img (background image)
  function getFirstImg(container) {
    if (!container) return '';
    let img = container.querySelector('img');
    return img || '';
  }

  // Get the main block with prominent image and text
  const largeBlock = element.querySelector('.large-image-text-on-image');

  // Row 2: Background Image (optional)
  let bgImg = '';
  if (largeBlock) {
    const backPictureDiv = largeBlock.querySelector('.back-picture');
    bgImg = getFirstImg(backPictureDiv);
  }

  // Row 3: Title, description, CTA
  let contentEls = [];
  if (largeBlock) {
    const contentDiv = largeBlock.querySelector('.large-image-text-on-image--content');
    if (contentDiv) {
      // Find the main title
      const title = contentDiv.querySelector('.box-article-content--title');
      if (title && title.textContent.trim()) {
        // Make it a heading (h1) to match semantic meaning and example
        const h1 = document.createElement('h1');
        h1.textContent = title.textContent.trim();
        contentEls.push(h1);
      }
      // Find description
      const desc = contentDiv.querySelector('.box-article-content--description');
      if (desc && desc.textContent.trim()) {
        const p = document.createElement('p');
        p.textContent = desc.textContent.trim();
        contentEls.push(p);
      }
      // Find CTA link
      const link = contentDiv.querySelector('.box-article-content--link');
      if (link && link.textContent.trim()) {
        // Use the actual anchor from the DOM (don't clone or recreate)
        contentEls.push(link);
      }
    }
  }

  // Build the block table according to the markdown example
  // Header must match: 'Hero'
  const cells = [
    ['Hero'],
    [bgImg],
    [contentEls.length > 0 ? contentEls : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
