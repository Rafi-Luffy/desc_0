// webview-ui/src/App.tsx
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { vscode } from './utilities/vscode';
import './App.css';

interface Message {
  role: 'user' | 'ai' | 'system';
  text: string;
  timestamp?: Date;
  isCodeGeneration?: boolean;
}

interface FileAttachment {
  name: string;
  type: 'file' | 'image';
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      text: '👋 Welcome to AI Chat Assistant! I can help you with:\n\n• **Code Generation**: Ask me to create functions, components, or entire files\n• **File Analysis**: Use `@filename` to attach files for analysis\n• **Workspace Context**: I understand your current project structure\n• **Code Manipulation**: I can modify, refactor, or explain your code\n\nTry typing `@` to attach files or just ask me anything!',
      timestamp: new Date()
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [fileSuggestions, setFileSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<FileAttachment[]>([]);
  const [workspaceContext, setWorkspaceContext] = useState<string>('');

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Get workspace context on load
    vscode.postMessage({ type: 'get-workspace-context' });

    // Listener for messages from the extension
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      switch (message.type) {
        case 'ai-response':
          setIsThinking(false);
          setMessages(prev => [...prev, { 
            role: 'ai', 
            text: message.value, 
            timestamp: new Date() 
          }]);
          break;
        case 'ai-thinking':
          setIsThinking(true);
          break;
        case 'file-list':
          setFileSuggestions(message.files);
          setShowSuggestions(true);
          break;
        case 'workspace-context':
          setWorkspaceContext(message.context);
          break;
        case 'code-generated':
          setIsThinking(false);
          setMessages(prev => [...prev, { 
            role: 'ai', 
            text: message.value, 
            timestamp: new Date(),
            isCodeGeneration: true
          }]);
          break;
        case 'error':
          setIsThinking(false);
          setMessages(prev => [...prev, { 
            role: 'ai', 
            text: `❌ **Error**: ${message.value}`, 
            timestamp: new Date() 
          }]);
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Auto-resize textarea
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 150) + 'px';
    }

    // Handle @ mentions for file attachment
    const atIndex = value.lastIndexOf('@');
    if (atIndex !== -1 && !value.includes(' ', atIndex)) {
      vscode.postMessage({ type: 'get-files' });
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (file: string) => {
    const atIndex = inputValue.lastIndexOf('@');
    const newValue = inputValue.substring(0, atIndex + 1) + file + ' ';
    setInputValue(newValue);
    
    // Add to attached files
    const fileExtension = file.split('.').pop()?.toLowerCase() || '';
    const isImage = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(fileExtension);
    
    setAttachedFiles(prev => [...prev, { 
      name: file, 
      type: isImage ? 'image' : 'file' 
    }]);
    setShowSuggestions(false);
    
    // Focus back to input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const removeAttachment = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() && attachedFiles.length === 0) return;

    const userMessage: Message = { 
      role: 'user', 
      text: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Send message to extension
    vscode.postMessage({
      type: 'user-message',
      message: {
        role: 'user',
        text: inputValue,
        files: attachedFiles.filter(f => f.type === 'file').map(f => f.name),
        images: attachedFiles.filter(f => f.type === 'image').map(f => f.name)
      }
    });

    setInputValue('');
    setAttachedFiles([]);
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCodeAction = (code: string, action: 'insert' | 'create') => {
    if (action === 'insert') {
      vscode.postMessage({
        type: 'insert-code',
        code: code
      });
    } else if (action === 'create') {
      const filename = prompt('Enter filename (e.g., component.tsx):');
      if (filename) {
        vscode.postMessage({
          type: 'create-file',
          filename: filename,
          content: code
        });
      }
    }
  };

  const generateCode = () => {
    const prompt = inputValue || 'Generate useful code based on the current context';
    vscode.postMessage({
      type: 'generate-code',
      prompt: prompt
    });
    setInputValue('');
  };

  const CodeBlock = ({ children, className }: { children: string; className?: string }) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    
    return (
      <div className="code-block-container">
        <div className="code-block-header">
          <span className="code-language">{language || 'code'}</span>
          <div className="code-actions">
            <button 
              className="code-action-btn"
              onClick={() => navigator.clipboard.writeText(children)}
              title="Copy code"
            >
              📋
            </button>
            <button 
              className="code-action-btn"
              onClick={() => handleCodeAction(children, 'insert')}
              title="Insert into active editor"
            >
              📝
            </button>
            <button 
              className="code-action-btn"
              onClick={() => handleCodeAction(children, 'create')}
              title="Create new file"
            >
              📄
            </button>
          </div>
        </div>
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          PreTag="div"
          customStyle={{
            margin: 0,
            borderRadius: '0 0 8px 8px'
          }}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    );
  };

  return (
    <div className="app-container">
      <div className="chat-header">
        <h3>🤖 AI Chat Assistant</h3>
        <div className="workspace-info">
          {workspaceContext && (
            <span className="workspace-name">
              📁 {workspaceContext.split('\n')[0].replace('Workspace: ', '')}
            </span>
          )}
        </div>
      </div>

      <div className="chat-container" ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <div className="message-header">
              <span className="message-role">
                {msg.role === 'user' ? '👤' : msg.role === 'ai' ? '🤖' : 'ℹ️'}
              </span>
              {msg.timestamp && (
                <span className="message-time">
                  {msg.timestamp.toLocaleTimeString()}
                </span>
              )}
            </div>
            <div className="message-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ children, className, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                      <CodeBlock className={className}>
                        {String(children).replace(/\n$/, '')}
                      </CodeBlock>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="message ai thinking">
            <div className="message-header">
              <span className="message-role">🤖</span>
            </div>
            <div className="thinking-animation">
              <span></span><span></span><span></span>
              <span className="thinking-text">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="input-area">
        {/* File attachments display */}
        {attachedFiles.length > 0 && (
          <div className="attachments">
            {attachedFiles.map((file, index) => (
              <div key={index} className="attachment-item">
                <span className="attachment-icon">
                  {file.type === 'image' ? '🖼️' : '📄'}
                </span>
                <span className="attachment-name">{file.name}</span>
                <button 
                  className="remove-attachment"
                  onClick={() => removeAttachment(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* File suggestions */}
        {showSuggestions && (
          <div className="suggestions-box">
            {fileSuggestions
              .filter(f => f.toLowerCase().includes(
                inputValue.substring(inputValue.lastIndexOf('@') + 1).toLowerCase()
              ))
              .slice(0, 10)
              .map(file => (
                <div 
                  key={file} 
                  className="suggestion-item" 
                  onClick={() => handleSuggestionClick(file)}
                >
                  <span className="file-icon">
                    {file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.gif') || file.endsWith('.svg') ? '🖼️' : '📄'}
                  </span>
                  {file}
                </div>
              ))}
          </div>
        )}

        <div className="input-wrapper">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything or type @ to attach files..."
            rows={1}
            className="message-input"
          />
          <div className="input-actions">
            <button 
              className="action-btn generate-btn"
              onClick={generateCode}
              title="Generate code from prompt"
              disabled={isThinking}
            >
              ⚡
            </button>
            <button 
              className="action-btn send-btn"
              onClick={handleSendMessage} 
              disabled={isThinking}
            >
              {isThinking ? '⏳' : '📤'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;