const thumbnailPath = import.meta.env.VITE_THUMBNAIL_PATH
const thumbnailPrefix = import.meta.env.VITE_THUMBNAIL_PREFIX

export function getThumbImageURI(filename) {
  return `${thumbnailPath}/${thumbnailPrefix}${filename}`
}
