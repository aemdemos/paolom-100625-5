/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main video embed block in the content.
  // We want the poster image (img inside .basic-video--img-container) and the youtube URL.
  const videoSection = element.querySelector('.basic-video');
  if (!videoSection) return;

  // Find the poster image
  let img = null;
  const imgContainer = videoSection.querySelector('.basic-video--img-container img');
  if (imgContainer) {
    img = imgContainer;
  }

  // Find the YouTube embed id
  let videoUrl = null;
  const playerDiv = videoSection.querySelector('.player[data-plyr-provider="youtube"]');
  if (playerDiv && playerDiv.dataset.plyrEmbedId) {
    videoUrl = `https://www.youtube.com/watch?v=${playerDiv.dataset.plyrEmbedId}`;
  }

  // Fallback: If not found, skip.
  if (!videoUrl) return;

  // Build cell content: image (if any), then URL link
  const linkEl = document.createElement('a');
  linkEl.href = videoUrl;
  linkEl.textContent = videoUrl;

  // Only put <br> if image and link are both present
  const cellContent = img ? [img, document.createElement('br'), linkEl] : [linkEl];

  const table = WebImporter.DOMUtils.createTable([
    ['Embed (embedVideo6)'],
    [cellContent],
  ], document);

  videoSection.replaceWith(table);
}
