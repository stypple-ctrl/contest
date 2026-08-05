import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "교육정보 찾기",
    template: "%s · 교육정보 찾기",
  },
  description:
    "초·중·고 학생에게 안내할 공모전·대외활동·문화행사를 학년, 지역, 일정으로 검색하고 안내문으로 정리합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <header className="sticky top-0 z-40 border-b border-[#E5E8EB] bg-white/88 backdrop-blur">
          <div className="mx-auto flex min-h-[var(--header-h)] max-w-[var(--max-wide)] flex-wrap items-center justify-between gap-2 px-[var(--pad-x)] py-3 sm:flex-nowrap sm:py-0">
            <Link href="/search" className="whitespace-nowrap text-lg font-black tracking-normal text-[#191F28] sm:text-xl">
              교육정보 찾기
            </Link>
            <nav className="flex max-w-full items-center gap-1 overflow-x-auto text-sm font-extrabold text-[#6B7684] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <Link className="rounded-full px-3 py-1.5 whitespace-nowrap hover:bg-[#F2F4F6] hover:text-[#191F28]" href="/search">
                통합검색
              </Link>
              <Link className="rounded-full px-3 py-1.5 whitespace-nowrap hover:bg-[#F2F4F6] hover:text-[#191F28]" href="/contest">
                공모전
              </Link>
              <Link className="rounded-full px-3 py-1.5 whitespace-nowrap hover:bg-[#F2F4F6] hover:text-[#191F28]" href="/culture">
                문화행사
              </Link>
              <Link className="rounded-full px-3 py-1.5 whitespace-nowrap hover:bg-[#F2F4F6] hover:text-[#191F28]" href="/contest/blog">
                블로그 글감
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
