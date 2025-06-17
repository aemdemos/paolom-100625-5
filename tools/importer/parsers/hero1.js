/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the main hero block (background image & overlay text)
  const heroBlock = element.querySelector('.large-image-text-on-image');
  let heroImage = null;
  let heroContentFragments = [];

  if (heroBlock) {
    // Background Image (2nd row)
    const img = heroBlock.querySelector('.back-picture img');
    if (img) heroImage = img;

    // Overlay Content (3rd row): heading, subheading, reading, cta
    const content = heroBlock.querySelector('.large-image-text-on-image--content');
    if (content) {
      // Title (heading)
      const title = content.querySelector('h2');
      if (title) heroContentFragments.push(title);
      // Subheading/Description (div)
      const desc = content.querySelector('.box-article-content--description');
      if (desc) heroContentFragments.push(desc);
      // Reading time (small)
      const reading = content.querySelector('.box-article-content--reading');
      if (reading) heroContentFragments.push(reading);
      // Call-to-Action (a)
      const cta = content.querySelector('a');
      if (cta) heroContentFragments.push(cta);
    }
  }

  // Build the table: header, background image, overlay content
  const cells = [
    ['Hero'],
    [heroImage],
    [heroContentFragments],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
