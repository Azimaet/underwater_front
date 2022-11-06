interface HightlightItem {
  title: string;
  subtitle: number;
}

interface DateHighlighter {
  years: HightlightItem[];
  month: HightlightItem;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Date Highlighter function.
 * @param {any[]} dives any[]
 * @return {DateHighlighter}
 */
export function useDateHighlighter(dives: any[]): DateHighlighter {
  function groupDates(): object {
    return dives.reduce((response, dive) => {
      const date = new Date(dive.date);
      const year = date.getFullYear();
      const month = date.getMonth();

      response[year]
        ? response[year][month]
          ? response[year][month].data.push(dive)
          : (response[year][month] = { data: [dive] })
        : (response[year] = { [month]: { data: [dive] } });

      return response;
    }, {});
  }

  function buildHighlights(datesGroups: object): DateHighlighter {
    const highlightMonth: HightlightItem = {
      title: "",
      subtitle: 0,
    };

    const statYears: HightlightItem[] = [];

    Object.keys(datesGroups).forEach((key: string) => {
      const year = datesGroups[key as keyof typeof datesGroups];
      let yearCount = 0;

      Object.keys(year).forEach((subKey: string) => {
        const month = year[subKey]["data"] as [];
        yearCount = yearCount + month.length;

        if (month.length > highlightMonth.subtitle) {
          highlightMonth.subtitle = month.length;
          highlightMonth.title =
            (months[subKey as keyof typeof months] as string) + " " + key;
        }
      });

      statYears.push({
        title: key,
        subtitle: yearCount,
      });
    });

    return {
      years: statYears,
      month: highlightMonth,
    };
  }

  return buildHighlights(groupDates());
}
