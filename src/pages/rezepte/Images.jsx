import {
  AddPhotoAlternate as AddImageIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { CircularProgress, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Grid, GridTile } from "../../Grid";

const PREFIX = "Images";

const classes = {
  root: `${PREFIX}-root`,
  dropzone: `${PREFIX}-dropzone`,
  dropzoneInner: `${PREFIX}-dropzoneInner`,
  dropzoneInnerDrag: `${PREFIX}-dropzoneInnerDrag`,
  dropzoneIcon: `${PREFIX}-dropzoneIcon`,
  actions: `${PREFIX}-actions`,
};

const Root = styled("div")(({ theme: { palette, spacing } }) => ({
  [`&.${classes.root}`]: {
    marginTop: spacing(2),
  },
  [`& .${classes.dropzone}`]: {
    display: "flex",
  },
  [`& .${classes.dropzoneInner}`]: {
    flex: 1,
    outline: `dashed 3px ${palette.primary.main}`,
    padding: spacing(2),
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      background: "rgba(0, 0, 0, .1)",
    },
  },
  [`& .${classes.dropzoneInnerDrag}`]: {
    outlineStyle: "solid",
    background: "rgba(0, 0, 0, .1)",
  },
  [`& .${classes.dropzoneIcon}`]: {
    fontSize: "3rem",
    marginBottom: spacing(1),
    color: palette.text.secondary,
  },
  [`& .${classes.actions}`]: {
    position: "absolute",
    bottom: 0,
    right: 0,
    background: "rgba(0, 0, 0, .5)",
    color: palette.common.white,
  },
}));

export default function Images({ images, setImages }) {
  const addImage = useCallback(
    (img) => setImages((imgs) => [...imgs, img]),
    [setImages]
  );
  const removeImage = useCallback(
    (img) => setImages((imgs) => imgs.filter((i) => i !== img)),
    [setImages]
  );

  const onDrop = useCallback((files) => files.forEach(addImage), [addImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ["image/*"],
    multiple: true,
    onDrop,
  });

  return (
    <Root className={classes.root}>
      <Typography variant="subtitle1">Bilder</Typography>
      <Grid>
        {images.map((img, i) =>
          img.src ? (
            <ExistingImage key={i} img={img} removeImage={removeImage} />
          ) : (
            <NewImage key={i} file={img} removeImage={removeImage} />
          )
        )}
        <GridTile className={classes.dropzone}>
          <div
            {...getRootProps()}
            className={`${classes.dropzoneInner} ${isDragActive ? classes.dropzoneInnerDrag : ""}`}
          >
            <input {...getInputProps()} />
            <AddImageIcon className={classes.dropzoneIcon} />
            <Typography variant="body2">
              {isDragActive
                ? "Lege die Bilder hier ab."
                : "Ziehe Bilder hierher oder klicke."}
            </Typography>
          </div>
        </GridTile>
      </Grid>
    </Root>
  );
}

function ExistingImage({ img, removeImage }) {
  return (
    <GridTile style={{ backgroundImage: `url(${img.src})` }}>
      <ImageActions image={img} removeImage={removeImage} />
    </GridTile>
  );
}

function NewImage({ file, removeImage }) {
  const [data, setData] = useState();
  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => setData(e.target.result);
    reader.readAsDataURL(file);
  }, [file, setData]);

  return data ? (
    <GridTile style={{ backgroundImage: `url(${data})` }}>
      <ImageActions image={file} removeImage={removeImage} />
    </GridTile>
  ) : (
    <GridTile>
      <CircularProgress />
    </GridTile>
  );
}

function ImageActions({ image, removeImage }) {
  return (
    (<div className={classes.actions}>
      <IconButton onClick={() => removeImage(image)} color="inherit" size="large">
        <DeleteIcon />
      </IconButton>
    </div>)
  );
}
