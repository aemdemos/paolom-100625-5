/* global WebImporter */
export default function parse(element, { document }) {
  // The search block consists of a table with header and a row with the search query index URL
  // The header must be exactly 'Search (search3)'
  // The second row must contain the absolute query index URL as both textContent and href

  // There is no Section Metadata block in the example, so do not create one
  // The query index URL is not present in the HTML, so we must use the example's URL
  // If in the future you want to extract a real query index from HTML, hook the extraction here
  const headerRow = ['Search (search3)'];
  const url = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  // Create a link element to match the example markdown rendering
  const link = document.createElement('a');
  link.href = url;
  link.textContent = url;
  // Build the table structure
  const rows = [
    headerRow,
    [link],
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
