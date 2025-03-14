export function formatDate(timestamp) {
  //Opretter nyt dateobjekt
  const date = new Date(timestamp);

  const day = date.getDate(); //Henter dato
  const month = String(date.getMonth() + 1).padStart(2, "0"); //Henter måned
  const hours = String(date.getHours()).padStart(2, "0"); //Henter timer
  const minutes = String(date.getMinutes()).padStart(2, "0"); //Henter minutter

  //Returnerer den formaterede string
  return `d. ${day}/${month} kl. ${hours}.${minutes}`;
}
