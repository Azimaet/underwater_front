interface HightlightItem {
  title: string;
  subtitle: number;
}

interface DateHighlighter {
  years: HightlightItem[];
  highlightedMonth: HightlightItem;
  highlightedYear: HightlightItem;
  divesPerMonth: number;
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
export function useDateStats(dives: any[]): DateHighlighter {
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

  function computeDivesPerMonth(): number {
    const startDate = new Date(dives[0].date);
    const now = new Date();
    return (
      dives.length /
      (now.getMonth() -
        startDate.getMonth() +
        12 * (now.getFullYear() - startDate.getFullYear()))
    );
  }

  const statYears: HightlightItem[] = [];
  const datesGroups = groupDates();
  const highlightMonth: HightlightItem = {
    title: "",
    subtitle: 0,
  };

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
    highlightedMonth: highlightMonth,
    highlightedYear: statYears.reduce((prev, current) =>
      prev.subtitle > current.subtitle ? prev : current
    ),
    divesPerMonth: computeDivesPerMonth(),
  };
}
