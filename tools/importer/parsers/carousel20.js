/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row per spec
  const headerRow = ['Carousel (carousel20)'];
  const rows = [headerRow];

  // Find all slides
  const content = element.querySelector('.timeline-widget--carousel .timeline-widget--content');
  const slides = content ? Array.from(content.children) : [];

  slides.forEach((slide) => {
    // Find the first image (mandatory)
    const img = slide.querySelector('img');
    const imgCell = img || '';

    // --- TEXT CELL PROCESSING ---
    // 1. Collect all text nodes in all <span style> and <strong> inside them, in order
    // 2. For each text segment in <strong>, concatenate them for heading
    // 3. If heading seems split across multiple <strong>s, join them
    // 4. The rest (non-bolded text, or text outside the <strong>) is the description below
    // 5. Output = [headingEl, descriptionEl] or just headingEl if no description

    // Gather all <strong> in order
    const strongs = Array.from(slide.querySelectorAll('strong'));
    // Also handle case where there are multiple <span> with font-size:32px
    const bigSpans = Array.from(slide.querySelectorAll('span[style*="font-size:32"]'));
    // Try to extract the main heading text from strongs, preserving order, including split text
    let headingText = '';
    // If strongs are present, build heading from their textContent
    if (strongs.length) {
      headingText = strongs.map(s => s.textContent).join('').replace(/\s+/g, ' ').trim();
    } else if (bigSpans.length) {
      // If no <strong>, try to use big font span
      headingText = bigSpans.map(s => s.textContent).join(' ').replace(/\s+/g, ' ').trim();
    }
    
    // Extract the description: text content in the slide except what is in the heading
    // Best: Remove all <strong> from a clone, take the left over text as description
    const slideClone = slide.cloneNode(true);
    Array.from(slideClone.querySelectorAll('strong')).forEach(s => s.remove());
    // Remove all images from clone
    Array.from(slideClone.querySelectorAll('img')).forEach(i => i.remove());
    // Remove empty tags (spans, ems, brs, p's), but keep non-empty paragraphs
    Array.from(slideClone.querySelectorAll('span, em, br')).forEach(n => {
      if (!n.textContent.trim()) n.remove();
    });
    // Clean up whitespace
    let descriptionText = slideClone.textContent.replace(/\s+/g, ' ').trim();
    // Remove description if it's just a copy of the headingText
    if (headingText && descriptionText && headingText === descriptionText) descriptionText = '';
    // Some slides have heading split across strong and normal text. If descriptionText starts with headingText, remove it
    if (headingText && descriptionText && descriptionText.startsWith(headingText)) {
      descriptionText = descriptionText.slice(headingText.length).trim();
    }
    // Remove empty
    if (!descriptionText) descriptionText = '';

    // Compose the text cell
    let textCell;
    if (headingText) {
      const h2 = document.createElement('h2');
      h2.textContent = headingText;
      if (descriptionText) {
        const desc = document.createElement('p');
        desc.textContent = descriptionText;
        textCell = [h2, desc];
      } else {
        textCell = h2;
      }
    } else if (descriptionText) {
      // No heading, only description
      const desc = document.createElement('p');
      desc.textContent = descriptionText;
      textCell = desc;
    } else {
      textCell = '';
    }
    rows.push([imgCell, textCell]);
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
