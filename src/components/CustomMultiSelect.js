import MultiSelect from "react-multi-select-component";
import React from "react";

const CustomMultiSelect = (props) => {
  const progressBarClasses =
    "progress mt-1 " + (props.options.length !== 0 ? "d-none" : "");
  return (
    <div>
      <MultiSelect
        options={props.options}
        value={props.selectedValues}
        onChange={props.setSelectedValues}
        overrideStrings={{ selectSomeItems: props.name }}
        disabled={props.isDisabled}
        className={props.options.length === 0 ? "d-none" : ""}
      />
      <div className={progressBarClasses} style={{ height: 5 }}>
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuenow="100"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: "100%" }}
        ></div>
      </div>
    </div>
  );
};

export default CustomMultiSelect;
