/* global WebImporter */
export default function parse(element, { document }) {
  // Find YouTube video link in the .content-block (watch full panel...)
  let videoUrl = '';
  let foundLink = null;
  const contentBlocks = element.querySelectorAll('.content-block');
  for (const block of contentBlocks) {
    const a = block.querySelector('a[href*="youtube.com/watch"]');
    if (a) {
      foundLink = a;
      videoUrl = a.href;
      break;
    }
  }

  // Find the poster image for the video
  let imageEl = null;
  const basicVideo = element.querySelector('.basic-video');
  if (basicVideo) {
    const img = basicVideo.querySelector('img');
    if (img) {
      imageEl = img;
    }
  }

  // Prepare the cell contents
  const cellContents = [];
  if (imageEl) cellContents.push(imageEl);
  if (videoUrl) {
    // Use a real <a> element, not just the URL as text
    const link = document.createElement('a');
    link.href = videoUrl;
    link.textContent = videoUrl;
    cellContents.push(link);
  }

  // If no video found, fallback to an empty block with correct structure
  const cells = [
    ['Embed (embedVideo9)'],
    [cellContents.length > 0 ? cellContents : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
