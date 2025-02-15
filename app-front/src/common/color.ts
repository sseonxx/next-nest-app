export const getColorForCampaign = (campaignName: string) => {
  let hash = 0;
  for (let i = 0; i < campaignName.length; i++) {
    hash = campaignName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
};