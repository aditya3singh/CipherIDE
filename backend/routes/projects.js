import express from 'express';
import Project from '../models/Project.js';
import File from '../models/File.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await Project.create({ name, description, userId: req.userId });
    
    // Create default files
    const rootFolder = await File.create({
      projectId: project._id,
      name: project.name,
      type: 'folder',
      parentId: null
    });
    
    const srcFolder = await File.create({
      projectId: project._id,
      name: 'src',
      type: 'folder',
      parentId: rootFolder._id
    });
    
    await File.create({
      projectId: project._id,
      name: 'App.js',
      type: 'file',
      parentId: srcFolder._id,
      content: `export default function App() {
  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui' }}>
      <h1 style={{ color: '#1f6feb', marginBottom: '16px' }}>
        🎉 Welcome to CipherStudio!
      </h1>
      <p style={{ fontSize: '18px', color: '#333', marginBottom: '12px' }}>
        Your React project is ready to go.
      </p>
      <p style={{ color: '#666' }}>
        Start editing this file to see changes in real-time!
      </p>
    </div>
  );
}`
    });
    
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:userId', auth, async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.params.userId });
    res.json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/detail/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const files = await File.find({ projectId: req.params.id });
    res.json({ project, files });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await File.deleteMany({ projectId: req.params.id });
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
