import { Avatar, Chip, Typography } from "@mui/material";

import { useUser } from "./data";
import DelayedProgress from "./DelayedProgress";

export default function UserChip({ id, ...props }) {
  const [user, loading, error] = useUser(id);
  if (loading) return <DelayedProgress size="1em" {...props} />;
  if (error)
    return (
      <Typography color="error" {...props}>
        {error.message}
      </Typography>
    );
  return (
    <Chip
      avatar={user.photoURL && <Avatar src={user.photoURL} />}
      label={user.label}
      {...props}
    />
  );
}
