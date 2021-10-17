import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import "./LoadingPrompt.css";

/**
 * Defines a Loading Prompt Component to make the delay in asynchronous API-Calls more user-friendly
 * @param alternateComponent
 *  a JSX element to be rendered when the promiseInProgress is completed.
 * @returns
 */
export default function LoadingPrompt({ component = null }) {
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress ? (
    <div className="loader text-primary">Now Loading...</div>
  ) : (
    component
  );
}
