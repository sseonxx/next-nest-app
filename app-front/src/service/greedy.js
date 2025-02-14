export function solution2(targets) {

  targets.sort((a, b) => a[1] - b[1]);

  console.log("tartget: ", targets);
  let count = 0;
  let lastShootX = -1;

  for (let[s,e] of targets){
    // 현재 요격 미사일이 이 미사일을 요격할 수 없는 경우
    if(lastShootX < s){
      count ++;
      lastShootX = e-0.5;

    }
  }



  return count;
}