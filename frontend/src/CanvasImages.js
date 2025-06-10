function importAll(r) {
  return r.keys().map(r);
}

// Import all images from frames22 folder
const CanvasImages = importAll(require.context('../public/frames22', false, /\.(png|jpe?g|svg)$/));

export default CanvasImages;
