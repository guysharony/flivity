export function removeUndefined(obj: any): any {
  let filtered: Record<string, any> = {};

  for (const key of Object.keys(obj)) {
    if (obj[key] === Object(obj[key])) {
      filtered[key] = removeUndefined(obj[key]);
      continue;
    }

    if (obj[key] !== undefined && obj[key] !== null) {
      filtered[key] = obj[key];
      continue;
    }
  }

  return filtered;
}
