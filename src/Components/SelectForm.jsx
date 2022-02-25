import React from "react";

function SelectForm(props) {
  const listData = [];
  for (let i = 0; i < props.list.length; i++) {
    listData.push(props.list[i].name);
  }
  return (
    <div className="form-row">
      {props.label && <label>{props.label}</label>}
      <select
        name={props.name}
        id={props.name}
        required
        onChange={(event) => props.setData(event.target.value)}
        value={props.value ? props.value : undefined}
      >
        <option className="select-option" value="">
          {props.optionPlaceholder}
        </option>

        {listData.map((value, key) => (
          <option key={key} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectForm;
