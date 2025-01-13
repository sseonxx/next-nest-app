import { ItemData } from "@/types";
import Image from "next/image";

export default function SearchItem({
  id,
  name,
  description,
  coverImgUrl
}: ItemData) {
  return (<>
    <div className="col-lg-3 col-sm-6">
      <div className="item">
        <Image
          src="/images/popular-04.jpg"
          alt=""
          layout="intrinsic"
          width={100}
          height={100}
        />
        <h4>{name}{id}<br />
          <span>{description}</span>
          <span>Legendary</span>
        </h4>
        <ul>
          <li><i className="fa fa-star"></i> 4.8</li>
          <li><i className="fa fa-download"></i> 2.3M</li>
          <li><i className="fa fa-download"></i> 2.3M</li>
        </ul>
      </div>
    </div></>)
}