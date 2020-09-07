import ReactPlayer from 'react-player';

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

export function cutLink(link: string) : string {
  if (link.length < 37) return link;
  return (`${link.substring(0, 33)}...${link.substring(link.length-3)}`)
}

export function isLinkValid(link: string) : boolean {
  return ReactPlayer.canPlay(link);
}
