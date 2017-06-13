export function createIframe(onIframeLoad) {
  var iframe = document.createElement('iframe');
  iframe.class = 'react-playground-preview-iframe';
  iframe.src = 'about:blank';
  iframe.style.border = 'none';
  iframe.style.zIndex = 2147483647;
  iframe.style.margin = 0;
  iframe.style.padding = 0;
  iframe.style.width = '98%';
  iframe.onload = onIframeLoad;
  return iframe;
}


export function addPreviewDiv(iframe) {
  var outerDiv = iframe.contentDocument.createElement('div');
  outerDiv.class = 'react-playground-preview-box';
  outerDiv.style.width = '100%';
  outerDiv.style.height = '100%';
  outerDiv.style.boxSizing = 'border-box';
  outerDiv.style.position = 'relative';
  outerDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
  outerDiv.style.padding = '12px';
  outerDiv.style.borderRadius = '8px';
  outerDiv.style.color = '#EEE';


  var div = iframe.contentDocument.createElement('div');
  div.style.position = 'relative';
  div.style.display = 'block';

  outerDiv.appendChild(div);
  iframe.contentDocument.body.appendChild(outerDiv);
  return div;
}