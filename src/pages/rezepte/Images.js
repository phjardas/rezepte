import { Card, CardContent, CircularProgress, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Grid, GridTile } from '../../Grid';

const useStyles = makeStyles(({ palette }) => ({
  root: {},
  actions: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    background: 'rgba(0, 0, 0, .5)',
    color: palette.common.white,
  },
}));

export default function Images({ images, setImages }) {
  const classes = useStyles();
  const addImage = useCallback((img) => setImages((imgs) => [...imgs, img]), [setImages]);
  const removeImage = useCallback((img) => setImages((imgs) => imgs.filter((i) => i !== img)), [setImages]);

  const onDrop = useCallback((files) => files.forEach(addImage), [addImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ['image/*'],
    multiple: true,
    onDrop,
  });

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1">Bilder</Typography>
      {images.length > 0 && (
        <Grid>
          {images.map((img, i) =>
            img.src ? <ExistingImage key={i} img={img} removeImage={removeImage} /> : <NewImage key={i} file={img} removeImage={removeImage} />
          )}
        </Grid>
      )}
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Card raised={isDragActive}>
          <CardContent>{isDragActive ? 'Lege die Bilder hier ab.' : 'Ziehe Bilder hierher oder klicke.'}</CardContent>
        </Card>
      </div>
    </div>
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
  const classes = useStyles();
  return (
    <div className={classes.actions}>
      <IconButton onClick={() => removeImage(image)} color="inherit">
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
