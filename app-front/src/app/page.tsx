"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="container py-5">
      <div className="row row-cols-1 row-cols-md-3 g-4">


        <div className="col" onClick={() => handleCardClick('/iga')}>
          <div className="template-card position-relative">
            <Image
              src="/assets/example01.png"
              alt="Logo"
              width={400}
              height={200}
              className="logo" />
            <div className="p-3">
              <h5 className="fw-bold">캠페인별 수익 내용</h5>
              <div className="d-flex justify-content-between align-items-center">
                <div><i className="fas fa-shopping-cart"></i> 40 Purchases</div>
                <div className="fw-bold">$39</div>
              </div>
              <div className="mt-2">
                <span className="text-warning"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></span>
              </div>
            </div>
          </div>
        </div>

        <div className="col" onClick={() => handleCardClick('/iga2')}>
          <div className="template-card position-relative">
            <Image
              src="/assets/example02.png"
              alt="Logo"
              width={400}
              height={200}
              className="logo" />

            <div className="p-3">
              <h5 className="fw-bold">월별 성과</h5>
              <div className="d-flex justify-content-between align-items-center">
                <div><i className="fas fa-shopping-cart"></i> 2807 Purchases</div>
                <div className="fw-bold">$39</div>
              </div>
              <div className="mt-2">
                <span className="text-warning"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></span>
              </div>
            </div>
          </div>
        </div>

        <div className="col" onClick={() => handleCardClick('/iga3')}>
          <div className="template-card position-relative">
            <Image
              src="/assets/example03.png"
              alt="Logo"
              width={400}
              height={200}
              className="logo" />

            <div className="p-3">
              <h5 className="fw-bold">캠페인 ROI 분석</h5>
              <div className="d-flex justify-content-between align-items-center">
                <div><i className="fas fa-shopping-cart"></i> 202 Purchases</div>
                <div className="fw-bold">$39</div>
              </div>
              <div className="mt-2">
                <span className="text-warning"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
