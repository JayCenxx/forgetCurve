import { ErrorBoundary } from "../../errorHandling/ErrorBoundary";
import FlashCard from "./FlashCard";
import { LowerButtonGroup } from "./LowerButtonGroup";
import { UpperButtonGroup } from "./UpperButtonGroup";

export const BrowseCardMain = ({  }) => {
    
    
    return(
  <ErrorBoundary>
    <UpperButtonGroup></UpperButtonGroup>
    <FlashCard></FlashCard>
    <LowerButtonGroup></LowerButtonGroup>
  </ErrorBoundary>
);
}
