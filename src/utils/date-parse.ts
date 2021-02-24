const regexr_valid_iso_date = /^(\d{4}-((02-([0-2][1-8]|[12]0))|((0[13578]|1[0-2])-([0-2][1-9]|[1-3][0-1]))|((0[469]|11)-([0-2][1-9]|[1-3]0))))|(\d{2}(([13579][26])|([02468][048]))-02-29)$/;
const regexr_mdy = /^([a-zA-Z]+|\d+)[\s-\\/]+(\d+)\s*,?[\s-\\/]+(\d{4}|\d{2})$/;
const regexr_dmy = /^(\d{1,2})[\s-\\/]+([a-zA-Z]+|\d{1,2})\s*,?[\s-\\/]+(\d{4}|\d{2})$/;

const twoDigits = (n: number) => (n < 10 ? "0" + n : n.toString());

const monthsMap = JSON.parse(
  '{"jan":"01","feb":"02","mar":"03","apr":"04","may":"05","jun":"06","jul":"07","aug":"08","sep":"09","oct":"10","nov":"11","dec":"12","january":"01","february":"02","march":"03","april":"04","june":"06","july":"07","august":"08","september":"09","october":"10","november":"11","december":"12"}'
);

const process = (year: string, month: string, day: string): string => {
  const m = isNaN(month as any)
    ? monthsMap[month]
    : twoDigits(parseInt(month, 10));

  if (m == null) {
    return "";
  }
  const d = twoDigits(parseInt(day, 10));
  const y = year.length === 2 ? "20" + year : year;

  return y + "-" + m + "-" + d;
};

const parseMdy = (str: string): string => {
  const exec = regexr_mdy.exec(str);
  return exec == null ? "" : process(exec[3], exec[1], exec[2]);
};

const parseDmy = (str: string): string => {
  const exec = regexr_dmy.exec(str);
  return exec == null ? "" : process(exec[3], exec[2], exec[1]);
};

export const parseDate = (date: string): string => {
  const str = date.trim();
  if (str === "" || regexr_valid_iso_date.test(str)) {
    return str;
  }

  const x = parseDmy(str);
  if (regexr_valid_iso_date.test(x)) {
    return x;
  }

  const y = parseMdy(str);
  if (regexr_valid_iso_date.test(y)) {
    return y;
  }

  return "";
};

/*
(function () {
    const res = {};
    const twoDigit = n => n < 10 ? '0'+n : n.toString();
    const x = (month) => {
      const fmt = new Intl.DateTimeFormat("en", { month });
      new Array(12)
        .join(",")
        .split(",")
        .forEach((a, i) => {
          res[fmt.format(new Date(1970, i, 1)).toLowerCase()] = twoDigit(i+1);
        });
    };
    x("short");
    x("long");
    return JSON.stringify(res);
  })();
  */
