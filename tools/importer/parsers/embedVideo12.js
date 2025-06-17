/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .basic-video block, which contains the embed info
  const videoBlock = element.querySelector('.basic-video');
  let videoUrl = '';
  let imgEl = null;

  if (videoBlock) {
    // Try to get YouTube video ID and assemble full URL
    const videoId = videoBlock.getAttribute('data-id');
    if (videoId) {
      videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    }
    // Try to get poster/cover image from image inside .basic-video--img-container
    const imgContainer = videoBlock.querySelector('.basic-video--img-container');
    if (imgContainer) {
      const candidateImg = imgContainer.querySelector('img');
      if (candidateImg) {
        imgEl = candidateImg;
      }
    }
  }

  // Fallback: If not found, return and do not replace
  if (!videoUrl) return;

  // Compose the cell array for the embed block: image on top, link below (if both present)
  const cellContent = [];
  if (imgEl) cellContent.push(imgEl);
  // Always show the URL as a clickable link
  const a = document.createElement('a');
  a.href = videoUrl;
  a.textContent = videoUrl;
  cellContent.push(a);

  // Table header should be exactly 'Embed (embedVideo12)'
  const table = WebImporter.DOMUtils.createTable([
    ['Embed (embedVideo12)'],
    [cellContent.length === 1 ? cellContent[0] : cellContent]
  ], document);

  element.replaceWith(table);
}
