const options: Intl.DateTimeFormatOptions = {
  weekday: "long", // "long" is a specific string literal
  year: "numeric", // "numeric" is a specific string literal
  month: "2-digit", // "2-digit" is a specific string literal
  day: "2-digit", // "2-digit" is a specific string literal
  hour: "2-digit", // "2-digit" is a specific string literal
  minute: "2-digit", // "2-digit" is a specific string literal
  timeZone: "Asia/Ho_Chi_Minh", // Valid timezone string
  hour12: false, // Boolean
};

const formatter = new Intl.DateTimeFormat("en-US", options);
export default formatter;
