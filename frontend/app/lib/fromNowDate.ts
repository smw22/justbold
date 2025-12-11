import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

export default function fromNowDate({ date, shorten = false }: { date: Date; shorten?: boolean }) {
  if (shorten) {
    // Apply short format
    dayjs.updateLocale("en", {
      relativeTime: {
        future: "in %s",
        past: "%s",
        s: "1s",
        m: "1m",
        mm: "%dm",
        h: "1h",
        hh: "%dh",
        d: "1d",
        dd: "%dd",
        M: "1mo",
        MM: "%dmo",
        y: "1y",
        yy: "%dy",
      },
    });
  } else {
    // Reset to standard English locale
    dayjs.updateLocale("en", {
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years",
      },
    });
  }
  return dayjs(date).fromNow();
}
