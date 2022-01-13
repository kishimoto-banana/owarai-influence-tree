import React, { useState } from "react";
import SearchBar from "./SearchBar";

const Filter = ({ placeholder, data, filter, setFilter }) => {
  const [filteredData, setFilteredData] = useState([]);

  const filterData = (_, value) => {
    setFilter(value);

    const searchTerm = value;
    if (searchTerm === "") {
      setFilteredData([]);
      return;
    }

    const newFilteredData = data.filter((value) => {
      return value.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredData(newFilteredData);
  };

  const handleChange = (_, value) => {
    // サジェスト候補をクリックされたパターン
    if (typeof value === "object") {
      setFilter(value);
      return;
    }

    // 入力された値でエンターされたパターン
    const matchObj = data.find((v) => v.name === value);
    if (typeof matchObj === "undefined") {
      // 見つからなかった
      setFilter("");
    } else {
      // 見つかった
      setFilter(matchObj);
    }
  };

  return (
    <SearchBar
      placeholder={placeholder}
      suggestions={filteredData}
      handleInputChange={filterData}
      handleChange={handleChange}
      inputValue={filter}
    />
  );
};

export default Filter;
