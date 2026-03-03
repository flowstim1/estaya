// lib/guestLimits.ts

export const GUEST_LIMITS = {
  MAX_PROPERTIES_VIEW: 3,
  CAN_SAVE: false,
  CAN_LIST: false,
  CAN_CONTACT: false
};

export function isGuest(): boolean {
  if (typeof window === 'undefined') return true;
  return !localStorage.getItem('token');
}

export function getGuestViewProperties(allProperties: any[]) {
  if (isGuest()) {
    return allProperties.slice(0, GUEST_LIMITS.MAX_PROPERTIES_VIEW);
  }
  return allProperties;
}

export function shouldShowUpgradeBanner(): boolean {
  return isGuest();
}