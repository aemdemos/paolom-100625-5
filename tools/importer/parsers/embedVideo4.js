/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main video block within the provided element
  const videoBlock = element.querySelector('.basic-video');
  if (!videoBlock) return;

  // Find the YouTube video ID
  const playerDiv = videoBlock.querySelector('.player');
  const videoId = playerDiv && playerDiv.getAttribute('data-plyr-embed-id');
  let videoUrl = '';
  if (videoId) {
    videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  }

  // Get the video poster image (referencing the actual <img> element in the DOM)
  let img = null;
  const imgContainer = videoBlock.querySelector('.basic-video--img-container .back-picture img');
  if (imgContainer) {
    img = imgContainer;
  }

  // Compose the cell content as an array: image (if present), then link
  const cellContent = [];
  if (img) cellContent.push(img);
  if (videoUrl) {
    const a = document.createElement('a');
    a.href = videoUrl;
    a.textContent = videoUrl;
    cellContent.push(a);
  }

  // Only build the table if we have at least the video URL
  if (!videoUrl) return;
  const cells = [
    ['Embed (embedVideo4)'],
    [cellContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}