/* global WebImporter */
export default function parse(element, { document }) {
  // Block header
  const cells = [['Cards (cards18)']];

  // Card column selectors in DOM order
  const colSelectors = [
    '.V3-Homepage-Header-V2--big',
    '.V3-Homepage-Header-V2--small1',
    '.V3-Homepage-Header-V2--small2',
    '.V3-Homepage-Header-V2--medium',
  ];

  for (const sel of colSelectors) {
    const col = element.querySelector(sel);
    if (!col) continue;

    // Card image: always inside .back-picture as <picture> or <img>
    let image = null;
    const backPic = col.querySelector('.back-picture');
    if (backPic) {
      const pic = backPic.querySelector('picture');
      if (pic) {
        image = pic;
      } else {
        const img = backPic.querySelector('img');
        if (img) image = img;
      }
    }

    // Card content: depends on card type
    let content = null;
    if (sel === '.V3-Homepage-Header-V2--big') {
      // Main card: h2, link
      const contentDiv = col.querySelector('.large-image-text-on-image--content');
      if (contentDiv) {
        // Reference the existing content div directly
        content = contentDiv;
      }
    } else if (sel === '.V3-Homepage-Header-V2--small1' || sel === '.V3-Homepage-Header-V2--small2') {
      // Secondary cards: h2, link
      const contentDiv = col.querySelector('.sustainability--content');
      if (contentDiv) {
        content = contentDiv;
      }
    } else if (sel === '.V3-Homepage-Header-V2--medium') {
      // Author card: Avatar, title, written by, name
      const cardLink = col.querySelector('a.small-written-by');
      if (cardLink) {
        // Image: avatar
        let avatar = null;
        const avatarDiv = cardLink.querySelector('.written-by--avatar .back-picture');
        if (avatarDiv) {
          const img = avatarDiv.querySelector('img');
          if (img) avatar = img;
        }
        // Content: reference the entire cardLink for all text including h3, written-by, name
        content = document.createElement('div');
        const title = cardLink.querySelector('h3');
        if (title) content.appendChild(title);
        const credits = cardLink.querySelector('.written-by--credits');
        if (credits) content.appendChild(credits);
        image = avatar;
      }
    }

    // Only add a row when both image and content are found
    if (image && content) {
      cells.push([image, content]);
    }
  }

  // Construct and replace block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
