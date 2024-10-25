import * as React from "react";
import { createComponent } from "@toolpad/studio/browser";
import { TextField, Autocomplete, Box } from "@mui/material";
import axios from "axios";

export interface DynamicAutocompleteProps {
  maxFields: number;
}

function DynamicAutocomplete({ maxFields }: DynamicAutocompleteProps) {
  const [fieldCount, setFieldCount] = React.useState(1);
  const [values, setValues] = React.useState<(string | null)[]>([]);
  const [options, setOptions] = React.useState<{ artist_id: string; artist_name: string }[]>([]);

  React.useEffect(() => {
    axios.get("http://localhost:3000/api/artists").then((response) => {
      const fetchedOptions = response.data.data.map((artist: any) => ({
        artist_id: artist.artist_id,
        artist_name: artist.artist_name,
      }));
      setOptions(fetchedOptions);
    });
  }, []);

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = Math.min(maxFields, parseInt(event.target.value) || 1);
    setFieldCount(newCount);
    setValues((prev) => prev.slice(0, newCount));
  };

  const handleAutocompleteChange = (index: number, value: any) => {
    const newValues = [...values];
    newValues[index] = value ? value.artist_id : null;
    setValues(newValues);
  };

  const getFilteredOptions = (index: number) => {
    const selectedIds = new Set(values.filter((v, i) => i !== index && v !== null));
    return options.filter((option) => !selectedIds.has(option.artist_id));
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} width="100%">
      <TextField
        label="Number of artists"
        type="number"
        onChange={handleFieldChange}
        value={fieldCount}
        InputProps={{ inputProps: { min: 1, max: maxFields } }}
        size="small"
        sx={{ width: "100%" }}
      />
      {Array.from({ length: fieldCount }).map((_, index) => (
        <Autocomplete
          key={index}
          options={getFilteredOptions(index)}
          getOptionLabel={(option) => option.artist_name}
          onChange={(_, value) => handleAutocompleteChange(index, value)}
          isOptionEqualToValue={(option, value) =>
            value !== null && option.artist_id === value.artist_id
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search from your artists..."
              size="small"
              sx={{ width: "100%" }}
            />
          )}
          sx={{ width: "100%" }}
          value={options.find((option) => option.artist_id === values[index]) || null}
        />
      ))}
    </Box>
  );
}

export default createComponent(DynamicAutocomplete, {
  argTypes: {
    maxFields: {
      type: "number",
      default: 5,
    },
  },
});