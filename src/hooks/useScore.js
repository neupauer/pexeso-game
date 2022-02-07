import { useCallback } from "react";
import useStore from "../store";

const scoreSelector = (state) => state.score;
const incrementSelector = (state) => state.increment;
const decrementSelector = (state) => state.decrement;

function useScore() {
  const score = useStore(scoreSelector);
  const increment = useStore(incrementSelector);
  const decrement = useStore(decrementSelector);


  return [score, increment, decrement];
}

export default useScore;
