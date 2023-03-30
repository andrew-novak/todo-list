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

const checkIsObject = (obj) => {
  if (typeof obj === "object" && !Array.isArray(obj) && obj !== null) {
    return true;
  }
  return false;
};

export const getNextObjectKey = (obj) => {
  if (!checkIsObject(obj)) {
    throw new Error("Invalid getMaxObjectKey parameter, expected: Object");
  }
  const keys = Object.keys(obj);
  if (keys.length === 0) return 0;
  if (keys.length === 1) return keys[0] + 1;
  const maxKey = keys.reduce((key1, key2) => (key1 > key2 ? key1 : key2));
  return maxKey + 1;
};
