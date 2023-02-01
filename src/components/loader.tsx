import { Oval } from "react-loader-spinner";

function Loader() {
  return (
    <Oval
      ariaLabel='loading-indicator'
      height={18}
      width={18}
      strokeWidth={5}
      color={"#d4d4d4"}
      secondaryColor={"#525252"}
    />
  );
}

export default Loader;
