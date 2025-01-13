import SearchItem from "@/components/search-item";
import Image from "next/image";
import { useRouter } from "next/router"
/*
http://localhost:3000/search

--> http://localhost:3000/search?q=박서은
 */
export default function Page() {
  const router = useRouter();
  const { q } = router.query;

  console.log(router);
  console.log("q>>", q);



  return (<>
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="page-content">
            <div className="most-popular">
              <div className="row">
                <div className="col-lg-12">
                  {/* <div className="heading-section">
                    <h4><em>Most Popular</em> Right Now</h4>
                  </div> */}
                  <div className="heading-section">
                    <select defaultValue={0}>
                      <option value={0}>테스트</option>
                      <option value={1}>테스트1</option>
                      <option value={2}>테스트2</option>
                    </select>
                    <select defaultValue={0}>
                      <option value={0}>테스트</option>
                      <option value={1}>테스트1</option>
                      <option value={2}>테스트2</option>
                    </select>

                  </div>
                  <div className="row">
                    {/* {[...Array(7)].map((index) => <SearchItem id={index} />)} */}
                    {[...Array(7)].map((_, index) => <SearchItem key={index} id={index} {..._} />)}
                    <div className="col-lg-3 col-sm-6">
                      <div className="item">
                        <Image src="/images/popular-02.jpg" alt="" layout="intrinsic"
                          width={100}// 비율 유지용으로만 사용
                          height={100} />
                        <h4>PubG<br /><span>Battle S</span></h4>
                        <ul>
                          <li><i className="fa fa-star"></i> 4.8</li>
                          <li><i className="fa fa-download"></i> 2.3M</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="item">
                        <Image src="/images/popular-03.jpg" alt="" layout="intrinsic"
                          width={100}// 비율 유지용으로만 사용
                          height={100} />
                        <h4>Dota2<br /><span>Steam-X</span></h4>
                        <ul>
                          <li><i className="fa fa-star"></i> 4.8</li>
                          <li><i className="fa fa-download"></i> 2.3M</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="item">
                        <Image src="/images/popular-04.jpg" alt="" layout="intrinsic"
                          width={100}// 비율 유지용으로만 사용
                          height={100} />
                        <h4>CS-GO<br /><span>Legendary</span></h4>
                        <ul>
                          <li><i className="fa fa-star"></i> 4.8</li>
                          <li><i className="fa fa-download"></i> 2.3M</li>
                        </ul>
                      </div>
                    </div>
                    {/* <div className="col-lg-6">
                      <div className="item">
                        <div className="row">
                          <div className="col-lg-6 col-sm-6">
                            <div className="item inner-item">
                              <Image src="/images/popular-05.jpg" alt="" layout="intrinsic"
                                width={100}// 비율 유지용으로만 사용
                                height={100} />
                              <h4>Mini Craft<br /><span>Legendary</span></h4>
                              <ul>
                                <li><i className="fa fa-star"></i> 4.8</li>
                                <li><i className="fa fa-download"></i> 2.3M</li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-lg-6 col-sm-6">
                            <div className="item">
                              <Image src="/images/popular-06.jpg" alt="" layout="intrinsic"
                                width={100}// 비율 유지용으로만 사용
                                height={100} />
                              <h4>Eagles Fly<br /><span>Matrix Games</span></h4>
                              <ul>
                                <li><i className="fa fa-star"></i> 4.8</li>
                                <li><i className="fa fa-download"></i> 2.3M</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div className="col-lg-3 col-sm-6">
                      <div className="item">
                        <Image src="/images/popular-07.jpg" alt="" layout="intrinsic"
                          width={100}// 비율 유지용으로만 사용
                          height={100} />
                        <h4>Warface<br /><span>Max 3D</span></h4>
                        <ul>
                          <li><i className="fa fa-star"></i> 4.8</li>
                          <li><i className="fa fa-download"></i> 2.3M</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="item">
                        <Image src="/images/popular-08.jpg" alt="" layout="intrinsic"
                          width={100}// 비율 유지용으로만 사용
                          height={100} />
                        <h4>Warcraft<br /><span>Legend</span></h4>
                        <ul>
                          <li><i className="fa fa-star"></i> 4.8</li>
                          <li><i className="fa fa-download"></i> 2.3M</li>
                        </ul>
                      </div>
                    </div>
                    {/* <div className="col-lg-12">
                      <div className="main-button">
                        <a href="browse.html">Discover Popular</a>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </>)
}

Page.searchVisible = true;