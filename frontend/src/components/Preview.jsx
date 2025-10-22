import { Monitor, RefreshCw } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function Preview({ files }) {
  const [key, setKey] = useState(0);

  const appCode = useMemo(() => {
    let code = '';
    
    files.forEach(file => {
      if (file.type === 'file' && file.name === 'App.js' && file.content) {
        code = file.content;
      }
    });

    console.log('App.js content found:', !!code);
    return code;
  }, [files]);

  const htmlContent = useMemo(() => {
    if (!appCode) return '';

    // Transform the code to work in browser
    const transformedCode = appCode.replace('export default function App()', 'function App()');

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    }
    #root {
      width: 100%;
      min-height: 100vh;
    }
    .error-container {
      padding: 40px;
      color: #d73a49;
      font-family: monospace;
      background: #fff;
    }
    .error-pre {
      background: #f6f8fa;
      padding: 16px;
      border-radius: 6px;
      overflow: auto;
      border: 1px solid #e1e4e8;
      margin-top: 12px;
    }
  </style>
</head>
<body>
  <div id="root">
    <div style="padding: 40px; text-align: center; color: #666;">
      <div style="font-size: 18px;">Loading...</div>
    </div>
  </div>
  <script type="text/babel">
    try {
      ${transformedCode}
      
      if (typeof App === 'function') {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
      } else {
        throw new Error('App component not found or not a function');
      }
    } catch (error) {
      console.error('Preview Error:', error);
      document.getElementById('root').innerHTML = \`
        <div class="error-container">
          <h2>⚠️ Preview Error</h2>
          <div style="margin: 16px 0; font-family: system-ui;">
            There was an error rendering your React component:
          </div>
          <pre class="error-pre">\${error.message}</pre>
          <div style="margin-top: 16px; font-size: 14px; color: #666; font-family: system-ui;">
            Check your code syntax and try again.
          </div>
        </div>
      \`;
    }
  </script>
</body>
</html>`;
  }, [appCode]);

  if (!appCode) {
    return (
      <div style={styles.empty}>
        <Monitor size={48} color="#30363d" />
        <p style={{ fontSize: '16px', fontWeight: '500' }}>No App.js file found</p>
        <p style={{ fontSize: '14px', color: '#6e7681' }}>Create an App.js file to see preview</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Monitor size={16} color="#58a6ff" />
        <span>Live Preview</span>
        <button 
          onClick={() => setKey(k => k + 1)}
          style={styles.refreshBtn}
          title="Refresh Preview"
        >
          <RefreshCw size={14} />
          <span>Refresh</span>
        </button>
      </div>
      <div style={styles.previewWrapper}>
        <iframe
          key={key}
          srcDoc={htmlContent}
          style={styles.iframe}
          title="preview"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
}

function getFilePath(file, allFiles) {
  const parts = [file.name];
  let current = file;
  
  while (current.parentId) {
    current = allFiles.find(f => f._id === current.parentId);
    if (current && current.name) parts.unshift(current.name);
  }
  
  // Remove the root project folder name and keep the rest
  // e.g., ["ProjectName", "src", "App.js"] -> "/App.js"
  const pathParts = parts.slice(1); // Remove root folder
  
  // If file is directly in src folder, put it in root for Sandpack
  if (pathParts.length === 2 && pathParts[0] === 'src') {
    return '/' + pathParts[1];
  }
  
  return '/' + pathParts.join('/');
}

const styles = {
  container: { 
    width: '100%',
    height: '100%',
    background: '#0d1117',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    background: '#161b22',
    borderBottom: '1px solid #30363d',
    fontSize: '14px',
    color: '#e6edf3',
    fontWeight: '500',
    gap: '8px',
    flexShrink: 0
  },
  refreshBtn: {
    marginLeft: 'auto',
    padding: '6px 12px',
    background: '#238636',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'all 0.2s'
  },
  previewWrapper: {
    flex: 1,
    overflow: 'auto',
    background: '#ffffff',
    position: 'relative'
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
    background: 'white'
  },
  empty: { 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center', 
    height: '100%', 
    color: '#8b949e',
    gap: '12px',
    fontSize: '15px'
  }
};
