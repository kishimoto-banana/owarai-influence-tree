import { Autocomplete, TextField } from "@mui/material";
import { Box, styled } from "@mui/system";

const SearchTextField = styled(TextField)`
  background-color: #ffffff;
  border-radius: 50px;
  fieldset {
    border-radius: 50px;
  }
`;

const SearchBar = ({
  placeholder,
  suggestions,
  handleInputChange,
  handleChange,
  inputValue,
}) => {
  return (
    <Box>
      <Autocomplete
        sx={{ width: 254 }}
        freeSolo
        blurOnSelect
        disableClearable
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleChange}
        options={suggestions}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.name
        }
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              {option.name}
            </li>
          );
        }}
        renderInput={(params) => (
          <SearchTextField
            {...params}
            label={placeholder}
            variant="outlined"
            size="small"
          />
        )}
      />
    </Box>
  );
};

export default SearchBar;
