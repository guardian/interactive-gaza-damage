export function rectRelativeToElement(rect, element) {
    const boundingRect = element.getBoundingClientRect();

    return {
        x: rect.x - boundingRect.x,
        y: rect.y - boundingRect.y,
        width: rect.width,
        height: rect.height,
    }
}

export function clipPathForBounds(bounds) {
    const minX = Math.round(bounds.x);
    const minY = Math.round(bounds.y);
    const maxX = Math.round(bounds.x + bounds.width);
    const maxY = Math.round(bounds.y + bounds.height);

    return `0% 0%, 0% 100%, ${minX}px 100%, ${minX}px ${minY}px, ${maxX}px ${minY}px, ${maxX}px ${maxY}px, ${minX}px ${maxY}px, ${minX}px 100%, 100% 100%, 100% 0%`
}