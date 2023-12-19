export function wrapText(text, textElement, maxWidth) {
    const words = text.split(/\s+/).reverse();
    const lines = [];
    let line = [],
        word;

    while (word = words.pop()) {
        line.push(word);
        textElement.textContent = line.join(" ");
        if (line.length > 1 && textElement.getComputedTextLength() > maxWidth) {
            line.pop();
            lines.push(line.join(" "));
            line = [word];
        }
    }
    
    if (line.length) {
        lines.push(line.join(" "));
    }

    return lines;
}