# 🤖 AI Chat Assistant for VS Code

A powerful Visual Studio Code extension that integrates an AI-powered chat assistant directly into your development workflow. Built with React and powered by Google's Gemini AI, this extension provides contextual code assistance, file analysis, and intelligent code generation.

## ✨ Features

### 🎯 **Smart Code Generation**
- Generate functions, components, and entire files from natural language prompts
- Context-aware code suggestions based on your current workspace
- Support for multiple programming languages with syntax highlighting

### 📁 **File & Image Attachment**
- Use `@filename` syntax to attach files for analysis
- Support for both text files and images
- Intelligent file suggestions with fuzzy matching

### 🧠 **Workspace Context Awareness**
- Understands your project structure and currently open files
- Analyzes selected code snippets for targeted assistance
- Maintains context across chat sessions

### 💻 **Integrated Code Actions**
- **Copy Code**: One-click copying of generated code
- **Insert Code**: Direct insertion into your active editor
- **Create File**: Generate new files with AI-created content

### 🎨 **Modern UI/UX**
- Clean, VS Code-themed interface
- Real-time typing indicators
- Message timestamps and role indicators
- Responsive design that works in any panel size

## 🚀 Installation

1. **Install the Extension**
   - Download the `.vsix` file or install from VS Code Marketplace
   - Open VS Code and go to Extensions (Ctrl+Shift+X)
   - Click "Install from VSIX..." if installing locally

2. **Get Your Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key (starts with `AIzaSy...`)

3. **Configure the Extension**
   - Open Command Palette (Ctrl+Shift+P)
   - Run "AI Chat: Set Gemini API Key"
   - Paste your API key when prompted

## 🎯 Usage

### Basic Chat
1. Open the AI Chat Assistant panel from the Activity Bar
2. Type your questions or requests in the chat input
3. Get intelligent responses with code examples and explanations

### File Attachment
```
@package.json Can you help me add a new dependency?
```
- Type `@` followed by filename
- Select from the dropdown suggestions
- The file content will be included in your message

### Code Generation
```
Generate a React component for a todo list with TypeScript
```
- Ask for specific code in natural language
- Use the ⚡ button for quick code generation
- Click action buttons to copy, insert, or create files

### Advanced Examples

**Analyze Code:**
```
@src/components/Header.tsx Please review this component and suggest improvements
```

**Generate with Context:**
```
Create a utility function to format dates based on the current project structure
```

**Debug Help:**
```
@src/utils/api.ts This function is throwing errors, can you help debug it?
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- VS Code 1.85.0+
- TypeScript 5.3+

### Setup
```bash
# Clone the repository
git clone https://github.com/your-username/ai-chat-assistant.git
cd ai-chat-assistant

# Install dependencies
npm install

# Build the webview UI
cd webview-ui
npm install
npm run build
cd ..

# Compile the extension
npm run compile
```

### Running in Development
1. Open the project in VS Code
2. Press F5 to launch Extension Development Host
3. Test your changes in the new VS Code window

### Building for Production
```bash
# Build everything
npm run vscode:prepublish

# Package the extension
npm run package
```

## 📋 Commands

| Command | Description | Shortcut |
|---------|-------------|----------|
| `AI Chat: Set Gemini API Key` | Configure your Gemini API key | - |
| `AI Chat: Generate Code` | Quick code generation prompt | - |

## 🔧 Configuration

The extension stores your API key securely using VS Code's Secret Storage API. No configuration files are created, and your key is never exposed in plain text.

### Supported File Types
- **Code Files**: `.js`, `.ts`, `.jsx`, `.tsx`, `.py`, `.java`, `.cpp`, `.cs`, `.php`, `.rb`, `.go`, `.rs`
- **Web Files**: `.html`, `.css`, `.scss`, `.json`, `.xml`
- **Documentation**: `.md`, `.txt`, `.yml`, `.yaml`
- **Images**: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues & Support

- **Bug Reports**: [GitHub Issues](https://github.com/your-username/ai-chat-assistant/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/your-username/ai-chat-assistant/discussions)
- **Documentation**: [Wiki](https://github.com/your-username/ai-chat-assistant/wiki)

## 🙏 Acknowledgments

- Built with [Google Gemini AI](https://ai.google.dev/)
- UI components inspired by VS Code's design system
- React integration powered by [Vite](https://vitejs.dev/)

---

**Made with ❤️ for developers who love AI-assisted coding**