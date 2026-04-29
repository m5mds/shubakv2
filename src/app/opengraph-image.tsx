import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'shubak — Product Studio · Saudi Arabia'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0F',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 96px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-80px',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(233,139,42,0.18) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '48px',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="2" y="2" width="28" height="28" rx="3" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <path d="M2 10h28M10 2v28M22 2v28M2 22h28" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          </svg>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            shubak.ai
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: '600',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#F3EEE4',
            marginBottom: '24px',
          }}
        >
          شُبّاك
          <span style={{ color: '#E98B2A' }}> ·</span>
        </div>
        <div
          style={{
            fontSize: '32px',
            fontWeight: '400',
            color: 'rgba(243,238,228,0.55)',
            letterSpacing: '-0.01em',
            marginBottom: '40px',
          }}
        >
          Product Studio · Saudi Arabia
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {['Web', 'Mobile', 'AI', 'Design', 'Automation'].map((tag) => (
            <div
              key={tag}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '100px',
                padding: '8px 18px',
                fontSize: '13px',
                color: 'rgba(243,238,228,0.6)',
                letterSpacing: '0.04em',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
