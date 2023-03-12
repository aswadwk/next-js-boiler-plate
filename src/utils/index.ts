export function removeNullOrUndefinedValues(obj: any): any {
  console.log('removeNullOrUndefinedValues', obj);
  const newObj: any = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null && value !== '') {
      newObj[key] = value;
    }
  }
  
  return newObj;
}

// date for human
export function dateForHuman(date: Date): string {
  const now: any = new Date();
  const posted: any = new Date(date);
  const diff = now - posted;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (diffDays > 0) {
    return `${diffDays} days ago`;
  } if (diffHours > 0) {
    return `${diffHours} hours ago`;
  } if (diffMinutes > 0) {
    return `${diffMinutes} minutes ago`;
  } if (diffSeconds > 0) {
    return `${diffSeconds} seconds ago`;
  }
  return 'just now';
}

export function dateFormatIndonesia(date: Date): string {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}