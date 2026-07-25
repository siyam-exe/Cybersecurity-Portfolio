"use client"

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="bg-black p-8 font-mono text-white">
        <main>
          <h1 className="text-2xl font-bold text-emerald-400">System error</h1>
          <p className="mt-4 text-zinc-300">The portfolio could not be loaded.</p>
          <button type="button" onClick={reset} className="mt-6 border border-emerald-400 px-4 py-2 text-emerald-400">Try again</button>
        </main>
      </body>
    </html>
  )
}
