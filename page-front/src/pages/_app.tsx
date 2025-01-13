import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import "../../public/vendor/bootstrap/css/bootstrap.min.css";
import "../../public/css/fontawesome.css";

import "../../public/css/templatemo-cyborg-gaming.css";
import "../../public/css/owl.css"
import "../../public/css/animate.css"

import type { AppProps } from "next/app";

type AppPropsWithLayout = AppProps & {
  Component: {
    searchVisible?: boolean // ? 을 표시하여 선택적 속성임을 설정
    /* 
    만약 ?가 없다면 모든 페이지에서 
    searchVisible을 설정해야하며 그렇지 않을시 
    typescript가 에러를 던진다

    * ?는 타입 체크의 유연성:
    모든 페이지가 searchVisible을 설정하지 않아도 되게 해줌.
    페이지별로 필요한 경우에만 설정할 수 있음.

    * ??는 실행 중 기본값 보장:
    설정된 값이 없을 때(undefined), 
    안전하게 기본값(false)을 사용하도록 보장.
    */
  }
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {

  const searchVisible = Component.searchVisible ?? false;
  return (
    <GlobalLayout searchVisible={searchVisible}>
      <Component  {...pageProps} />
    </GlobalLayout>
  );
}
