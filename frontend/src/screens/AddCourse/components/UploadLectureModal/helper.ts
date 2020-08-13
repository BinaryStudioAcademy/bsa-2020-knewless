export function getExtension(filename: string) {
  const parts = filename.split('.');
  return parts[parts.length - 1];
}

export function isVideo(filename: string) {
  const ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'm4v':
    case 'avi':
    case 'mpg':
    case 'mp4':
    case 'mkv':
      return true;
    default:
  }
  return false;
}

