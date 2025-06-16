/* global WebImporter */
export default function parse(element, { document }) {
  // Find the center/main column containing the card content
  const contentSlot = element.querySelector('.column-content-slot');
  if (!contentSlot) return;

  // The main article content is inside the '.wysiwyg' div
  const wysiwyg = contentSlot.querySelector('.wysiwyg');
  if (!wysiwyg) return;

  // Collect all children (could be paragraphs or h2s)
  const children = Array.from(wysiwyg.children);
  const cards = [];
  let currentCard = [];
  let beforeFirstH2 = true;

  children.forEach((node) => {
    if (node.tagName === 'H2') {
      // Push the previous card if it has content
      if (currentCard.length > 0) {
        cards.push(currentCard);
        currentCard = [];
      }
      currentCard.push(node);
      beforeFirstH2 = false;
    } else if (node.tagName === 'P') {
      currentCard.push(node);
    } else {
      // If it's another element type, ignore for this block type
    }
  });
  // Don't forget the last card
  if (currentCard.length > 0) {
    cards.push(currentCard);
  }

  // Build cells for the table
  const cells = [];
  // Header row as in the markdown structure
  cells.push(['Cards (cardsNoImages15)']);
  // Each card is a single cell containing its elements (header, description, etc.)
  cards.forEach((cardEls) => {
    // Remove empty paragraphs
    const filtered = cardEls.filter(n => {
      return !(n.tagName === 'P' && n.textContent.trim() === '');
    });
    if (filtered.length > 0) {
      cells.push([filtered]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
