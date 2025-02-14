import styles from "./page.module.css";
import { solution } from "../../service/algorithm"
import { solution2 } from "../../service/greedy"

export default function Home() {
  // const solution = (video_len, pos, op_start, op_end, commands) => {

  //   // 문자열 시간을 초 단위로 변환
  //   const timeStringToSeconds = (timeString) => {
  //     const [minutes, seconds] = timeString.split(':').map(Number);
  //     return minutes * 60 + seconds;
  //   };

  //   // 초를 "MM:SS" 형식의 문자열로 변환
  //   const secondsToTimeString = (seconds) => {
  //     const minutes = Math.floor(seconds / 60);
  //     const remainingSeconds = seconds % 60;
  //     return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  //   };

  //   // 초기값 설정
  //   let currentPosition = timeStringToSeconds(pos);
  //   const videoLength = timeStringToSeconds(video_len);
  //   const opStart = timeStringToSeconds(op_start);
  //   const opEnd = timeStringToSeconds(op_end);

  //   // 명령어 처리
  //   for (const command of commands) {
  //     if (command === "prev") {
  //       // 10초 전으로 이동, 최소 0초 보장
  //       currentPosition = Math.max(0, currentPosition - 10);
  //       // 오프닝 구간일 경우 >> 오프닝 끝나는 위치로 이동동
  //       if (currentPosition >= opStart && currentPosition < opEnd) {
  //         currentPosition = opEnd
  //       }

  //     } else if (command === "next") {
  //       // 현재 구간이 오프닝 + "next" => 오프닝 + 10초
  //       if (currentPosition >= opStart && currentPosition < opEnd) {
  //         currentPosition = opEnd + 10;
  //       } else {
  //         currentPosition = Math.min(videoLength, currentPosition + 10);
  //         // "next" 후 현재 구간이 오프닝 => 오프닝 마지막막
  //         if (currentPosition >= opStart && currentPosition < opEnd) {
  //           currentPosition = opEnd
  //         }
  //       }
  //     }
  //   }

  //   return secondsToTimeString(currentPosition);
  // }

  // console.log(solution("10:55", "00:05", "00:15", "06:55", ["prev", "next", "next"]));
  // console.log(solution("07:22", "04:05", "00:15", "04:07", ["next"]));
  // console.log(solution("59:59", "59:45", "00:00", "01:00", ["next"]));
  // console.log(solution("30:00", "01:05", "01:00", "01:30", ["prev"])); // "01:30"
  // console.log(solution([[2, 3], [4, 3], [1, 1], [2, 1]])); // [2, 1, 1, 0]
  // console.log(solution([[4, 11], [1, 12], [8, 3], [12, 7], [4, 2], [7, 11], [4, 8], [9, 6], [10, 11], [6, 10], [3, 5], [11, 1], [5, 3], [11, 9], [3, 8]])); // [4, 0, 1, 2]
  

console.log(solution2([[4,5],[4,8],[10,14],[11,13],[5,12],[3,7],[1,4]]));


  return (
    <div>
      인덱스페이지
    </div>
  );
}
