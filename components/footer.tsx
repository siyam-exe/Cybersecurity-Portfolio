export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-background/80 backdrop-blur-md py-6 mt-20">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p className="font-mono">
          <span className="text-primary">{">"}</span> © {new Date().getFullYear()} Alif Abedin Siyam | 1tsD@M0nk3
        </p>
      </div>
    </footer>
  )
}
