export function removeNullOrUndefinedValues(obj: any): any {
  const newObj: any = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined || value !== null || value !== '') {
      newObj[key] = value;
    }
  }
  
  return newObj;
}