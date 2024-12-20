export function shortenPoints(points?: number) {
  if (typeof points !== 'number') {
    return points;
  }

  // K, M, B 최대 소숫점 1자리까지 표시
  if (points >= 1000000000) {
    return `${(points / 1000000000).toFixed(1)}B`;
  }

  if (points >= 1000000) {
    return `${(points / 1000000).toFixed(1)}M`;
  }

  if (points >= 1000) {
    return `${(points / 1000).toFixed(1)}K`;
  }

  return points;
}
