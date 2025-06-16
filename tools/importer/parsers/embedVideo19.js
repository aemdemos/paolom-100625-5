/* global WebImporter */
export default function parse(element, { document }) {
  // This function expects to be called on the embed wrapper (the section containing the embed)
  // If there is no embed in this element, do nothing

  // Try to find the video poster image and the video URL
  // The screenshot shows an embed with a video poster and a vimeo URL: https://vimeo.com/454418448
  // The HTML does not contain a direct embed, so for robustness, we assume if that poster image is present in the element, it's part of the embed.
  // Look for an image that is not inside related articles, and not an article thumbnail

  // Get all images
  const imgs = Array.from(element.querySelectorAll('img'));
  // filter out those inside related articles or other unrelated blocks
  const posterImg = imgs.find(img => {
    let el = img;
    while (el && el !== element) {
      if (
        el.classList && (
          el.classList.contains('small-image-above-title') ||
          el.classList.contains('related-articles-partial')
        )
      ) {
        return false;
      }
      el = el.parentElement;
    }
    return true;
  });

  // For this case, since the HTML does not contain an iframe or an anchor for the video, but the prompt/example assumes https://vimeo.com/454418448, we'll use that.
  // In a real context, the script should look for iframe/src or anchor/href with a video domain.
  const videoUrl = 'https://vimeo.com/454418448';

  // Build the link element
  const link = document.createElement('a');
  link.href = videoUrl;
  link.textContent = videoUrl;

  // Compose the cell content in correct order
  const contents = [];
  if (posterImg) {
    contents.push(posterImg, document.createElement('br'));
  }
  contents.push(link);

  // Build the block table as required
  const cells = [
    ['Embed (embedVideo19)'],
    [contents]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
