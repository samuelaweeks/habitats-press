export function renderPortableText(blocks) {
  if (!blocks) return "";

  try {
    return blocks
      .map((block) => {
        const { style = "normal", children = [], markDefs = [] } = block;
        const text = children
          .map((child) => {
            let content = child.text;
            if (child.marks && child.marks.length > 0) {
              child.marks.forEach((markKey) => {
                // Find link definition if it exists
                const linkDef = markDefs.find((def) => def._key === markKey);
                if (linkDef && linkDef._type === "link") {
                  content = `<a href="${linkDef.href}" target="_blank" rel="noopener noreferrer">${content}</a>`;
                } else {
                  // Handle regular marks
                  switch (markKey) {
                    case "strong":
                      content = `<strong>${content}</strong>`;
                      break;
                    case "em":
                      content = `<em>${content}</em>`;
                      break;
                  }
                }
              });
            }
            return content;
          })
          .join("");

        // Handle different block styles
        switch (style) {
          case "h1":
            return `<h1>${text}</h1>`;
          case "h2":
            return `<h2>${text}</h2>`;
          case "h3":
            return `<h3>${text}</h3>`;
          case "h4":
            return `<h4>${text}</h4>`;
          default:
            return `<p>${text}</p>`;
        }
      })
      .join("");
  } catch (error) {
    console.error("Error rendering portable text:", error);
    return "";
  }
}
