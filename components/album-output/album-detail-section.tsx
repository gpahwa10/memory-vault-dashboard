import localFont from "next/font/local"

const gtSuperDisplay = localFont({
    src: "../../public/fonts/gt-super-ds-trial/GT-Super-Display-Regular-Trial.otf",
    display: "swap",
  })
  
  const jost = localFont({
    src: "../../public/fonts/Jost/static/Jost-Regular.ttf",
    display: "swap",
  })

  const albumDetailHighlights = [
    {
      id: 1,
      text: "Custom Wedding Cover",
      image: "/album-outputs/book.svg",
    },
    {
        id: 2,
        text: "Premium Color Printing",
        image: "/album-outputs/color-picker.svg",
    },
    {
        id: 3,
        text: "Tear Proof Pages",
        image: "/album-outputs/gallery.svg",
    },
    {
        id: 4,
        text: "Grid Layout",
        image: "/album-outputs/grid.svg",
    },
  ]

export const AlbumDetailSection = () => {
  return (
    <section className="flex w-full min-w-0 flex-1 flex-col items-center gap-10 overflow-x-hidden bg-[#EDE9DF] px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 md:gap-14 md:px-10 lg:gap-16 lg:px-14 xl:px-20 2xl:px-32 min-[1920px]:px-[240px]">
      <div className="flex w-full min-w-0 max-w-[1200px] flex-col items-start gap-8 sm:gap-10 md:gap-12">
        <span
          className={`${jost.className} flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-[#615F5A]`}
        >
          <span>Back to Memory Vault</span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#CAA64A]" aria-hidden />
            <span>6 mins read</span>
          </span>
        </span>
        <h1
          className={`${gtSuperDisplay.className} text-balance text-2xl font-normal leading-tight text-[#12473A] sm:text-3xl md:text-4xl`}
        >
          Designed for Calm <span className="text-[#CAA64A]">Lasting Moments</span>
        </h1>
        <p
          className={`${jost.className} text-pretty text-md font-normal leading-relaxed text-[#615F5A] sm:text-md md:text-lg lg:text-lg xl:text-xl`}
        >
          A wedding album should do more than collect photographs. It should shape the memory of the day into something that can be revisited slowly, page by page, long after the celebration is over. That is why this page works best when it reads like an editorial detail story rather than a heavy product landing page.
        </p>
        <p
          className={`${jost.className} text-pretty text-md font-normal leading-relaxed text-[#615F5A] sm:text-md md:text-lg lg:text-lg xl:text-xl`}
        >
          The page begins with a strong visual impression, guiding users through thoughtfully crafted content, balanced visual pauses, and an elegant, blog-inspired layout that creates a smooth, immersive storytelling experience.
        </p>
      </div>
      <div className="flex w-full min-w-0 max-w-[1200px] flex-col items-stretch justify-center gap-5 sm:flex-row sm:gap-5 md:gap-6">
        <img
          src="/album-outputs/album-output-1.svg"
          alt="Album spread preview one"
          className="h-auto w-full min-w-0 flex-1 object-contain"
        />
        <img
          src="/album-outputs/album-output-2.svg"
          alt="Album spread preview two"
          className="h-auto w-full min-w-0 flex-1 object-contain"
        />
      </div>
      <div className="flex w-full min-w-0 max-w-[1200px] flex-col items-start gap-4 sm:gap-5">
        <h2
          className={`${gtSuperDisplay.className} text-balance text-2xl font-normal text-[#12473A] sm:text-3xl md:text-[32px]`}
        >
          Design That Supports the Story
        </h2>
        <p
          className={`${jost.className} text-pretty text-md font-normal leading-relaxed text-[#615F5A] sm:text-md md:text-lg lg:text-lg xl:text-xl`}
        >
          In the reference page, the structure works because the content is broken into clear, elegant reading sections with strong headings, full-width imagery, and comfortable rhythm. That same approach suits this wedding page well, especially once the viewer has already seen the book preview in the first fold.
        </p>
        <p
          className={`${jost.className} text-pretty text-md font-normal leading-relaxed text-[#615F5A] sm:text-md md:text-lg lg:text-lg xl:text-xl`}
        >
          Here, the layout becomes more about explanation and reflection. It allows the album to feel premium through clarity, not clutter — which is often what makes editorial pages feel more polished than traditional feature-heavy landing sections.
        </p>
      </div>
      <div className="flex w-full min-w-0 max-w-[1200px] flex-col items-start gap-4 sm:gap-5">
        <h2
          className={`${gtSuperDisplay.className} text-balance text-2xl font-normal text-[#12473A] sm:text-3xl md:text-[32px]`}
        >
          Full-Spread Editorial Calm Rhythm
        </h2>
        <p
            className={`${jost.className} text-pretty text-md font-normal leading-relaxed text-[#615F5A] sm:text-md md:text-lg lg:text-lg xl:text-xl`}
        >
          This section works as a pause between reading blocks. It gives the eye room to rest while reinforcing the emotional value of the album. In a blog-details style page, these image-led moments are what keep long-form content from feeling too dense.
        </p>
      </div>
      <div className="grid w-full min-w-0 max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-6">
        {albumDetailHighlights.map((highlight) => (
          <div
            key={highlight.id}
            className="flex min-h-[180px] w-full min-w-0 flex-col items-start justify-center gap-6 rounded-[12px] border-b border-b-[#D9D6CF] bg-white p-6 sm:min-h-[204px] sm:gap-6 sm:p-8 md:p-10 lg:p-[42px]"
          >
            <img
              src={highlight.image}
              alt=""
              className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16"
            />
            <p
              className={`${gtSuperDisplay.className} text-pretty text-xl font-normal text-[#1D453A] sm:text-[22px] md:text-[24px]`}
            >
              {highlight.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}