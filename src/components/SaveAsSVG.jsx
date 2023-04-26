const saveNetworkAsSvg = (svgElement, filename) =>  {
  // Convert the SVG element to a string
  const svgString = new XMLSerializer().serializeToString(svgElement);

  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  link.click();
}

export default saveNetworkAsSvg
