import { reactive } from "vue";

interface State {
  value: boolean;
}

export const isMobile: State = reactive({
  value: useIsMobile(),
});

function useIsMobile(): boolean {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) && window.innerWidth < 600
  );
}

addEventListener("resize", () => {
  isMobile.value = useIsMobile();
});
