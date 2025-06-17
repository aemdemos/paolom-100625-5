/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <a> (embed URL)
  const link = element.querySelector('a[href]');
  let videoUrl = '';
  if (link) {
    videoUrl = link.getAttribute('href');
  }
  // Find the <picture> (poster image)
  const picture = element.querySelector('picture');
  let imgEl = null;
  if (picture) {
    imgEl = picture.querySelector('img');
  }

  // Compose the block cell: image above link (if present)
  const cellContent = [];
  if (imgEl) cellContent.push(imgEl);
  if (videoUrl) {
    const urlEl = document.createElement('a');
    urlEl.href = videoUrl;
    urlEl.textContent = videoUrl;
    if (imgEl) cellContent.push(document.createElement('br'));
    cellContent.push(urlEl);
  }

  const cells = [
    ['Embed (embedVideo6)'],
    [cellContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}