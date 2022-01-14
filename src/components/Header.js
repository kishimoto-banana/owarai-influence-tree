import { Button, Link } from "@mui/material";
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
    <Stack direction="column">
      <Stack
        direction="row"
        spacing={1}
        sx={{ pt: "12px", justifyContent: "center" }}
      >
        <Filter
          data={searchOptions}
          filter={filter}
          setFilter={setFilter}
          placeholder={"お笑い芸人"}
        />
        <StyledButton
          variant="contained"
          onClick={handleResetClick}
          size="small"
        >
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
      <Link
        href="https://twitter.com/unpuy_tw"
        underline="hover"
        variant="subtitle2"
        sx={{ color: "#f4f4f4" }}
      >
        @unpuy_tw
      </Link>
    </Stack>
  );
};

export default Header;
