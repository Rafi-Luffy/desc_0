// webview-ui/src/App.tsx
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { vscode } from './utilities/vscode';
import './App.css';
function App() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [isThinking, setIsThinking] = useState(false);
    const [fileSuggestions, setFileSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState([]);
    const chatContainerRef = useRef(null);
    useEffect(() => {
        // Scroll to the bottom whenever messages change
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);
    useEffect(() => {
        // Listener for messages from the extension
        const handleMessage = (event) => {
            const message = event.data;
            switch (message.type) {
                case 'ai-response':
                    setIsThinking(false);
                    setMessages(prev => [...prev, { role: 'ai', text: message.value }]);
                    break;
                case 'ai-thinking':
                    setIsThinking(true);
                    break;
                case 'file-list':
                    setFileSuggestions(message.files);
                    setShowSuggestions(true);
                    break;
                case 'error':
                    setIsThinking(false);
                    // Display error as a system message in the chat
                    setMessages(prev => [...prev, { role: 'ai', text: `Error: ${message.value}` }]);
                    break;
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        const atIndex = value.lastIndexOf('@');
        if (atIndex !== -1 && !value.includes(' ', atIndex)) {
            vscode.postMessage({ type: 'get-files' });
        }
        else {
            setShowSuggestions(false);
        }
    };
    const handleSuggestionClick = (file) => {
        const atIndex = inputValue.lastIndexOf('@');
        const newValue = inputValue.substring(0, atIndex + 1) + file + ' ';
        setInputValue(newValue);
        setAttachedFiles(prev => [...prev, file]);
        setShowSuggestions(false);
    };
    const handleSendMessage = () => {
        if (!inputValue.trim() && attachedFiles.length === 0)
            return;
        const userMessage = { role: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        vscode.postMessage({
            type: 'user-message',
            message: {
                role: 'user',
                text: inputValue,
                files: attachedFiles,
            }
        });
        setInputValue('');
        setAttachedFiles([]);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    return (<div className="app-container">
      <div className="chat-container" ref={chatContainerRef}>
        {messages.map((msg, index) => (<div key={index} className={`message ${msg.role}`}>
            <ReactMarkdown children={msg.text} remarkPlugins={[remarkGfm]} components={{
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (<SyntaxHighlighter children={String(children).replace(/\n$/, '')} style={vscDarkPlus} language={match[1]} PreTag="div" {...props}/>) : (<code className={className} {...props}>
                      {children}
                    </code>);
                },
            }}/>
          </div>))}
        {isThinking && <div className="message ai thinking"><span></span><span></span><span></span></div>}
      </div>

      <div className="input-area">
        {showSuggestions && (<div className="suggestions-box">
            {fileSuggestions
                .filter(f => f.toLowerCase().includes(inputValue.substring(inputValue.lastIndexOf('@') + 1).toLowerCase()))
                .slice(0, 10) // Limit to 10 suggestions
                .map(file => (<div key={file} className="suggestion-item" onClick={() => handleSuggestionClick(file)}>
                  {file}
                </div>))}
          </div>)}
        <div className="input-wrapper">
          <textarea value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="Type your message or @ to attach a file..." rows={1}/>
          <button onClick={handleSendMessage} disabled={isThinking}>
            Send
          </button>
        </div>
      </div>
    </div>);
}
export default App;
//# sourceMappingURL=App.js.map