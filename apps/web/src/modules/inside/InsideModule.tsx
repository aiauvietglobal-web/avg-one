import React, { useState } from 'react';
import { Newspaper, Send, ThumbsUp, MessageSquare, Pin, Plus, Search, Tag, UserCheck } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  isPinned: boolean;
  likesCount: number;
  author: { name: string; avatar?: string; role?: string };
  createdAt: string;
  comments: { id: string; content: string; author: { name: string } }[];
}

const DEMO_POSTS: Post[] = [
  {
    id: 'post-1',
    title: 'Thông báo chính thức: Triển khai Platform AVG One đợt 1 cho 20 Nhân sự Chủ chốt',
    content: 'Kính gửi toàn thể Cán bộ Nhân viên AVG! Nhằm nâng cao hiệu quả vận hành và số hóa quy trình phê duyệt đề xuất, Ban Giám Đốc chính thức đưa Platform AVG One vào sử dụng thử nghiệm. Mọi đề xuất tạm ứng, nghỉ phép và giao đơn hàng R&D sẽ được thực hiện trực tiếp trên hệ thống.',
    category: 'THÔNG BÁO',
    isPinned: true,
    likesCount: 14,
    author: { name: 'Nguyễn Văn Quản Lý (CEO)', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', role: 'ADMIN' },
    createdAt: '27/08/2026 09:30',
    comments: [
      { id: 'c1', content: 'Tuyệt vời quá sếp ơi! Hệ thống rất mượt.', author: { name: 'Lê Văn Nhân Viên' } },
      { id: 'c2', content: 'Phòng HR đã sẵn sàng triển khai quy trình phê duyệt mới.', author: { name: 'Trần Thị Trưởng Phòng' } }
    ]
  },
  {
    id: 'post-2',
    title: 'Định hướng Phát triển Sản phẩm Cảm biến AI Sensor AVG-X Quý 3/2026',
    content: 'Nhóm R&D phòng 3.1 đã hoàn tất giai đoạn nghiên cứu bo mạch điều khiển mới. Đề nghị các bộ phận liên quan chuẩn bị tài liệu kỹ thuật để phối hợp đăng ký bản quyền SHTT.',
    category: 'CHỈ ĐẠO',
    isPinned: false,
    likesCount: 9,
    author: { name: 'Lê Văn Nhân Viên (Trưởng nhóm R&D)', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', role: 'STAFF' },
    createdAt: '26/08/2026 14:15',
    comments: []
  }
];

export const InsideModule: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(DEMO_POSTS);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [category, setCategory] = useState('THÔNG BÁO');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      title: newTitle,
      content: newContent,
      category,
      isPinned: false,
      likesCount: 1,
      author: { name: 'Nguyễn Văn Quản Lý (CEO)', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', role: 'ADMIN' },
      createdAt: new Date().toLocaleString('vi-VN'),
      comments: []
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setShowCreateModal(false);
  };

  const handleLike = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likesCount: p.likesCount + 1 } : p));
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, { id: `c-${Date.now()}`, content: text, author: { name: 'Tôi' } }]
        };
      }
      return p;
    }));

    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  return (
    <div className="inside-module-container w-full h-full flex-1 min-h-0 overflow-hidden bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 font-sans p-3 sm:p-4 relative flex flex-col justify-between">
      
      {/* 🌐 GRID LINES PATTERN BACKGROUND LAYER */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:2.5rem_2.5rem] opacity-45 pointer-events-none -z-0" />

      {/* 🎨 AMBIENT GLOW ORBS */}
      <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-[#0284C7]/15 dark:bg-[#0284C7]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />
      <div className="absolute -top-20 -right-20 w-[450px] h-[450px] bg-[#F15A24]/15 dark:bg-[#F15A24]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />

      {/* MAIN CONTAINER CONTENT */}
      <div className="w-full h-full flex flex-col space-y-3.5 relative z-10 overflow-hidden">

        {/* 🔮 TOP BANNER EXECUTIVE DASHBOARD WITH SLOGAN BOX BADGE & BRUSH STROKE */}
        <div className="flex-shrink-0 bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-[24px] p-4 sm:p-5 shadow-xs relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Title & Slogan Badge Box */}
            <div className="space-y-2 text-left">
              <div className="relative inline-block p-0.5 rounded-xl transition-all duration-300">
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-xl" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                  <defs>
                    <linearGradient id="inside-slogan-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0284C7" />
                      <stop offset="35%" stopColor="#00A8E8" />
                      <stop offset="70%" stopColor="#FF7043" />
                      <stop offset="100%" stopColor="#F15A24" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="1"
                    y="1"
                    width="calc(100% - 2px)"
                    height="calc(100% - 2px)"
                    rx="8"
                    ry="8"
                    fill="none"
                    stroke="url(#inside-slogan-border-gradient)"
                    strokeWidth="1.5"
                    className="animate-slogan-box-border"
                  />
                </svg>
                <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-transparent text-xs font-extrabold text-slate-700 dark:text-slate-200 tracking-wide uppercase">
                  <Newspaper className="w-3.5 h-3.5 text-[#00A8E8]" />
                  <span>AVG INSIDE & INTERNAL BULLETIN</span>
                </div>
              </div>

              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#231F20] dark:text-white tracking-tight flex items-baseline gap-2 flex-wrap">
                  <span>BẢNG TIN NỘI BỘ</span>
                  <span className="relative inline-block px-1 font-black bg-clip-text text-transparent bg-gradient-to-r from-[#F15A24] to-amber-500">
                    <span className="relative z-10">AVG INSIDE</span>
                    <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#F15A24] opacity-50 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                      <path d="M 0,10 Q 100,2 200,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-3" />
                    </svg>
                  </span>
                </h1>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Kênh thông tin điều hành chính thức & Văn hóa doanh nghiệp AVG
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-[#F15A24] hover:bg-[#ea580c] text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Đăng Bài Viết Mới
            </button>

          </div>
        </div>

        {/* Posts Feed Area (Scrollable Area) */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`bg-white/90 dark:bg-slate-900/90 rounded-2xl p-6 border transition shadow-xs ${
                post.isPinned
                  ? 'border-purple-300 dark:border-purple-800/60 ring-1 ring-purple-500/20'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Post Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-purple-500/20"
                  />
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                      {post.author.name}
                    </h3>
                    <p className="text-xs text-slate-400">{post.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {post.isPinned && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-purple-600 bg-purple-50 dark:bg-purple-900/40 dark:text-purple-300 px-2.5 py-1 rounded-md border border-purple-200 dark:border-purple-700">
                      <Pin className="w-3 h-3 fill-current" /> Đã ghim
                    </span>
                  )}
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                    {post.category}
                  </span>
                </div>
              </div>

            {/* Title & Body */}
            <div className="mt-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {post.title}
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>

            {/* Actions Bar */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition"
              >
                <ThumbsUp className="w-4 h-4" /> Thích ({post.likesCount})
              </button>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <MessageSquare className="w-4 h-4" /> {post.comments.length} Bình luận
              </span>
            </div>

            {/* Comments List */}
            {post.comments.length > 0 && (
              <div className="mt-4 space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                {post.comments.map((c) => (
                  <div key={c.id} className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl text-xs">
                    <span className="font-bold text-purple-700 dark:text-purple-400 mr-2">{c.author.name}:</span>
                    <span className="text-slate-700 dark:text-slate-300">{c.content}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Write Comment Input */}
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="Viết bình luận của bạn..."
                value={commentInputs[post.id] || ''}
                onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-slate-100"
              />
              <button
                onClick={() => handleAddComment(post.id)}
                className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Tạo Bài Viết Truyền Thông Mới</h2>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Chuyên mục</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100"
                >
                  <option value="THÔNG BÁO">THÔNG BÁO</option>
                  <option value="CHỈ ĐẠO">CHỈ ĐẠO</option>
                  <option value="VĂN HÓA">VĂN HÓA DOANH NGHIỆP</option>
                  <option value="TIN TỨC">TIN TỨC SẢN PHẨM</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tiêu đề bài viết</label>
                <input
                  type="text"
                  required
                  placeholder="Nhập tiêu đề thông báo..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nội dung chi tiết</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Nhập nội dung bài viết chỉ đạo hoặc tin tức..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow transition"
                >
                  Đăng ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};
