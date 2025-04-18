import '../../css/editors/preview.css';
import { useRef, useEffect, useState } from 'react';

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
    <html>
      <head>
        <style>html { background-color: white; }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          };

          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });

          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<HTMLIFrameElement>(null);
  const [iframeKey, setIframeKey] = useState(0);

  // Force re-mounting the iframe when the code prop changes
  useEffect(() => {
    setIframeKey(prevKey => prevKey + 1);
  }, [code]);
  // When the iframe loads, immediately post the code message.
  const handleIframeLoad = () => {
    if (iframe.current && iframe.current.contentWindow) {
      iframe.current.contentWindow.postMessage(code, '*');

      // setTimeout(() => {
      //   iframe.current && iframe.current.contentWindow && iframe.current.contentWindow.postMessage(code, '*');
      // }, 125)
    }
  };

  // Reload the iframe whenever code changes to clear previous errors.
  useEffect(() => {
    if (iframe.current) {
      iframe.current.srcdoc = html;
    }
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        key={iframeKey}
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
        onLoad={handleIframeLoad}
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
