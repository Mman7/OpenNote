export const NormalizeTime = (time) => {
  if (!time) return;
  return time
    .toDate()
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "/");
};
