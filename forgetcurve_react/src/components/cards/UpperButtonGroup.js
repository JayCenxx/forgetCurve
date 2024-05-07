 
import { ToggleButton } from "../buttons/ToggleButton";
import { Collapsible } from "../collapse/Collapsible";

export const UpperButtonGroup = ({}) => {
  return (
    <>
      <main className="flex  mt-3">
        <span className="basis-[25%]"></span>
        <ToggleButton></ToggleButton>
        {/* <Collapsible title=">"></Collapsible> */}
      </main>
    </>
  );
};
