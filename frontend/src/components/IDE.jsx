import { useState, useEffect } from 'react';
import axios from 'axios';
import { Play, Save, LogOut, FolderPlus } from 'lucide-react';
import FileExplorer from './FileExplorer';
import Editor from './Editor';
import Preview from './Preview';
import ResizablePanels from './ResizablePanels';

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'http://localhost:5000/api';

export default function IDE({ user, onLogout }) {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${API_URL}/projects/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(data);
      if (data.length > 0) loadProject(data[0]._id);
    } catch (err) {
      console.error(err);
    }
  };

  const loadProject = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${API_URL}/projects/detail/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentProject(data.project);
      setFiles(data.files);
    } catch (err) {
      console.error(err);
    }
  };

  const createProject = async () => {
    const name = prompt('Project name:');
    if (!name) return;
    
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(`${API_URL}/projects`, { name }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const createFile = async (parentId) => {
    const name = prompt('File name (e.g., Component.js):');
    if (!name) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/files`, {
        projectId: currentProject._id,
        parentId,
        name,
        type: 'file',
        content: ''
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadProject(currentProject._id);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteFile = async (fileId) => {
    if (!confirm('Delete this file?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/files/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (selectedFile?._id === fileId) setSelectedFile(null);
      loadProject(currentProject._id);
    } catch (err) {
      console.error(err);
    }
  };

  const saveFile = async () => {
    if (!selectedFile) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/files/${selectedFile._id}`, {
        content: selectedFile.content
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('File saved!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditorChange = (value) => {
    setSelectedFile({ ...selectedFile, content: value });
    setFiles(files.map(f => f._id === selectedFile._id ? { ...f, content: value } : f));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>CipherStudio</h1>
        <div style={styles.headerRight}>
          <select
            value={currentProject?._id || ''}
            onChange={(e) => loadProject(e.target.value)}
            style={styles.select}
          >
            {projects.map(p => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
          <button 
            onClick={createProject} 
            style={{...styles.btn, background: '#1f6feb'}} 
            title="New Project"
          >
            <FolderPlus size={18} />
            <span>New</span>
          </button>
          <button 
            onClick={saveFile} 
            style={{
              ...styles.btn, 
              background: selectedFile ? '#238636' : '#484f58',
              cursor: selectedFile ? 'pointer' : 'not-allowed',
              opacity: selectedFile ? 1 : 0.6
            }} 
            title="Save File"
            disabled={!selectedFile}
          >
            <Save size={18} />
            <span>Save</span>
          </button>
          <button 
            onClick={() => setShowPreview(!showPreview)} 
            style={{
              ...styles.btn, 
              background: showPreview ? '#8957e5' : '#6e7681'
            }} 
            title={showPreview ? 'Hide Preview' : 'Show Preview'}
          >
            <Play size={18} />
            <span>{showPreview ? 'Hide' : 'Preview'}</span>
          </button>
          <button 
            onClick={onLogout} 
            style={{...styles.btn, background: '#da3633'}} 
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
      
      <div style={styles.main}>
        <ResizablePanels
          left={
            <FileExplorer
              files={files}
              selectedFile={selectedFile}
              onSelectFile={setSelectedFile}
              onCreateFile={createFile}
              onDeleteFile={deleteFile}
            />
          }
          center={<Editor file={selectedFile} onChange={handleEditorChange} />}
          right={showPreview ? <Preview files={files} /> : null}
        />
      </div>
      
      <div style={styles.statusBar}>
        <div style={styles.statusLeft}>
          <span style={styles.statusItem}>
            {currentProject?.name || 'No Project'}
          </span>
          {selectedFile && (
            <span style={styles.statusItem}>
              • {selectedFile.name}
            </span>
          )}
        </div>
        <div style={styles.statusRight}>
          <span style={styles.statusItem}>
            {files.filter(f => f.type === 'file').length} files
          </span>
          <span style={styles.statusItem}>
            {user.username}
          </span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { 
    height: '100vh', 
    display: 'flex', 
    flexDirection: 'column',
    background: '#0d1117'
  },
  header: { 
    height: '60px', 
    background: '#161b22', 
    borderBottom: '1px solid #30363d', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: '0 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    flexShrink: 0
  },
  title: { 
    fontSize: '22px', 
    background: 'linear-gradient(135deg, #58a6ff 0%, #79c0ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: '700',
    letterSpacing: '-0.5px'
  },
  headerRight: { 
    display: 'flex', 
    gap: '10px', 
    alignItems: 'center' 
  },
  select: { 
    padding: '10px 16px', 
    background: '#0d1117', 
    border: '2px solid #30363d', 
    borderRadius: '8px', 
    color: '#e6edf3', 
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none',
    minWidth: '180px',
    fontWeight: '500'
  },
  btn: { 
    padding: '10px 14px', 
    background: '#238636', 
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    fontWeight: '500',
    boxShadow: '0 2px 8px rgba(35, 134, 54, 0.3)'
  },
  main: { 
    flex: 1, 
    display: 'flex', 
    overflow: 'hidden',
    minHeight: 0
  },
  statusBar: {
    height: '28px',
    background: '#161b22',
    borderTop: '1px solid #30363d',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    fontSize: '12px',
    color: '#8b949e',
    flexShrink: 0
  },
  statusLeft: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  statusRight: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  },
  statusItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  }
};
