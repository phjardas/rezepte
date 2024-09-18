import { ImageListItem } from "@mui/material";
import { forwardRef, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function ImageListItemLink({ to, children, ...props }) {
  const renderLink = useMemo(
    () =>
      forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <ImageListItem component={renderLink} {...props}>
      {children}
    </ImageListItem>
  );
}
