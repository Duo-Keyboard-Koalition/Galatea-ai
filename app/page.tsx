import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="ml-[-30px]" style={{ fontSize: '48px' }}>Reel It Back</h1>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          From fantasy to <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">reality</code>
        </ol>

        <div className="flex gap-1 items-center justify-center flex-col sm:flex-row">
          <a
            className="rounded-full ml-4 border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/map"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Open Map
          </a>
        </div>
      </main>
      <footer className="row-start-3 ml-[-40px] flex gap-2 flex-wrap items-center justify-center">
        By
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/amr-radwan1/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Amr Radwan
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/codejediatuw/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Darcy Liu
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/steven-lui-01/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Steven Lui
        </a>
      </footer>
    </div>
  );
}
