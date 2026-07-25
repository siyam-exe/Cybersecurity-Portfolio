export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-24" role="status" aria-live="polite">
      <p className="text-primary"><span aria-hidden="true">{">"}</span> Loading...</p>
    </div>
  )
}
