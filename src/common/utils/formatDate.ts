import moment from "moment";

export function formatDate(date: string) {
  const today = moment().startOf("day");
  const yesterday = moment().subtract(1, "days").startOf("day");

  if (moment(date).isSame(today, "day")) {
    return `Today at ${moment(date).format("hh:mm:ss A")}`;
  } else if (moment(date).isSame(yesterday, "day")) {
    return `Yesterday at ${moment(date).format("hh:mm:ss A")}`;
  } else {
    return moment(date).format("MMM DD, YYYY [at] hh:mm:ss A");
  }
}
