// import './index.css
import { InferGetServerSidePropsType } from 'next';
import style from './index.module.css';

export const getServerSideProps = () => {
  // 병렬 형식
  // const [allBooks, recoBooks] = await Promise.all([
  //   fetchBooks(),
  //   fetchRandomBooks(),
  // ])
  const data = "hello";
  return {
    props: {
      data,
    }
  }
}
export default function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="page-content">

            <h1 className={style.h1}>인덱스</h1>
            <h2 className={style.h2}>H2</h2>

          </div>
        </div>
      </div>
    </div>

  );
}
Home.searchVisible = true;
