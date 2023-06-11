export default function slugifyString(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .split('_')
    .join('-')
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '')   // Remove non-word characters (excluding hyphens)
    .replace(/--+/g, '-')      // Replace multiple consecutive hyphens with a single hyphen
    .replace(/^-+|-+$/g, '');  // Trim hyphens from the start and end of the string
}