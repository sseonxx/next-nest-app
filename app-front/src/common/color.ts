const colorPalette = [
  '#FF5733', '#33FF57', '#3357FF', '#F39C12', '#1ABC9C',
  '#9B59B6', '#E74C3C', '#2ECC71', '#3498DB', '#8E44AD',
  '#D35400', '#7F8C8D'
];

export const getColorForCampaign = (campaignName: string) => {
  const hash = [...campaignName].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colorPalette[hash % colorPalette.length];
};