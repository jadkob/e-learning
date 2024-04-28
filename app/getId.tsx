export function getId(embedLink: string) {
  // Check if the input string is a valid YouTube embed link
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = embedLink.match(regex);

  // If a match is found, return the video ID
  if (match && match[1]) {
    return match[1];
  } else {
    // If no match is found, return null or throw an error
    return null;
  }
}
