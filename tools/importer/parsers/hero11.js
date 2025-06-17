/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the background image (main right-side image)
  const bgImg = element.querySelector('.blog-intro--picture img.still-picture');

  // Extract the logo (STOP ILLEGAL)
  const logoImg = element.querySelector('.blog-intro--content .logo-disc img.still-picture');

  // Extract title (h1)
  const title = element.querySelector('.blog-intro--content .blog-intro--title');

  // Extract the date
  const date = element.querySelector('.blog-intro--content .blog-intro--date');

  // Compose background cell: must include logo and background image
  const backgroundCell = [];
  if (bgImg) backgroundCell.push(bgImg);
  if (logoImg) backgroundCell.push(logoImg);

  // Compose content cell: title and date
  const contentCell = [];
  if (title) contentCell.push(title);
  if (date) contentCell.push(date);

  // Compose cells: header, background, content
  const cells = [
    ['Hero'],
    [backgroundCell],
    [contentCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
