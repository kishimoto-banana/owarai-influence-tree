import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";
import React from "react";
import Filter from "./Filter";

const StyledButton = styled(Button)`
  border-radius: 50px;
`;

const Header = ({ filter, setActiveNode, setFilter, searchOptions }) => {
  const handleResetClick = () => {
    setActiveNode(null);
    setFilter("");
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ p: "12px", justifyContent: "center" }}
    >
      <Filter
        data={searchOptions}
        filter={filter}
        setFilter={setFilter}
        placeholder={"お笑い芸人"}
      />
      <StyledButton variant="contained" onClick={handleResetClick} size="small">
        リセット
      </StyledButton>
      {/* <StyledButton
        variant="contained"
        onClick={handleAxisChangeClick}
        size="small"
      >
        水平/垂直
      </StyledButton> */}
    </Stack>
  );
};

export default Header;
