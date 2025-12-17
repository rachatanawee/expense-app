export const iconMap: { [key: string]: string } = {
  'utensils': '🍽️', 'bus': '🚌', 'home': '🏠', 'zap': '⚡', 'shopping-bag': '🛍️',
  'activity': '📊', 'film': '🎬', 'briefcase': '💼', 'gift': '🎁', 'trending-up': '📈'
}

export function getIcon(iconName: string | null): string {
  if (!iconName) return '📁'
  const validIcons = ['utensils', 'bus', 'home', 'zap', 'shopping-bag', 'activity', 'film', 'briefcase', 'gift', 'trending-up']
  return validIcons.includes(iconName) ? iconMap[iconName] || '📁' : '📁'
}
