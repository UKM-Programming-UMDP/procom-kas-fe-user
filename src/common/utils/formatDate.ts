import moment from "moment";

export function formatDate(date: Date) {
  const today = moment();
  const yesterday = moment().subtract(1, "days");

  if (moment(date).isSame(today, "day")) {
    return "Today";
  } else if (moment(date).isSame(yesterday, "day")) {
    return "Yesterday";
  } else {
    return moment(date).format("MMM DD, YYYY [at] hh:mm:ss A");
  }
}
