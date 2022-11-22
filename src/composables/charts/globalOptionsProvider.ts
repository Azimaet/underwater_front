import { Colors } from "@/plugins/utils/colors";

export function globalOptionsProvider(context: string, data: any): object {
  const itemsToDisplay = context === "gas_bar" ? 10 : 15;

  function getTitle() {
    const wording =
      "This chart display the last " +
      itemsToDisplay +
      " dives. You can zoom or drag to view the ancient ones.";

    switch (context) {
      case "gas_bar":
      case "depth_line":
        return { display: true, text: wording, color: Colors.grey_01 };
      default:
        return { display: false };
    }
  }

  function getTooltip() {
    return {
      enabled: true,
      bodyFont: {
        family: "Helvetica",
      },
      callbacks: {
        title: (item: any) => {
          switch (context) {
            case "depth_pie":
              return item[0].label + " zone:";
            case "depth_line":
              return "Depth:";
            case "gas_doughnut":
              return item[0].label;
            case "gas_bar":
              return item[0].dataset.label;
            default:
              return "";
          }
        },
        label: (item: any) => {
          switch (context) {
            case "depth_pie":
              return (
                " " +
                (item.dataset.data[item.dataIndex] +
                  (item.dataset.data[item.dataIndex] > 1
                    ? " dives."
                    : " dive."))
              );
            case "depth_line":
              return " " + item.dataset.data[item.dataIndex] + "meters.";
            case "gas_doughnut":
              return (
                " " +
                (
                  (item.dataset.data[item.dataIndex] * 100) /
                  data.datasets[0].data.reduce(
                    (partialSum: number, a: number) => partialSum + a,
                    0
                  )
                ).toFixed(1) +
                "% of total tanks you used."
              );
            case "gas_bar":
              return " " + item.formattedValue + "bar.";
            default:
              return item.dataset.data[item.dataIndex] +
                item.dataset.data[item.dataIndex] >
                1
                ? " dives."
                : " dive.";
          }
        },
        afterLabel: (item: any) => {
          switch (context) {
            case "gas_bar":
              return (
                "Pressure consumed: " +
                data.datasets[item.datasetIndex].customData[item.dataIndex]
                  .pressure +
                "bar. " +
                "\n" +
                "Number of Tanks: " +
                data.datasets[item.datasetIndex].customData[item.dataIndex]
                  .tanks +
                "\n" +
                "Mix: " +
                data.datasets[item.datasetIndex].customData[item.dataIndex]
                  .label +
                "\n" +
                "Total Time: " +
                data.datasets[item.datasetIndex].customData[item.dataIndex]
                  .totalTime +
                "mn."
              );
            default:
              return null;
          }
        },
      },
    };
  }

  function getZoom() {
    switch (context) {
      case "gas_bar":
      case "depth_line":
        return {
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
        };
      default:
        return null;
    }
  }

  function getScales() {
    switch (context) {
      case "gas_bar":
      case "depth_line":
        return {
          x: {
            min: data.labels.length - itemsToDisplay,
            max: data.labels.length,
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
        };
      default:
        return null;
    }
  }

  return {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      legend: {
        position: context === "depth_pie" ? "left" : "bottom",
        labels: {
          color: Colors.grey_01,
        },
      },
      title: getTitle(),
      tooltip: getTooltip(),
      zoom: getZoom(),
    },
    scales: getScales(),
  };
}
