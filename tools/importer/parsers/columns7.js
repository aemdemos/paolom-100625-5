/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct three columns by order, not by id (to be robust)
  const cols = element.querySelectorAll(':scope > div.sf_colsIn');
  // Defensive: ensure there are 3 columns
  const col0 = cols[0] || null;
  const col1 = cols[1] || null;
  const col2 = cols[2] || null;

  // --- Column 1: Social share ---
  let col0Content = '';
  if (col0) {
    const socialShare = col0.querySelector('.social-share');
    if (socialShare) col0Content = socialShare;
  }

  // --- Column 2: Main content ---
  let col1Parts = [];
  if (col1) {
    const contentBlock = col1.querySelector('.content-block');
    if (contentBlock) col1Parts.push(contentBlock);
    const basicVideo = col1.querySelector('.basic-video');
    if (basicVideo) col1Parts.push(basicVideo);
    const relatedArticles = col1.querySelector('.related-articles-partial');
    if (relatedArticles) col1Parts.push(relatedArticles);
    const blueCircles = col1.querySelector('.blue-circles');
    if (blueCircles) col1Parts.push(blueCircles);
  }
  let col1Content = col1Parts.length > 0 ? col1Parts : '';

  // --- Column 3: Related category ---
  let col2Content = '';
  if (col2) {
    const relatedCategory = col2.querySelector('.related-category');
    if (relatedCategory) col2Content = relatedCategory;
  }

  // Header row: only one cell for header (fix!)
  const headerRow = ['Columns (columns7)'];
  // Content row: three columns
  const contentRow = [col0Content, col1Content, col2Content];
  const tableArray = [headerRow, contentRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(table);
}
