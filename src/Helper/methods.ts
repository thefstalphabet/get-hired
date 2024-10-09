import moment from "moment";

export function formatDate(date: Date) {
    date = new Date(date)
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
}

export function capitalizeFirstLetter(word: string) {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const getPostedDate = (created_at: string) => {
    const days = moment().diff(moment(created_at), "days");
    let str;
    if (days === 0) {
      str = "Posted Today";
    } else {
      str = `${days} days ago`;
    }
    return str;
  };