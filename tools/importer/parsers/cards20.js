/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per spec
  const headerRow = ['Cards (cards20)'];
  const rows = [headerRow];
  // Select all card containers
  const cardDivs = element.querySelectorAll(':scope > div.small-image-above-title');
  cardDivs.forEach(card => {
    // Image: first .back-picture img inside .small-image-above-title--picture
    const img = card.querySelector('.small-image-above-title--picture .back-picture img');
    // Prepare text cell array
    const textArr = [];
    const content = card.querySelector('.small-image-above-title--content');
    if (content) {
      // Title
      const titleLink = content.querySelector('.small-image-above-title--title');
      if (titleLink && titleLink.textContent.trim()) {
        const heading = document.createElement('h3');
        heading.textContent = titleLink.textContent.trim();
        textArr.push(heading);
      }
      // Description (from p.small-image-above-title--description)
      const desc = content.querySelector('.small-image-above-title--description');
      if (desc && desc.textContent.trim()) {
        // Use the actual <p> element
        textArr.push(desc);
      }
      // CTA: use the "Read more" arrowed-link if present
      const cta = content.querySelector('a.arrowed-link');
      if (cta && cta.textContent.trim()) {
        // Reference the original a element
        textArr.push(cta);
      }
    }
    rows.push([
      img || '',
      textArr.length ? textArr : ''
    ]);
  });
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
