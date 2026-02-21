export function MediaPageContent() {
  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Photos & Videos
        </h1>
        <p className="mt-1 text-muted-foreground">
          All your uploaded media in one place
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-card shadow-sm"
          >
            <img
              src={`/samples/memory-${i}.jpg`}
              alt={`Memory ${i}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-dashed border-vault-gold/40 bg-vault-gold/5 p-8 text-center">
        <p className="text-sm italic text-muted-foreground">
          Also showing low quality media for review
        </p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <div className="rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive">
            2 low quality photos detected
          </div>
        </div>
      </div>
    </div>
  )
}
