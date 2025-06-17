/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main podcast video block
  const videoBlock = element.querySelector('.basic-video');
  if (!videoBlock) return;

  // Get the video URL (from data-video-url or <video> src)
  let videoUrl = '';
  if (videoBlock.dataset && videoBlock.dataset.videoUrl) {
    videoUrl = videoBlock.dataset.videoUrl;
  } else {
    const videoEl = videoBlock.querySelector('video');
    if (videoEl && videoEl.src) {
      videoUrl = videoEl.src;
    }
  }
  if (!videoUrl) return;

  // Find the image poster: inside .back-picture.has-gradient img
  let posterImg = null;
  const imgCont = videoBlock.querySelector('.back-picture.has-gradient img');
  if (imgCont) {
    posterImg = imgCont;
  }

  // Create a link element referencing the video URL
  const link = document.createElement('a');
  link.href = videoUrl;
  link.textContent = videoUrl;
  link.target = '_blank';

  // Cell content: image above the link (if available)
  const cellContent = posterImg ? [posterImg, link] : [link];

  // Build and insert the table
  const table = WebImporter.DOMUtils.createTable([
    ['Embed (embedVideo8)'],
    [cellContent]
  ], document);

  videoBlock.replaceWith(table);
}
