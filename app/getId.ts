export function getYoutubeId(link: string) {
  // Split the link by '/' and '?'
  const parts = link.split(/[\/?]/);
  // Find the part that contains 'embed'
  const embedPartIndex = parts.findIndex((part) => part.includes("embed"));
  // The ID should be the next part after 'embed'
  const id = parts[embedPartIndex + 1];
  // Return the ID
  return id;
}
