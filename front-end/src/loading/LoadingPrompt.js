import React from "react";
import { usePromiseTracker } from "react-promise-tracker";

/**
 * Defines a Loading Prompt Component to make the delay in asynchronous API-Calls more user-friendly
 * @param alternateComponent
 *  a JSX element to be rendered when the promiseInProgress is completed.
 * @returns
 */
export default function LoadingPrompt({ component = null }) {
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress ? (
    <h1 className="text-center mt-5">Now Loading...</h1>
  ) : (
    component
  );
}
