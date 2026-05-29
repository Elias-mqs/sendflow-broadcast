import { CheckCircle } from '@mui/icons-material'

const FEATURES = [
  'Gerencie múltiplas conexões WhatsApp',
  'Envie mensagens em massa com segurança',
  'Acompanhe entregas em tempo real',
]

export const BrandPanel = () => (
  <div
    className="hidden lg:flex flex-col justify-between w-[44%] shrink-0 p-12 relative overflow-hidden"
    style={{ background: 'linear-gradient(145deg, #0F172A 0%, #1E3A5F 60%, #1B4490 100%)' }}
  >
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(37,99,235,0.18) 0%, transparent 55%),
          radial-gradient(circle at 80% 15%, rgba(99,102,241,0.12) 0%, transparent 45%),
          radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)
        `,
        backgroundSize: 'auto, auto, 28px 28px',
      }}
    />

    <div className="relative z-10 flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #3B82F6, #6366F1)',
          boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
        }}
      >
        <span className="text-white font-extrabold text-lg leading-none">S</span>
      </div>
      <span className="text-white font-bold text-xl tracking-[-0.02em]">SendFlow</span>
    </div>

    <div className="relative z-10">
      <h2 className="text-white font-bold text-[30px] xl:text-[36px] leading-tight tracking-[-0.02em] mb-2">
        Alcance seus contatos.{' '}
        <span className="text-[#60A5FA]">Escale sua mensagem.</span>
      </h2>
      <p className="text-white/50 text-[15px] leading-[1.7] mb-10">
        Plataforma de disparo em massa para WhatsApp com gestão inteligente de conexões e contatos.
      </p>
      <div className="flex flex-col gap-6">
        {FEATURES.map((feature) => (
          <div key={feature} className="flex items-center gap-4">
            <CheckCircle style={{ fontSize: 18, color: '#60A5FA', flexShrink: 0 }} />
            <span className="text-white/75 text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="relative z-10">
      <p className="text-white/30 text-xs">© 2025 SendFlow. Todos os direitos reservados.</p>
    </div>
  </div>
)
