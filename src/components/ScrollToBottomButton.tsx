import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export const ScrollToBottomButton = () => {
  return (
    <button
      className="btn-circle btn-lg btn fixed bottom-28 right-4 opacity-80"
      onClick={() =>
        globalThis.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        })
      }
    >
      <FontAwesomeIcon icon={faAngleDown} size="xl" />
    </button>
  );
};
