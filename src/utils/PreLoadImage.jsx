export function preloadImages(imageUrls = []) {
    const promises = imageUrls.map(src => new Promise(resolve => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve;
    }));
    return Promise.all(promises);
}
