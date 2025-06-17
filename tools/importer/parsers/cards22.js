/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards22)'];
  const rows = [];
  const cards = element.querySelectorAll('.small-image-above-title');
  cards.forEach(card => {
    // IMAGE cell: reference the <img> element only
    let imageCell = '';
    const pictureLink = card.querySelector('a.small-image-above-title--picture');
    if (pictureLink) {
      const image = pictureLink.querySelector('img');
      if (image) imageCell = image;
    }
    // TEXT cell: build a fragment with heading, description, and CTA
    const frag = document.createDocumentFragment();
    const titleA = card.querySelector('.small-image-above-title--title');
    if (titleA) {
      const h = document.createElement('h3');
      h.textContent = titleA.textContent.trim();
      frag.appendChild(h);
    }
    // Description (must appear between title and CTA)
    const descP = card.querySelector('.small-image-above-title--link p');
    if (descP) {
      // Use a new p to avoid accidental DOM removal
      const p = document.createElement('p');
      p.textContent = descP.textContent.trim();
      frag.appendChild(p);
    }
    // CTA
    const ctaA = card.querySelector('.arrowed-link');
    if (ctaA) {
      const a = document.createElement('a');
      a.href = ctaA.href;
      a.textContent = ctaA.textContent.trim();
      frag.appendChild(a);
    }
    rows.push([imageCell, frag]);
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
