const dateFormatterOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit"
};

export const dateFormatter = new Intl.DateTimeFormat("de-DE", dateFormatterOptions);
