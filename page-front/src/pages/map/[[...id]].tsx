import { useRouter } from "next/router"

/*
-Segment Page
    [...id].tsx : http://localhost:3000/map 되면 404 error가 뜨게된다
-Optional Catch AllSegmnet Page
    [[...id]].tsx : http://localhost:3000/map 도 볼 수 있는 범용적 페이지로 설정할 수 있다. 
*/
export default function Page() {
    const router = useRouter();
    console.log(router);

    const { id } = router.query;
    return (
        <>
            <h1>map:{JSON.stringify(id)}</h1>
        </>)
}