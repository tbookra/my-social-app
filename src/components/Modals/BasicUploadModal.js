import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ functions, positioning, theme }) {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () =>{
    functions[1](theme,file)
    setFile(null)
  }

  return (
    <div>
      <Button onClick={handleOpen}>
        <EditIcon color="action" style={positioning} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => functions[0](theme)}>
                <ListItemIcon>
                  {/* <DeleteIcon /> */}
                  <label htmlFor="deleteFile" className="shareOption">
                    <DeleteIcon className="shareIcon" htmlColor="tomato" />
                    <span className="shareOptionText">{`Delete ${theme} Picture`}</span>
                    <span
                      style={{ display: "none" }}
                      id="deleteFile"
                      className="fileInput"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                </ListItemIcon>
                <ListItemText />
              </ListItemButton>
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <label htmlFor={`file${theme}`} className="shareOption">
                    <FileUploadIcon className="shareIcon" htmlColor="tomato" />
                    <span className="shareOptionText">{`Update ${theme} Picture`}</span>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id={`file${theme}`}
                      className="fileInput"
                      accept=".png,.jpeg,.jpg"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                  {file && <Button  onClick={handleClick} >Update </Button>}
                </ListItemIcon>
                <ListItemText />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Modal>
    </div>
  );
}
