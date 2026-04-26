import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-6 py-24">
      <div className="w-full max-w-xl rounded-[12px] border border-white/[0.06] bg-[#111118] text-center">
        <div className="flex h-[22px] items-center gap-1.5 border-b border-white/[0.06] px-3">
          <div className="h-[6px] w-[6px] rounded-full bg-white/18" />
          <div className="h-[6px] w-[6px] rounded-full bg-white/18" />
          <div className="h-[6px] w-[6px] rounded-full bg-white/18" />
        </div>

        <div className="px-8 py-12 md:px-12 md:py-14">
          <div className="mb-6 text-[clamp(64px,14vw,140px)] font-light leading-none text-white/12 select-none">
            404
          </div>

          <p className="mx-auto mb-10 max-w-sm text-[15px] leading-relaxed text-white/45">
            This window doesn&apos;t exist. Let&apos;s take you back.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-full border border-white/10 px-6 py-2.5 text-[11px] uppercase tracking-[0.15em] text-white/50 transition-all duration-500 hover:border-white/25 hover:text-white"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
