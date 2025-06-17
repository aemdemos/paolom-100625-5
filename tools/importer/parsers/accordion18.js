/* global WebImporter */
export default function parse(element, { document }) {
  // Find the relevant FAQ/accordion section inside the main element
  const faqSection = element.querySelector('section.faq');
  if (!faqSection) return;
  // Find all accordion items (entries)
  const entries = faqSection.querySelectorAll('.faq--category--list > .entry');
  if (!entries.length) return;
  // Accordion block header row
  const rows = [['Accordion (accordion18)']];
  // For each entry, add a row with two cells: question (button text), answer (content)
  entries.forEach(entry => {
    // Find the question button
    const btn = entry.querySelector('.entry--question button');
    // Use the button as the title cell - reference the button directly to keep formatting
    let titleCell = '';
    if (btn) {
      // We'll wrap the button text in a <p> for best block display, preserving any formatting
      const p = document.createElement('p');
      p.textContent = btn.textContent.trim();
      titleCell = p;
    }
    // Content cell: use everything inside .entry--answer .entry--description
    let contentCell = '';
    const desc = entry.querySelector('.entry--answer .entry--description');
    if (desc) {
      // If there are multiple paragraphs, include all
      contentCell = Array.from(desc.childNodes);
    }
    rows.push([titleCell, contentCell]);
  });
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the accordion section with the block table (replace the entire section for accuracy)
  faqSection.replaceWith(table);
}
