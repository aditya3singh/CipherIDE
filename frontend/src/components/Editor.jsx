import MonacoEditor from '@monaco-editor/react';
import { FileCode } from 'lucide-react';

export default function Editor({ file, onChange }) {
  if (!file) {
    return (
      <div style={styles.empty}>
        <FileCode size={48} color="#30363d" />
        <p style={{ fontSize: '16px', fontWeight: '500' }}>Select a file to start editing</p>
        <p style={{ fontSize: '14px', color: '#6e7681' }}>Choose a file from the explorer</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.tab}>
        <FileCode size={16} color="#58a6ff" />
        {file.name}
      </div>
      <MonacoEditor
        height="calc(100% - 42px)"
        language="javascript"
        theme="vs-dark"
        value={file.content || ''}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 15,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
          fontLigatures: true,
          padding: { top: 16, bottom: 16 },
          lineHeight: 24,
          cursorBlinking: 'smooth',
          smoothScrolling: true
        }}
      />
    </div>
  );
}

const styles = {
  container: { 
    flex: 1, 
    display: 'flex', 
    flexDirection: 'column', 
    background: '#0d1117',
    minWidth: 0
  },
  tab: { 
    height: '42px', 
    display: 'flex', 
    alignItems: 'center', 
    padding: '0 20px', 
    background: '#161b22', 
    borderBottom: '1px solid #30363d', 
    fontSize: '14px', 
    color: '#e6edf3',
    fontWeight: '500',
    gap: '8px'
  },
  empty: { 
    flex: 1, 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center', 
    color: '#8b949e',
    gap: '12px',
    fontSize: '15px'
  }
};
