import React, { useCallback, useState } from "react";
import cn from "@aqrojo/class-names";
import when from "@aqrojo/when";
import "./styles.css";
import { exerciseData } from "./mulitple-choice-data";
import { ReactComponent as CheckIcon } from "./assets/done-24px.svg";

export default function App() {
  const [selected, setSelected] = useState(-1);
  const [isEvaluated, setEvaluation] = useState(false);

  const check = useCallback(() => {
    selected > -1 && setEvaluation(true);
  }, [setEvaluation, selected]);

  const reset = useCallback(() => {
    setEvaluation(false);
    setSelected(-1);
  }, [setEvaluation, setSelected]);

  const selectResponse = useCallback(
    (idx) => () => {
      !isEvaluated && setSelected(idx);
    },
    [setSelected, isEvaluated]
  );

  return (
    <div className="LemonadeApp">
      <div className="multipleChoice">
        <div
          className="exerciseSteam"
          dangerouslySetInnerHTML={{ __html: exerciseData.steam }}
        />

        <div className="exerciseResponses">
          {exerciseData.responses.map((response, idx) => (
            <ResponseItem
              key={`response_${idx}`}
              label={response.text}
              onSelect={selectResponse(idx)}
              selected={selected === idx}
              isEvaluated={isEvaluated}
              isValid={exerciseData.validResponse.includes(response.text)}
            />
          ))}
        </div>

        <div className="exerciseControls">
          {!isEvaluated && (
            <button className="buttonBase" onClick={check}>
              Check
            </button>
          )}
          {isEvaluated && (
            <button className="buttonBase" onClick={reset}>
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ResponseItem({ label, selected, onSelect, isValid, isEvaluated }) {
  const feedbackClass = when
    .case(isEvaluated && selected && isValid, () => "success")
    .case(isEvaluated && selected && !isValid, () => "error")
    .resolve(() => "");

  return (
    <div
      className={cn("responseWrapper", { selected }, feedbackClass)}
      onClick={onSelect}
    >
      <CheckIcon
        className="responseIcon"
        width={18}
        fill="green"
        style={{ visibility: selected ? "visible" : "hidden" }}
      />
      <div
        className="responseContent"
        dangerouslySetInnerHTML={{ __html: label }}
      />
    </div>
  );
}
