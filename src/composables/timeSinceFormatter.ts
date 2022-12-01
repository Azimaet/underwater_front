/**
 * @param {string} date {string}
 * @returns {string}
 */
export function useTimeSinceFormatter(date: string | Date): any {
  function __process(deltaInMs: number) {
    const seconds = Math.floor(deltaInMs / 1000);

    const unit =
      seconds <= 60
        ? "SECONDS"
        : seconds > 60 && seconds <= 3600
        ? "MINUTES"
        : seconds > 3600 && seconds <= 86400
        ? "HOURS"
        : seconds > 86400 && seconds <= 604800
        ? "DAYS"
        : seconds > 604800 && seconds <= 2592000
        ? "WEEKS"
        : seconds > 2592000 && seconds <= 31536000
        ? "MONTHS"
        : seconds > 31536000
        ? "YEARS"
        : "";

    return unit === "SECONDS"
      ? seconds + " seconds ago."
      : unit === "MINUTES"
      ? Math.floor(seconds / 60) + " minutes ago."
      : unit === "HOURS"
      ? Math.floor(seconds / 3600) + " hours ago."
      : unit === "DAYS"
      ? Math.floor(seconds / 86400) + " days ago."
      : unit === "WEEKS"
      ? Math.floor(seconds / 604800) + " weeks ago."
      : unit === "MONTHS"
      ? Math.floor(seconds / 2592000) + " months ago."
      : unit === "YEARS"
      ? Math.floor(seconds / 31536000) + " years ago."
      : "error";
  }

  const deltaInMs = Date.now() - new Date(date).getTime();

  return __process(deltaInMs);
}
