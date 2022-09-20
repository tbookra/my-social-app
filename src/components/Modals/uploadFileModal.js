import { useState, Fragment } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function UploadFileModal({anchor,functions, positioning}) {
  const [openModal, setOpenModal] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenModal(open);
  };

  const list = () => (
    <Box
      sx="auto" // or 250
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
          <ListItem  disablePadding>
            <ListItemButton onClick={()=>functions[0]("cover")}  >
              <ListItemIcon>
                <DeleteIcon  />
              </ListItemIcon>
              <ListItemText primary="Delete Picture" />
            </ListItemButton>
          </ListItem>
      </List>
      <List>
          <ListItem  disablePadding>
            <ListItemButton onClick={()=>functions[1]("cover")}  >
              <ListItemIcon>
                <FileUploadIcon  />
              </ListItemIcon>
              <ListItemText primary="Upload Picture" />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );
  return (
    <>
        <Button onClick={toggleDrawer(true)}>
          <EditIcon
            color="action"
            style={positioning}
          />
        </Button>
        <SwipeableDrawer
          anchor={anchor}
          open={openModal}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list()}
        </SwipeableDrawer>
    </>
  );
}
