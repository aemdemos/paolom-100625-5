/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row exactly as specified
  const headerRow = ['Cards (cardsNoImages13)'];

  // Get all immediate child column wrappers for each card
  const cardColumns = Array.from(element.querySelectorAll(':scope > div'));

  // Prepare a row for each card
  const rows = cardColumns.map((col) => {
    // Find the actual card container
    const card = col.querySelector('.sustainability');
    if (!card) return [''];
    const content = card.querySelector('.sustainability--content');
    if (!content) return [''];
    const rowContent = [];

    // Extract heading (could be h2 or other)
    const heading = content.querySelector('.sustainability--title');
    if (heading) rowContent.push(heading);

    // Extract CTA link if present
    const cta = content.querySelector('a');
    if (cta) {
      // Add a line break if there's a heading and a link
      if (heading) rowContent.push(document.createElement('br'));
      rowContent.push(cta);
    }

    return [rowContent];
  });

  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
  element.replaceWith(table);
}
