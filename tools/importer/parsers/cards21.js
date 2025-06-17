/* global WebImporter */
export default function parse(element, { document }) {
  const NodeType = document.defaultView.Node;

  function getCardImage(cardRoot) {
    const picture = cardRoot.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) return img;
    }
    const img = cardRoot.querySelector('img');
    if (img) return img;
    return '';
  }

  function getCardHeading(textBlock) {
    const h2 = textBlock.querySelector('h2');
    if (h2) return h2;
    return null;
  }

  function getCardLink(textBlock) {
    const a = textBlock.querySelector('a[href]');
    if (a) return a;
    return null;
  }

  function getCardDescription(textBlock, heading, link) {
    const nodes = Array.from(textBlock.childNodes);
    let startIdx = 0;
    let endIdx = nodes.length;
    if (heading) {
      const idx = nodes.indexOf(heading);
      if (idx !== -1) startIdx = idx + 1;
    }
    if (link) {
      const idx = nodes.indexOf(link);
      if (idx !== -1) endIdx = idx;
    }
    // Filter and wrap text nodes as <span> for DOM insertion
    return nodes.slice(startIdx, endIdx).filter((n) => {
      if (n.nodeType === NodeType.TEXT_NODE) {
        return n.textContent.trim().length > 0;
      }
      if (n.nodeType === NodeType.ELEMENT_NODE) {
        if (n.tagName === 'BR') return false;
        if (n.textContent.trim().length === 0) return false;
        return true;
      }
      return false;
    }).map((n) => {
      if (n.nodeType === NodeType.TEXT_NODE) {
        const span = document.createElement('span');
        span.textContent = n.textContent;
        return span;
      }
      return n;
    });
  }

  // Build table header: exactly one column
  const headerRow = ['Cards (cards21)'];
  const rows = [headerRow];

  // Card element roots: direct children section > div
  const cardContainers = Array.from(element.querySelectorAll(':scope > div'));

  cardContainers.forEach(cardContainer => {
    let cardBlock = cardContainer.querySelector('.large-image-text-on-image, .sustainability');
    if (!cardBlock) return;
    const image = getCardImage(cardBlock);
    let textBlock = cardBlock.querySelector('.large-image-text-on-image--content, .sustainability--content');
    if (!textBlock) return;
    const heading = getCardHeading(textBlock);
    const link = getCardLink(textBlock);
    const descNodes = getCardDescription(textBlock, heading, link);
    // Compose a single flat array for the cell
    const cellContent = [];
    if (image) cellContent.push(image);
    if (heading) cellContent.push(heading);
    if (descNodes.length > 0) cellContent.push(...descNodes);
    if (link) cellContent.push(link);
    rows.push([cellContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
