import { useState, useRef, useEffect, useLayoutEffect } from 'react'

const API_URL = 'https://ai-agent-backend-ddni.onrender.com/api/chat'
const BOT_NAME = 'CareerCopilot'

function escHtml(t) {
  return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function formatText(text) {
  return escHtml(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>')
}

function ChatBot({ isOpen, onClose, isDayMode }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const messagesRef = useRef([])
  const hasInitialized = useRef(false)

  useLayoutEffect(() => {
    messagesRef.current = messages
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 400)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && !hasInitialized.current) {
      hasInitialized.current = true
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const greeting = "Hello! I'm CareerCopilot, your RecruitME consultant. 👋\n\nAre you an **employer** looking to hire top talent, or a **candidate** exploring new opportunities?\n\nEither way, I'm here to help — our service is always free for candidates!"
        setMessages([{ role: 'assistant', content: greeting }])
      }, 1200)
    }
  }, [isOpen])

  const sendMessage = async (text) => {
    const msg = text || input
    if (!msg.trim() || isTyping) return

    if (showQuickReplies) {
      setShowQuickReplies(false)
    }
    const userMsg = { role: 'user', content: msg.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    let lastError = null

    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [...messagesRef.current, userMsg] }),
        })

        if (!res.ok) {
          const errPayload = await res.json().catch(() => ({}))
          throw new Error(errPayload.error || 'Server error')
        }

        const data = await res.json()
        setIsTyping(false)
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
        return
      } catch (error) {
        lastError = error
        if (attempt === 0) {
          await new Promise(resolve => setTimeout(resolve, 600))
        }
      }
    }

    setIsTyping(false)
    console.error('Chat request failed:', lastError)
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: "I'm having a little trouble connecting right now. Please email us directly at **contact@recruitme-dubai.com** or call **+971 4 400 0000** — we'd love to help! 🙏"
    }])
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleSend = () => sendMessage()

  return (
    <>
      <div className={`chat-window ${isOpen ? 'open' : ''} ${isDayMode ? 'day' : ''}`}>
        <div className="chat-header">
          <div className="chat-avatar">C</div>
          <div className="chat-header-info">
            <div className="chat-header-name">{BOT_NAME}</div>
            <div className="chat-header-status">● Online</div>
          </div>
          <button className="chat-close" onClick={onClose}>✕</button>
        </div>

        {isOpen && (
          <div className="data-stream" aria-hidden="true">
            <div className="data-stream-bar" />
          </div>
        )}

        <div className="chat-messages">
          {messages.length === 0 && !isTyping && (
            <div className="welcome-msg">
              <div className="msg-wrapper bot">
                <div className="msg-avatar-sm">C</div>
                <div className="bubble bot">
                  Press <strong>Ctrl+Shift+C</strong> or click the chat button to start a conversation!
                </div>
              </div>
            </div>
          )}
          {messages.map((msg, i) => {
            const bubbleRole = msg.role === 'user' ? 'user' : 'bot'
            return (
              <div key={i} className={`msg-wrapper ${bubbleRole}`}>
                <div className="msg-avatar-sm">{msg.role === 'assistant' ? 'C' : 'U'}</div>
                <div
                  className={`bubble ${bubbleRole}`}
                  dangerouslySetInnerHTML={{ __html: formatText(msg.content) }}
                />
              </div>
            )
          })}
          {isTyping && (
            <div className="msg-wrapper bot">
              <div className="msg-avatar-sm">C</div>
              <div className="bubble bot typing-indicator">
                <div className="typing-visual" aria-hidden="true">
                  <span className="typing-bar" />
                  <span className="typing-bar" />
                  <span className="typing-bar" />
                </div>
                <span className="typing-text">Thinking</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {showQuickReplies && (
          <div className="quick-replies">
            <button className="qr-btn" onClick={() => sendMessage("I want to hire talent")}>Hire Talent</button>
            <button className="qr-btn" onClick={() => sendMessage("I'm looking for a job")}>Find a Job</button>
            <button className="qr-btn" onClick={() => sendMessage("Tell me about pricing")}>Pricing</button>
          </div>
        )}

        <div className="chat-input-area">
          <div className="chat-input-row">
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder="Type a message…"
              rows="1"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button className="chat-send" onClick={handleSend} disabled={isTyping || !input.trim()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatBot