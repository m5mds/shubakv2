'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f]">
      <div className="text-center">
        <p className="text-[16px] text-white/80">Something went wrong.</p>
        <button
          onClick={reset}
          className="mt-4 rounded-full border border-white/15 px-5 py-2 text-[12px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:border-white/30 hover:text-white"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
