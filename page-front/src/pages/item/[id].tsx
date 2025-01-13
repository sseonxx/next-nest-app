import Image from "next/image";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function Page() {
  const [presetData, setPresetData] = useState({});

  const router = useRouter();
  console.log(router);
  /*
  http://localhost:3000/item/15435
  query: {id: '15435'}
  */

  const { id } = router.query;
  const mockData = {
    imgUrl: "https://maplestory.io/api/gms/62/item/1382007/icon?resize=2",
    category: "아이템",
    category1: "무기",
    category2: "한손무기",
    category3: "스태프",
    item_name: "이블윙즈", need_level: 65, need: {
      int
        : 198, luk: 68, job:
        "법사"
    }, item_stat: 0
  }
  useEffect(() => {
    const extractData = (data: string, variableName: string) => {
      const regex = new RegExp(`var ${variableName}\\s*=\\s*(\\[.+?\\]);`, "s");
      const match = data.match(regex);
      return match ? match[1] : null;
    };
    const sanitizeData = (rawData: string | null): string | null => {
      if (!rawData) return null; // 입력값이 null이면 그대로 반환
    
      return rawData
       // 작은따옴표를 큰따옴표로 변환
       .replace(/'/g, '"')
      // 문자열 중간의 "s를 's로 복구
      .replace(/"\b(.*?)\b"s\b/g, '"$1\'s')
      // 문자열 값 중간에 있는 잘못된 큰따옴표 처리
      .replace(/"\s*(\w+)\s*"\s*(\w+)/g, '"$1 $2')
      // 문자열 내부 중첩된 큰따옴표를 작은따옴표로 변환
      .replace(/"(.*?)"(.*?)"(.*?)"/g, '"$1\'$2\'$3"');
    };

    

    fetch('/api/proxy')
      .then((res) => res.text())
      .then((data) => {
        console.log("data >>", data);
        const rawITEMS = extractData(data, "ITEMS");
        const rawMOBS = extractData(data, "MOBS");
        const rawMAPS = extractData(data, "MAPS");
        console.log(rawITEMS);
        console.log(rawMOBS);
        console.log(rawMAPS);

        const result = {
          items:sanitizeData(rawITEMS),
          mobs: sanitizeData(rawMOBS),
          maps: sanitizeData(rawMAPS)
        }
        console.log("result >>", result.items?.slice(220040,225000));
        // console.log(JSON.parse(result.items || ""));


      });

  }, []);

  useEffect(() => {
  }, [presetData])



  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-content">
              <div className="row">
                <div className="col-lg-12">
                  <div className="main-profile ">
                    <div className="row" style={{ marginBottom: '20px' }}>
                      <div className="col-lg-12">
                        <div className="text-center">
                          <Image
                            src={mockData.imgUrl}
                            alt=""
                            // layout="intrinsic"
                            sizes="100%"
                            width={0}
                            height={0}
                            style={{ width: 'auto', height: 'auto', marginBottom: '10px', backgroundColor: '#EFEFE3', padding: '15px', borderRadius: '7px' }}
                          />
                        </div>
                        <div className="main-info header-text text-center">
                          {/* <span>아이템</span> */}
                          <h4 style={{ marginBottom: 0 }}>{mockData.item_name}</h4>
                          <p>{"Evil Wings"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-4 ">
                        <ul>
                          <li>직업<span>법사</span></li>
                          <li>공격력<span>+53 (48-58)</span></li>
                          <li>마력<span>+80 (75-85)</span></li>
                          <li>필요레벨 <span>65</span></li>
                        </ul>
                      </div>
                      <div className="col-lg-4">
                        <ul>
                          <li>INT 198 <span>198</span></li>
                          <li>LUK <span>68</span></li>
                          <li>공격 속도 <span>빠름  (4)</span></li>
                          <li>업그레이드 가능 횟수 <span>7</span></li>
                          <li>상점 판매가 <span>200,000</span></li>
                        </ul>
                      </div>
                      <div className="col-lg-4">
                        <ul>
                          <li>분류<span>무기</span></li>
                          <li>카테고리 <span>한손무기</span></li>
                          <li>부 카테고리 <span>스태프</span></li>
                          <li>주 카테고리 <span>장비</span></li>
                        </ul>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="clips">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="heading-section">
                                <h4><em>Your Most Popular</em> Clips</h4>
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                              <div className="item">
                                <div className="thumb">
                                  <Image src="/images/clip-01.jpg" alt="" layout="intrinsic"
                                    width={100}
                                    height={100} />
                                  <a href="https://www.youtube.com/watch?v=r1b03uKWk_M" target="_blank"><i className="fa fa-play"></i></a>
                                </div>
                                <div className="down-content">
                                  <h4>First Clip</h4>
                                  <span><i className="fa fa-eye"></i> 250</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                              <div className="item">
                                <div className="thumb">
                                  <Image src="/images/clip-02.jpg" alt="" layout="intrinsic"
                                    width={100}
                                    height={100} />
                                  <a href="https://www.youtube.com/watch?v=r1b03uKWk_M" target="_blank"><i className="fa fa-play"></i></a>
                                </div>
                                <div className="down-content">
                                  <h4>Second Clip</h4>
                                  <span><i className="fa fa-eye"></i> 183</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                              <div className="item">
                                <div className="thumb">
                                  <Image src="/images/clip-03.jpg" alt="" layout="intrinsic"
                                    width={100}
                                    height={100} />
                                  <a href="https://www.youtube.com/watch?v=r1b03uKWk_M" target="_blank"><i className="fa fa-play"></i></a>
                                </div>
                                <div className="down-content">
                                  <h4>Third Clip</h4>
                                  <span><i className="fa fa-eye"></i> 141</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                              <div className="item">
                                <div className="thumb">
                                  <Image src="/images/clip-04.jpg" alt="" layout="intrinsic"
                                    width={100}
                                    height={100} />
                                  <a href="https://www.youtube.com/watch?v=r1b03uKWk_M" target="_blank"><i className="fa fa-play"></i></a>
                                </div>
                                <div className="down-content">
                                  <h4>Fourth Clip</h4>
                                  <span><i className="fa fa-eye"></i> 91</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="main-button">
                                <a href="#">Load More Clips</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}