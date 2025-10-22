import { Folder, File, Plus, Trash2 } from 'lucide-react';

export default function FileExplorer({ files, onSelectFile, selectedFile, onCreateFile, onDeleteFile }) {
  const buildTree = (files) => {
    const map = {};
    const roots = [];
    
    files.forEach(file => {
      map[file._id] = { ...file, children: [] };
    });
    
    files.forEach(file => {
      if (file.parentId) {
        map[file.parentId]?.children.push(map[file._id]);
      } else {
        roots.push(map[file._id]);
      }
    });
    
    return roots;
  };

  const renderTree = (nodes, depth = 0) => {
    return nodes.map(node => (
      <div key={node._id}>
        <div
          style={{
            ...styles.item,
            paddingLeft: `${depth * 16 + 12}px`,
            background: selectedFile?._id === node._id ? '#1f6feb' : 'transparent',
            color: selectedFile?._id === node._id ? '#ffffff' : '#e6edf3'
          }}
          onClick={() => node.type === 'file' && onSelectFile(node)}
          onMouseEnter={(e) => {
            if (selectedFile?._id !== node._id) {
              e.currentTarget.style.background = '#21262d';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedFile?._id !== node._id) {
              e.currentTarget.style.background = 'transparent';
            }
          }}
        >
          {node.type === 'folder' ? (
            <Folder size={16} color="#58a6ff" />
          ) : (
            <File size={16} color={selectedFile?._id === node._id ? '#ffffff' : '#8b949e'} />
          )}
          <span style={styles.name}>{node.name}</span>
          {node.type === 'folder' && (
            <Plus
              size={14}
              style={styles.icon}
              onClick={(e) => {
                e.stopPropagation();
                onCreateFile(node._id);
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
            />
          )}
          {node.type === 'file' && (
            <Trash2
              size={14}
              style={styles.icon}
              onClick={(e) => {
                e.stopPropagation();
                onDeleteFile(node._id);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.color = '#ff7b72';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.5';
                e.currentTarget.style.color = 'inherit';
              }}
            />
          )}
        </div>
        {node.children?.length > 0 && renderTree(node.children, depth + 1)}
      </div>
    ));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span>EXPLORER</span>
      </div>
      {renderTree(buildTree(files))}
    </div>
  );
}

const styles = {
  container: { 
    width: '100%',
    height: '100%',
    background: '#161b22', 
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  header: { 
    padding: '16px 16px 12px 16px', 
    fontSize: '12px', 
    fontWeight: '700', 
    color: '#8b949e', 
    borderBottom: '1px solid #30363d',
    letterSpacing: '0.5px'
  },
  item: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '10px', 
    padding: '10px 12px', 
    cursor: 'pointer', 
    fontSize: '14px', 
    color: '#e6edf3',
    transition: 'background 0.15s ease',
    borderRadius: '6px',
    margin: '2px 8px'
  },
  name: { 
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  icon: { 
    opacity: 0.5, 
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    flexShrink: 0
  }
};
