import { Person as PersonIcon } from "@mui/icons-material";
import { Avatar, Button, IconButton, Popover, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useCallback, useState } from "react";
import { useAuth } from "./auth";

const PREFIX = "UserProfileButton";

const classes = {
  wrapper: `${PREFIX}-wrapper`,
  image: `${PREFIX}-image`,
  info: `${PREFIX}-info`,
  signout: `${PREFIX}-signout`,
};

const Root = styled("div")(({ theme: { spacing } }) => ({
  [`&.${classes.wrapper}`]: {
    display: "flex",
  },
  [`& .${classes.image}`]: {},
  [`& .${classes.info}`]: {
    padding: spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  [`& .${classes.signout}`]: {
    marginTop: "auto",
  },
}));

export default function UserProfileButton() {
  const { user, signOut } = useAuth();
  const [anchor, setAnchor] = useState();
  const handleClick = useCallback(
    (e) => setAnchor(e.currentTarget),
    [setAnchor]
  );
  const handleClose = useCallback(() => setAnchor(null), [setAnchor]);

  if (!user) return null;

  return (<>
    <IconButton color="inherit" onClick={handleClick} size="large">
      {user.photoURL ? (
        <Avatar src={user.photoURL} alt={user.displayName || user.email} />
      ) : (
        <PersonIcon />
      )}
    </IconButton>
    <Popover
      open={Boolean(anchor)}
      anchorEl={anchor}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <UserPopover user={user} signOut={signOut} />
    </Popover>
  </>);
}

function UserPopover({ user, signOut }) {
  return (
    <Root className={classes.wrapper}>
      {user.photoURL && (
        <img
          src={user.photoURL}
          width={128}
          height={128}
          className={classes.image}
          alt={user.label}
        />
      )}
      <div className={classes.info}>
        {user.label && <Typography gutterBottom>{user.label}</Typography>}
        <Button onClick={signOut} fullWidth className={classes.signout}>
          Sign out
        </Button>
      </div>
    </Root>
  );
}
