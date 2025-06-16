/* global WebImporter */
export default function parse(element, { document }) {
  // Find the FAQ accordion section inside the given element
  const faqSection = element.querySelector('section.faq');
  if (!faqSection) return;
  
  // Find all top-level FAQ entries (accordion items)
  const entries = faqSection.querySelectorAll('ul.faq--category--list > li.entry');
  const rows = [];
  // The first row is the table header
  rows.push(['Accordion (accordion14)']);
  // Each subsequent row is an accordion item, with two cells: title and content
  entries.forEach(entry => {
    // Title cell: get the button inside h3.entry--question
    const button = entry.querySelector('h3.entry--question > button.entry--unfold');
    let titleCell = '';
    if (button) {
      // Retain the button text structure (no formatting in button, so safe to use textContent)
      titleCell = button.textContent.trim();
    }
    // Content cell: preserve rich content inside .entry--answer
    let contentCell = '';
    const answerDiv = entry.querySelector('.entry--answer');
    if (answerDiv) {
      contentCell = answerDiv;
    }
    rows.push([titleCell, contentCell]);
  });
  // Use the provided utility to create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the entire FAQ section with the generated table
  faqSection.replaceWith(table);
}
