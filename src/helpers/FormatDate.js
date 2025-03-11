export function formatDate(timestamp){
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
  
    return `d. ${day}/${month} kl. ${hours}.${minutes}`;
}