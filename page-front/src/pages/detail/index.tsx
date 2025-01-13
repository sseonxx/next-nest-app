import Image from "next/image";

export default function Detail() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-content">
              <div className="row">
                <div className="col-lg-12">
                  <div className="main-profile ">
                    <div className="row">
                      <div className="col-lg-4">
                        <Image
                          src="/images/profile.jpg"
                          alt=""
                          layout="intrinsic"
                          width={100}
                          height={100} />
                      </div>
                      <div className="col-lg-4 align-self-center">
                        <div className="main-info header-text">
                          <span>Offline</span>
                          <h4>Alan Smithee</h4>
                          <p>You Haven&apos;t Gone Live yet. Go Live By Touching The Button Below.</p>
                          <div className="main-border-button">
                            <a href="#">Start Live Stream</a>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 align-self-center">
                        <ul>
                          <li>Games Downloaded <span>3</span></li>
                          <li>Friends Online <span>16</span></li>
                          <li>Live Streams <span>None</span></li>
                          <li>Clips <span>29</span></li>
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