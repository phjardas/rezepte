import { Autocomplete } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FieldArray } from "formik";
import { useCallback, useMemo } from "react";
import { useKategorien } from "../../data";
import KategorieChips from "../../KategorieChips";

const PREFIX = "Kategorien";

const classes = {
  root: `${PREFIX}-root`,
  add: `${PREFIX}-add`,
};

const StyledFieldArray = styled(FieldArray)(({ theme: { spacing } }) => ({
  [`& .${classes.root}`]: {
    marginTop: spacing(2),
  },
  [`& .${classes.add}`]: {
    marginLeft: spacing(1),
    minWidth: "8rem",
  },
}));

function Kategorien({ values, arrayHelpers }) {
  const addKategorie = useCallback(
    (id) => arrayHelpers.push(id),
    [arrayHelpers]
  );
  const deleteKategorie = useCallback(
    (id) => {
      const index = values.indexOf(id);
      if (index >= 0) arrayHelpers.remove(index);
    },
    [values, arrayHelpers]
  );

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1">Kategorien</Typography>
      <KategorieChips kategorieIds={values} onDelete={deleteKategorie}>
        <AddKategorie
          kategorieIds={values}
          addKategorie={addKategorie}
          id="kategorie"
          className={classes.add}
        />
      </KategorieChips>
    </div>
  );
}

function AddKategorie({ kategorieIds, addKategorie, ...props }) {
  const alleKategorien = useKategorien();
  const unbenutzteKategorien = useMemo(
    () =>
      alleKategorien
        .filter((kat) => !kategorieIds.includes(kat.id))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [alleKategorien, kategorieIds]
  );
  const onChange = useCallback(
    (_, value) => {
      if (value) addKategorie(value.id);
    },
    [addKategorie]
  );
  const renderInput = useCallback(
    (params) => (
      <TextField
        {...params}
        label="hinzufügen"
        variant="outlined"
        size="small"
      />
    ),
    []
  );
  const renderLabel = useCallback((kat) => kat.label, []);

  return (
    unbenutzteKategorien.length > 0 && (
      <Autocomplete
        options={unbenutzteKategorien}
        getOptionLabel={renderLabel}
        renderInput={renderInput}
        onChange={onChange}
        autoSelect
        clearOnEscape
        {...props}
      />
    )
  );
}

export default function KategorienWrapper({ values }) {
  return (
    <StyledFieldArray name="kategorieIds">
      {(arrayHelpers) => (
        <Kategorien values={values} arrayHelpers={arrayHelpers} />
      )}
    </StyledFieldArray>
  );
}
