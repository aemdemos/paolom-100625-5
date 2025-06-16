/* global WebImporter */
export default function parse(element, { document }) {
  // Find the search query index URL if present in the element, otherwise use default as fallback
  // This block is usually purely presentational (search input), but expects the query-index.json URL
  // There is no such index URL in the sample HTML — so we must use the sample absolute URL from the component guidance

  // If a query index URL can be found in the HTML, use it
  let url = null;
  // Try to find a JSON file reference in links, scripts, or anchor tags
  const anchors = element.querySelectorAll('a, link');
  for (const a of anchors) {
    if (a.href && a.href.match(/query-index\.json$/)) {
      url = a.href;
      break;
    }
  }

  // Try to find a data-query-index attribute or similar
  if (!url) {
    const queryIndexElem = element.querySelector('[data-query-index], [data-search-index], [data-index-url]');
    if (queryIndexElem) {
      url = queryIndexElem.getAttribute('data-query-index')
        || queryIndexElem.getAttribute('data-search-index')
        || queryIndexElem.getAttribute('data-index-url');
    }
  }

  // Fallback: Use the documented sample index URL
  if (!url) {
    url = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  }

  const headerRow = ['Search (search4)'];
  const rows = [headerRow, [url]];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}