import React from "react";
import { usePromiseTracker } from "react-promise-tracker";

export default function LoadingPrompt() {
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress && <h1>Now Loading...</h1>;
}
