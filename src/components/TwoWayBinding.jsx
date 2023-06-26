import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

const TwoWayBinding = () => {
  const [data, setData] = useState({
    firstField: 1.0,
    secondField: 0.0,
    thirdField: 2.0,
    sum: 0.0,
    changedField: "firstField",
  });

  const [debouncedData] = useDebounce(data, 500);

  const updateData = async () => {
    console.log("Called updateData");
    let { firstField, secondField, thirdField, changedField } = debouncedData;
    if (changedField === "firstField") {
      secondField = parseFloat(firstField) * 2;
    } else if (changedField === "secondField") {
      firstField = parseFloat(secondField) / 2;
    }
    const sum = firstField + secondField + thirdField;
    changedField = "";
    setData({
      firstField,
      secondField,
      thirdField,
      sum,
      changedField,
    });
  };

  useEffect(() => {
    // console.log("Changed:", changed, Date.now());
    console.log("Data:", debouncedData, Date.now());
    if (debouncedData.changedField) {
      updateData();
    }
  }, [debouncedData]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    console.log("Changed field:", name);
    setData({
      ...data,
      [name]: parseFloat(value) || 0,
      changedField: name,
    });
  };

  return (
    <div>
      <input
        name="firstField"
        type="number"
        value={data.firstField}
        onChange={handleFieldChange}
        placeholder="First Number"
      />
      &nbsp;*&nbsp;2&nbsp;=&nbsp;
      <input
        name="secondField"
        type="number"
        value={data.secondField}
        onChange={handleFieldChange}
        placeholder="Second Number"
      />
      <br />
      <input
        name="thirdField"
        type="number"
        value={data.thirdField}
        onChange={handleFieldChange}
        placeholder="Third Number"
      />
      <p>Sum: {data.sum}</p>
    </div>
  );
};

export default TwoWayBinding;
