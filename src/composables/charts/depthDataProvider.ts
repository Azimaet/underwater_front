import { ApolloQueryResult } from "@apollo/client";
import { Colors } from "@/plugins/utils/colors";
import { DepthData } from "@/types/charts/depth";
import { useDivesCollectionLoader } from "@/composables/utils/divesCollectionLoader";

/**
 * Depth Data Provider function.
 * @param {ApolloQueryResult} collection ApolloQueryResult
 * @return {DepthData}
 */
export function useDepthDataProvider(
  collection: ApolloQueryResult<any>
): DepthData {
  function getDepthGroups(dives: any[]): any[] {
    const depthGroup = [0, 0, 0, 0, 0, 0];

    dives.forEach((dive) => {
      dive.maxDepth <= 19
        ? depthGroup[0]++
        : dive.maxDepth <= 29
        ? depthGroup[1]++
        : dive.maxDepth <= 39
        ? depthGroup[2]++
        : dive.maxDepth <= 49
        ? depthGroup[3]++
        : dive.maxDepth <= 59
        ? depthGroup[4]++
        : depthGroup[5]++;
    });

    return depthGroup;
  }

  function loadPieData(dives: any) {
    return {
      labels: ["-20m", "20-29m", "30-39m", "40-49m", "50-59m", "+60m"],
      datasets: [
        {
          backgroundColor: [
            Colors.depth_01,
            Colors.depth_02,
            Colors.depth_03,
            Colors.depth_04,
            Colors.depth_05,
            Colors.depth_06,
          ],
          data: getDepthGroups(dives),
        },
      ],
    };
  }

  function loadLineData(dives: any) {
    const data: number[] = [];
    const labels: string[] = [];
    const colors: string[] = [];
    let highlight: number | null = null;

    dives.forEach((dive: any) => {
      data.push(-Math.abs(dive.maxDepth));
      labels.push(dive.date.split("T")[0]);
    });

    highlight = Math.min(...Object.values(data));

    Object.values(data).forEach((value) => {
      const color = value === highlight ? Colors.warning : Colors.depth_02;
      colors?.push(color);
    });

    return {
      labels: labels,
      datasets: [
        {
          label: "Max depth. (in meters)",
          id: "maxDepth",
          backgroundColor: colors,
          borderColor: colors,
          pointBackgroundColor: colors,
          data: data,
        },
      ],
    };
  }

  function loadPanelData(dives: any) {
    const deepestDive = dives.reduce((prev: any, current: any) => {
      return prev.maxDepth > current.maxDepth ? prev : current;
    });

    const averageDepths = Math.floor(
      dives.reduce((total: number, next: any) => total + next.maxDepth, 0) /
        dives.length
    );

    return {
      rows: [
        {
          cols: [
            {
              title: "Deepest Dive",
              subtitle: [
                "-" +
                  deepestDive.maxDepth +
                  "m : " +
                  deepestDive.date.split("T")[0],
              ],
              highlight: true,
            },
          ],
        },
        {
          cols: [
            {
              title: "Average Depths",
              subtitle: ["-" + averageDepths + "m"],
            },
          ],
        },
      ],
    };
  }

  const dives = useDivesCollectionLoader(collection);

  return {
    pie: loadPieData(dives),
    line: loadLineData(dives),
    panel: loadPanelData(dives),
  };
}
