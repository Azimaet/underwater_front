import { Colors } from "@/plugins/utils/colors";

export function globalOptionsProvider(
  context: string,
  lengthItems: number
): object {
  const itemsToDisplay = context === "gas_bar" ? 10 : 15;

  function getSubtitle() {
    const wording =
      "This chart display the last " +
      itemsToDisplay +
      " dives. You can zoom or drag to view the ancient ones.";

    return context === "gas_bar"
      ? { display: true, text: wording }
      : { display: false };
  }

  function getZoom() {
    return context === "gas_bar"
      ? {
          limits: {
            x: { minRange: itemsToDisplay },
          },
          pan: {
            enabled: true,
            mode: "x" as const,
          },
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "x" as const,
          },
        }
      : null;
  }

  function getScales() {
    return context === "gas_bar"
      ? {
          x: {
            min: lengthItems - itemsToDisplay,
            max: lengthItems,
            ticks: {
              color: Colors.grey_02,
            },
            grid: {
              display: false,
            },
            stacked: true,
          },
          y: {
            type: "linear" as const,
            display: true,
            ticks: {
              color: Colors.grey_02,
            },
            grid: {
              color: Colors.grey_05,
            },
          },
        }
      : null;
  }
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      subtitle: getSubtitle(),
      tooltip: {
        enabled: true,
      },
      zoom: getZoom(),
    },
    scales: getScales(),
  };
}
