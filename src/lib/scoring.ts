export function calculateOpportunityScore(
  volume: number,
  competition: number,
  trendScore: number,
  viewsToSubRatio: number,
  rpmPotential: 'Low' | 'Medium' | 'High'
): number {
  // Normalize volume (assuming max reasonable volume is 500k for calculation)
  const normVolume = Math.min(volume / 500000, 1) * 100;
  
  // Normalize competition (inverse - lower is better)
  const normComp = 100 - Math.min(competition, 100);
  
  // Normalize Views/Sub ratio (cap at 5x)
  const normVSRatio = Math.min(viewsToSubRatio / 5, 1) * 100;
  
  // RPM Score
  const rpmScore = rpmPotential === 'High' ? 100 : rpmPotential === 'Medium' ? 60 : 30;

  // Weighted sum
  const score = (
    (normVolume * 0.20) +
    (normComp * 0.40) +
    (trendScore * 0.20) +
    (normVSRatio * 0.10) +
    (rpmScore * 0.10)
  );

  return Math.max(0, Math.min(100, Math.round(score)));
}

export function classifyKeyword(
  opportunityScore: number, 
  competition: number, 
  trendScore: number
): 'Easy Viral' | 'Evergreen' | 'Short-term Trend' | 'Niche Low Comp' | 'Avoid' {
  if (competition > 85 && opportunityScore < 40) return 'Avoid';
  if (opportunityScore >= 80 && competition <= 40 && trendScore >= 70) return 'Easy Viral';
  if (trendScore >= 80 && competition > 40 && opportunityScore >= 60) return 'Short-term Trend';
  if (competition <= 35) return 'Niche Low Comp';
  return 'Evergreen';
}
