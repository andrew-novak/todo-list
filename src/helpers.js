/*
How to use?:
const day = getFormatDate(passedDate, { day: "numeric" });
*/
export const getFormatDate = (date, options) => {
  if (Object.prototype.toString.call(date) !== "[object Date]") {
    throw new Error(
      "Invalid date parameter for 1st arg of getFormatDate, received: " +
        Object.prototype.toString.call(date) +
        " " +
        date
    );
  }
  const format = new Intl.DateTimeFormat("en", options);
  return format.format(date);
};

/*
e.g.
25 Mar 2025
*/
export const getDisplayDate = (passedDate) => {
  const day = getFormatDate(passedDate, { day: "numeric" });
  const month = getFormatDate(passedDate, { month: "short" });
  const year = getFormatDate(passedDate, { year: "numeric" });
  return [day, month, year].join(" ");
};
