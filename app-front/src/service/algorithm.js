export function solution(edges) {
  const inDegree = new Map(); // 진입차수
  const outDegree = new Map(); // 진출차수
  const graph = new Map(); 
  
  // 간선 정보 저장 및 진입/진출 차수 계산
  for (const [a, b] of edges) {
      if (!graph.has(a)) graph.set(a, []);
      graph.get(a).push(b); // a 라는 키에 b value를 넣는다.
      
      outDegree.set(a, (outDegree.get(a) || 0) + 1); // a번에 진출차수 +1
      inDegree.set(b, (inDegree.get(b) || 0) + 1); // b번에 진입차수 +1
  }
  
  // 생성된 정점 찾기: 진출 차수가 2 이상이고 진입 차수가 0인 정점
  let newNode = null;
  console.log("outDegree.entries() >>",[...outDegree.entries()]);
  console.log("outDegree.entries() >>",[...outDegree.keys()]);
  console.log("outDegree.entries() >>",[...outDegree.values()]);
  
  for (const [node, outCount] of outDegree.entries()) {
      if (outCount >= 2 && !inDegree.has(node)) { 
          newNode = node;
          break;
      }
  }
  
  // 새 정점에서 연결된 정점들을 탐색하여 그래프 유형 분류
  let donutCount = 0, barCount = 0, eightCount = 0;
  const visited = new Set();
  
  function detectGraphType(start) {
    // BFS
      const queue = [start];
      const visitedNodes = new Set();
      let edgesCount = 0;
      
      while (queue.length > 0) {
          const node = queue.shift();
          if (visitedNodes.has(node)) continue;
          
          visitedNodes.add(node);
          visited.add(node);
          
          if (graph.has(node)) {
              for (const neighbor of graph.get(node)) {
                  queue.push(neighbor);
                  edgesCount++;
              }
          }
      }
      
      // 그래프 유형 판별
      const n = visitedNodes.size;
      if (edgesCount === n) return "donut";
      if (edgesCount === n - 1) return "bar";
      return "eight";
  }
  
  for (const start of graph.get(newNode)) {
      if (!visited.has(start)) {
          const graphType = detectGraphType(start);
          if (graphType === "donut") donutCount++;
          else if (graphType === "bar") barCount++;
          else if (graphType === "eight") eightCount++;
      }
  }
  
  return [newNode, donutCount, barCount, eightCount];
}