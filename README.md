# 🎯 CipherStudio - Browser-Based React IDE

> **Live Demo**: [CipherStudio IDE](https://cipher-ide.vercel.app) | **Backend**: [API Server](https://cipherstudio-api.onrender.com)

A full-stack online IDE for creating, editing, and previewing React projects directly in the browser. Built as a modern alternative to CodeSandbox with real-time collaboration features.

![CipherStudio Preview](https://via.placeholder.com/800x400/0d1117/58a6ff?text=CipherStudio+IDE)

## ✨ Features

### 🎨 **Core Features**
- **📁 File Management** - Create, delete, and organize files/folders with hierarchical structure
- **💻 Monaco Editor** - Professional VS Code-like editing experience with syntax highlighting
- **⚡ Live Preview** - Real-time React preview with instant updates as you type
- **💾 Project Persistence** - Save/load projects with MongoDB backend
- **🔐 Authentication** - Secure user login/register system with JWT
- **🗂️ Multi-Project Support** - Manage multiple projects per user account

### 🎯 **Advanced Features**
- **🎨 Modern UI** - GitHub Dark theme with resizable panels
- **📱 Responsive Design** - Works seamlessly on desktop and tablet
- **⚠️ Error Handling** - Graceful error display in preview
- **🔄 Real-time Sync** - Editor and preview stay perfectly synchronized
- **📊 Status Bar** - Shows project info, file count, and user details

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + Vite |
| **Editor** | Monaco Editor |
| **Preview** | Custom iframe with Babel |
| **Backend** | Node.js + Express |
| **Database** | MongoDB Atlas |
| **Auth** | JWT + bcryptjs |
| **Deployment** | Vercel + Render |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account

### 1. Clone Repository
```bash
git clone https://github.com/aditya3singh/CipherIDE.git
cd CipherIDE
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cipherstudio
JWT_SECRET=your_jwt_secret_key_here
```

### 4. Run Development
```bash
# Start both frontend and backend
npm run dev

# Or run separately:
npm run dev:frontend  # http://localhost:3000
npm run dev:backend   # http://localhost:5000
```

## 📖 Usage Guide

1. **🔐 Authentication** - Register a new account or login
2. **📁 Create Project** - Click "New" button to create a project
3. **📄 Add Files** - Use + icon next to folders to add files
4. **✏️ Edit Code** - Select any file to edit in Monaco Editor
5. **💾 Save Changes** - Click "Save" button (Ctrl+S)
6. **👀 Live Preview** - Click "Preview" to see real-time output
7. **🔧 Resize Panels** - Drag panel borders to adjust layout

## 🏗️ Project Structure

```
CipherIDE/
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 🔐 Auth.jsx
│   │   │   ├── 🏠 IDE.jsx
│   │   │   ├── 📁 FileExplorer.jsx
│   │   │   ├── ✏️ Editor.jsx
│   │   │   ├── 👀 Preview.jsx
│   │   │   └── 🔧 ResizablePanels.jsx
│   │   ├── 📄 App.jsx
│   │   └── 📄 main.jsx
│   └── 📦 package.json
├── 📁 backend/
│   ├── 📁 models/
│   │   ├── 👤 User.js
│   │   ├── 📁 Project.js
│   │   └── 📄 File.js
│   ├── 📁 routes/
│   │   ├── 👤 users.js
│   │   ├── 📁 projects.js
│   │   └── 📄 files.js
│   ├── 🔐 middleware/auth.js
│   └── 🚀 server.js
└── 📚 README.md
```

## 🌐 API Documentation

### Authentication
```http
POST /api/users          # Register new user
POST /api/users/login    # Login user
```

### Projects
```http
POST   /api/projects              # Create project
GET    /api/projects/:userId      # Get user projects
GET    /api/projects/detail/:id   # Get project with files
PUT    /api/projects/:id          # Update project
DELETE /api/projects/:id          # Delete project
```

### Files
```http
POST   /api/files     # Create file/folder
GET    /api/files/:id # Get file details
PUT    /api/files/:id # Update file content
DELETE /api/files/:id # Delete file
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Deploy to Vercel
vercel --prod

# Or connect GitHub repo to Vercel dashboard
```

### Backend (Render)
1. Connect GitHub repository
2. Set environment variables
3. Deploy from `backend` directory
4. Update frontend API_URL

## 🎨 Screenshots

| Feature | Preview |
|---------|---------|
| **Login Screen** | Modern authentication with gradient design |
| **File Explorer** | Hierarchical file tree with icons |
| **Code Editor** | Monaco editor with syntax highlighting |
| **Live Preview** | Real-time React rendering |
| **Responsive UI** | Resizable panels for flexible layout |

## 🔮 Future Enhancements

- [ ] 🌓 Theme switcher (dark/light modes)
- [ ] ✏️ File/folder rename functionality
- [ ] 💾 Autosave toggle feature
- [ ] ☁️ AWS S3 integration for large files
- [ ] 👥 Real-time collaborative editing
- [ ] 🖥️ Integrated terminal
- [ ] 📦 NPM package management
- [ ] 🔍 Global search and replace
- [ ] 📱 Mobile app version

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aditya Singh**
- GitHub: [@aditya3singh](https://github.com/aditya3singh)
- LinkedIn: [Aditya Singh](https://linkedin.com/in/aditya3singh)

## 🙏 Acknowledgments

- Monaco Editor team for the excellent code editor
- React team for the amazing framework
- MongoDB for reliable database services
- Vercel for seamless deployment

---

<div align="center">
  <strong>⭐ Star this repo if you found it helpful!</strong>
</div>
