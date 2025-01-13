import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import SearchLayout from "./search-layout";

export default function GlobalLayout({ children, searchVisible }: {
  children: ReactNode,
  searchVisible: boolean
}) {
  const [navIsVisible, setNavVisible] = useState(false);
  const navRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => {
    setNavVisible((prev) => !prev);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setNavVisible(false);
      }
    };
    if (navIsVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, [navIsVisible]);
  return <>
    <div>

      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <Link href="/" className="logo">
                  <Image
                    src="/images/logo.png" // `../../public` 제거
                    alt=""
                    layout="intrinsic"
                    width={100}// 비율 유지용으로만 사용
                    height={100}
                  />
                </Link>
                {searchVisible && <SearchLayout />}
                <ul className="nav" style={{ display: `${navIsVisible ? "block" : ""}` }}>
                  <li><Link href="/" className="active">Home</Link></li>
                  <li><Link href="/item">아이템</Link></li>
                  <li><Link href="/map">맵</Link></li>
                  <li><Link href="/search">Search</Link></li>
                  <li><Link href="#">로그인
                    <Image
                      src="/images/profile-header.jpg"
                      alt=""
                      width={30}
                      height={30}
                    /></Link></li>
                </ul>

                <button className={`menu-trigger ${navIsVisible ? "active" : ""}`}
                  onClick={toggleMenu}>
                  <span>Menu</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <main>
        {children}
      </main>
      <footer></footer>
    </div>
  </>
}