export function getOrCreateDeviceId(): string {
  const key = 'device_id';
  let deviceId = localStorage.getItem(key);
  if (!deviceId) {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      deviceId = crypto.randomUUID();
    } else {
      const randomString = (): string =>
        Math.random().toString(36).substring(2, 15);
      deviceId = `device-${randomString()}${randomString()}`;
    }
    localStorage.setItem(key, deviceId);
  }
  return deviceId;
}
