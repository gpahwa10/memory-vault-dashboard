export function EditBookPageContent() {
  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Edit Book Details
        </h1>
        <p className="mt-1 text-muted-foreground">
          Customize your memory book
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            Book Information
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Book Title
              </label>
              <input
                type="text"
                defaultValue="Our Baby Book"
                className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Subtitle
              </label>
              <input
                type="text"
                defaultValue="A Collection of Precious Memories"
                className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Category
              </label>
              <select className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20">
                <option>Baby</option>
                <option>Wedding</option>
                <option>Travel</option>
                <option>Family</option>
              </select>
            </div>
            <button className="mt-2 rounded-lg bg-vault-teal px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-vault-teal-dark">
              Save Changes
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            Book Theme
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: "Classic Cream", bg: "bg-[#faf6ef]", border: "border-vault-gold" },
              { name: "Soft Teal", bg: "bg-vault-teal/10", border: "border-vault-teal" },
              { name: "Warm Gold", bg: "bg-vault-gold/10", border: "border-vault-gold" },
              { name: "Rose", bg: "bg-pink-50", border: "border-pink-300" },
              { name: "Sky Blue", bg: "bg-blue-50", border: "border-blue-300" },
              { name: "Sage", bg: "bg-emerald-50", border: "border-emerald-300" },
            ].map((theme) => (
              <button
                key={theme.name}
                className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                  theme.name === "Classic Cream"
                    ? theme.border + " shadow-sm"
                    : "border-border"
                }`}
              >
                <div
                  className={`h-12 w-full rounded-md ${theme.bg} border border-border`}
                />
                <span className="text-xs font-medium text-foreground">
                  {theme.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
