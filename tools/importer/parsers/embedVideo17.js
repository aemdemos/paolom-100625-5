/* global WebImporter */
export default function parse(element, { document }) {
  // Find the video block
  const videoBlock = element.querySelector('.basic-video');
  if (!videoBlock) return;

  // Find the image inside the video block
  const img = videoBlock.querySelector('.basic-video--img-container img');

  // Extract YouTube video ID from data-id
  const videoId = videoBlock.getAttribute('data-id');
  let videoUrl = '';
  if (videoId) {
    videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  }

  // Prepare the cell content for the embed table
  const cellContent = [];
  if (img) cellContent.push(img);
  if (videoUrl) {
    // Add a line break only if both image and link exist
    if (img) cellContent.push(document.createElement('br'));
    const a = document.createElement('a');
    a.href = videoUrl;
    a.textContent = videoUrl;
    cellContent.push(a);
  }

  // Compose the block table
  const cells = [
    ['Embed (embedVideo17)'],
    [cellContent],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original video block with the table
  videoBlock.replaceWith(table);
}
