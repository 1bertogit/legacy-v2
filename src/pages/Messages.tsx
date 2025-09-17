import React, { useState, useRef, useEffect } from 'react'
import { 
  Search, 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  MoreVertical,
  Star,
  Archive,
  Trash2,
  Edit,
  Check,
  CheckCheck,
  Clock,
  Image,
  File,
  Mic,
  Plus,
  Filter,
  Users,
  User,
  Circle,
  Settings
} from 'lucide-react'
import GlassCard from '../components/GlassCard'

interface Message {
  id: string
  content: string
  timestamp: string
  sender: {
    id: string
    name: string
    avatar: string
    isOnline: boolean
  }
  type: 'text' | 'image' | 'file' | 'audio' | 'video'
  status: 'sent' | 'delivered' | 'read'
  attachments?: {
    id: string
    name: string
    url: string
    type: string
    size: number
  }[]
  replyTo?: string
  isEdited?: boolean
}

interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
  type: 'individual' | 'group'
  participants?: number
  isPinned: boolean
  isArchived: boolean
  status: 'active' | 'muted' | 'blocked'
}

interface MessageCardProps {
  message: Message
  isOwn: boolean
  onReply: (messageId: string) => void
  onEdit: (messageId: string) => void
  onDelete: (messageId: string) => void
}

interface ChatListItemProps {
  chat: Chat
  isActive: boolean
  onClick: () => void
}

const MessageCard: React.FC<MessageCardProps> = ({ message, isOwn, onReply, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false)

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sent': return <Check className="w-4 h-4 text-white/60" />
      case 'delivered': return <CheckCheck className="w-4 h-4 text-white/60" />
      case 'read': return <CheckCheck className="w-4 h-4 text-blue-400" />
      default: return <Clock className="w-4 h-4 text-white/60" />
    }
  }

  return (
    <div className={`flex gap-3 mb-4 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isOwn && (
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={message.sender.avatar} 
            alt={message.sender.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
        <div 
          className={`relative group ${
            isOwn 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
              : 'bg-white/[0.08] text-white'
          } rounded-2xl px-4 py-3 backdrop-blur-xl border border-white/[0.12]`}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          {message.type === 'text' && (
            <p className="text-sm leading-relaxed">{message.content}</p>
          )}
          
          {message.type === 'image' && message.attachments && (
            <div className="space-y-2">
              {message.content && <p className="text-sm mb-2">{message.content}</p>}
              <div className="grid grid-cols-2 gap-2">
                {message.attachments.map((attachment) => (
                  <div key={attachment.id} className="relative rounded-lg overflow-hidden">
                    <img 
                      src={attachment.url} 
                      alt={attachment.name}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {message.type === 'file' && message.attachments && (
            <div className="space-y-2">
              {message.content && <p className="text-sm mb-2">{message.content}</p>}
              {message.attachments.map((attachment) => (
                <div key={attachment.id} className="flex items-center gap-3 p-3 bg-white/[0.08] rounded-lg">
                  <File className="w-8 h-8 text-white/60" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{attachment.name}</p>
                    <p className="text-xs text-white/60">{(attachment.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {message.type === 'audio' && (
            <div className="flex items-center gap-3 p-2">
              <div className="w-8 h-8 bg-white/[0.12] rounded-full flex items-center justify-center">
                <Mic className="w-4 h-4" />
              </div>
              <div className="flex-1 h-2 bg-white/[0.12] rounded-full">
                <div className="w-1/3 h-full bg-white/40 rounded-full" />
              </div>
              <span className="text-xs text-white/60">0:45</span>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-white/60">
              {message.timestamp}
              {message.isEdited && ' (editado)'}
            </span>
            {isOwn && getStatusIcon()}
          </div>
          
          {showActions && (
            <div className={`absolute top-0 ${isOwn ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
              <button 
                onClick={() => onReply(message.id)}
                className="p-1 bg-white/[0.08] rounded-full hover:bg-white/[0.12] transition-colors"
              >
                <Edit className="w-3 h-3 text-white/60" />
              </button>
              {isOwn && (
                <button 
                  onClick={() => onEdit(message.id)}
                  className="p-1 bg-white/[0.08] rounded-full hover:bg-white/[0.12] transition-colors"
                >
                  <Edit className="w-3 h-3 text-white/60" />
                </button>
              )}
              <button 
                onClick={() => onDelete(message.id)}
                className="p-1 bg-white/[0.08] rounded-full hover:bg-white/[0.12] transition-colors"
              >
                <Trash2 className="w-3 h-3 text-white/60" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat, isActive, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`p-4 cursor-pointer transition-all duration-200 border-b border-white/[0.06] ${
        isActive ? 'bg-white/[0.08]' : 'hover:bg-white/[0.04]'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
          </div>
          {chat.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0a0f]" />
          )}
          {chat.isPinned && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
              <Star className="w-2 h-2 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-white truncate">{chat.name}</h3>
              {chat.type === 'group' && (
                <Users className="w-4 h-4 text-white/60" />
              )}
            </div>
            <span className="text-xs text-white/60">{chat.timestamp}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/70 truncate">{chat.lastMessage}</p>
            {chat.unreadCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs rounded-full min-w-[20px] text-center">
                {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
              </span>
            )}
          </div>
          
          {chat.type === 'group' && chat.participants && (
            <p className="text-xs text-white/50 mt-1">{chat.participants} participantes</p>
          )}
        </div>
      </div>
    </div>
  )
}

const Messages: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [messageInput, setMessageInput] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock data
  const chats: Chat[] = [
    {
      id: '1',
      name: 'Dr. Maria Silva',
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20female%20doctor%20portrait%20medical%20uniform&image_size=square',
      lastMessage: 'Paciente apresentou melhora significativa',
      timestamp: '14:30',
      unreadCount: 2,
      isOnline: true,
      type: 'individual',
      isPinned: true,
      isArchived: false,
      status: 'active'
    },
    {
      id: '2',
      name: 'Equipe Cardiologia',
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=medical%20team%20cardiology%20group%20hospital&image_size=square',
      lastMessage: 'Reunião agendada para amanhã às 9h',
      timestamp: '13:45',
      unreadCount: 0,
      isOnline: false,
      type: 'group',
      participants: 8,
      isPinned: false,
      isArchived: false,
      status: 'active'
    },
    {
      id: '3',
      name: 'Dr. João Santos',
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20male%20doctor%20portrait%20medical%20uniform&image_size=square',
      lastMessage: 'Protocolo atualizado conforme solicitado',
      timestamp: '12:20',
      unreadCount: 1,
      isOnline: true,
      type: 'individual',
      isPinned: false,
      isArchived: false,
      status: 'active'
    }
  ]

  const messages: Message[] = [
    {
      id: '1',
      content: 'Bom dia! Como está o paciente do leito 15?',
      timestamp: '09:30',
      sender: {
        id: '2',
        name: 'Dr. Maria Silva',
        avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20female%20doctor%20portrait%20medical%20uniform&image_size=square',
        isOnline: true
      },
      type: 'text',
      status: 'read'
    },
    {
      id: '2',
      content: 'Ele apresentou melhora significativa durante a noite. Sinais vitais estáveis.',
      timestamp: '09:32',
      sender: {
        id: '1',
        name: 'Você',
        avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20doctor%20portrait%20medical%20uniform&image_size=square',
        isOnline: true
      },
      type: 'text',
      status: 'read'
    },
    {
      id: '3',
      content: 'Excelente! Vou passar para avaliá-lo em breve.',
      timestamp: '09:35',
      sender: {
        id: '2',
        name: 'Dr. Maria Silva',
        avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20female%20doctor%20portrait%20medical%20uniform&image_size=square',
        isOnline: true
      },
      type: 'text',
      status: 'delivered'
    }
  ]

  const filters = [
    { id: 'all', name: 'Todas', count: chats.length },
    { id: 'unread', name: 'Não lidas', count: chats.filter(c => c.unreadCount > 0).length },
    { id: 'pinned', name: 'Fixadas', count: chats.filter(c => c.isPinned).length },
    { id: 'groups', name: 'Grupos', count: chats.filter(c => c.type === 'group').length },
    { id: 'archived', name: 'Arquivadas', count: chats.filter(c => c.isArchived).length }
  ]

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = (() => {
      switch (activeFilter) {
        case 'unread': return chat.unreadCount > 0
        case 'pinned': return chat.isPinned
        case 'groups': return chat.type === 'group'
        case 'archived': return chat.isArchived
        default: return !chat.isArchived
      }
    })()
    
    return matchesSearch && matchesFilter
  })

  const selectedChatData = chats.find(chat => chat.id === selectedChat)

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Implementar envio de mensagem
      setMessageInput('')
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleReply = (messageId: string) => {
    // Implementar resposta
  }

  const handleEdit = (messageId: string) => {
    // Implementar edição
  }

  const handleDelete = (messageId: string) => {
    // Implementar exclusão
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Mensagens</h1>
          <p className="text-white/60">Comunicação em tempo real com sua equipe médica</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Chat List */}
          <div className="lg:col-span-1">
            <GlassCard className="h-full flex flex-col">
              {/* Search */}
              <div className="p-4 border-b border-white/[0.06]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type="text"
                    placeholder="Buscar conversas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.06] border border-white/[0.12] rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/[0.24]"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="p-4 border-b border-white/[0.06]">
                <div className="flex gap-2 overflow-x-auto">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                        activeFilter === filter.id
                          ? 'bg-white/[0.12] text-white'
                          : 'text-white/70 hover:bg-white/[0.06] hover:text-white'
                      }`}
                    >
                      {filter.name}
                      {filter.count > 0 && (
                        <span className="px-2 py-1 bg-white/[0.12] text-white/80 rounded-full text-xs">
                          {filter.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat List */}
              <div className="flex-1 overflow-y-auto">
                {filteredChats.length > 0 ? (
                  filteredChats.map((chat) => (
                    <ChatListItem
                      key={chat.id}
                      chat={chat}
                      isActive={selectedChat === chat.id}
                      onClick={() => setSelectedChat(chat.id)}
                    />
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <Users className="w-16 h-16 text-white/40 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Nenhuma conversa encontrada</h3>
                    <p className="text-white/60">Tente ajustar sua busca ou filtros</p>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {selectedChatData ? (
              <GlassCard className="h-full flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src={selectedChatData.avatar} alt={selectedChatData.name} className="w-full h-full object-cover" />
                      </div>
                      {selectedChatData.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0a0f]" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{selectedChatData.name}</h3>
                      <p className="text-sm text-white/60">
                        {selectedChatData.isOnline ? 'Online' : 'Offline'}
                        {selectedChatData.type === 'group' && ` • ${selectedChatData.participants} participantes`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/[0.06] rounded-lg transition-colors">
                      <Phone className="w-5 h-5 text-white/70" />
                    </button>
                    <button className="p-2 hover:bg-white/[0.06] rounded-lg transition-colors">
                      <Video className="w-5 h-5 text-white/70" />
                    </button>
                    <button className="p-2 hover:bg-white/[0.06] rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-white/70" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <MessageCard
                      key={message.id}
                      message={message}
                      isOwn={message.sender.id === '1'}
                      onReply={handleReply}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-white/[0.06]">
                  <div className="flex items-end gap-3">
                    <button 
                      onClick={handleFileUpload}
                      className="p-2 hover:bg-white/[0.06] rounded-lg transition-colors"
                    >
                      <Paperclip className="w-5 h-5 text-white/70" />
                    </button>
                    
                    <div className="flex-1 relative">
                      <textarea
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                        placeholder="Digite sua mensagem..."
                        className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.12] rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/[0.24] resize-none max-h-32"
                        rows={1}
                      />
                      <button 
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/[0.06] rounded transition-colors"
                      >
                        <Smile className="w-4 h-4 text-white/70" />
                      </button>
                    </div>
                    
                    {messageInput.trim() ? (
                      <button 
                        onClick={handleSendMessage}
                        className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    ) : (
                      <button 
                        onClick={() => setIsRecording(!isRecording)}
                        className={`p-3 rounded-lg transition-all duration-200 ${
                          isRecording 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white/[0.06] text-white/70 hover:bg-white/[0.12]'
                        }`}
                      >
                        <Mic className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    // Implementar upload de arquivo
                  }}
                />
              </GlassCard>
            ) : (
              <GlassCard className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Users className="w-24 h-24 text-white/40 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-white mb-2">Selecione uma conversa</h3>
                  <p className="text-white/60">Escolha uma conversa da lista para começar a trocar mensagens</p>
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages