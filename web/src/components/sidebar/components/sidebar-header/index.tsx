export const SidebarHeader = () => (
  <div className="p-5 border-b border-slate-100 flex items-center gap-3">
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
      style={{
        background: 'linear-gradient(135deg, #3B82F6, #6366F1)',
        boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
      }}
    >
      <span className="text-white font-extrabold text-lg leading-none">S</span>
    </div>
    <span className="font-bold text-xl tracking-[-0.02em] text-slate-900">SendFlow</span>
  </div>
)
