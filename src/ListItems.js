import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  List,
  ListItemSecondaryAction,
} from "@material-ui/core";

export class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      selectedItem: "",
    };

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(event, reason) {
    this.setState({
      dialogOpen: false,
    });
  }

  render() {
    const items = this.props.items;
    const listItems = items.map((item) => {
      return (
        <div>
          <ListItem key={item.key}>
            <ListItemIcon>
              <RemoveIcon />
            </ListItemIcon>
            <ListItemText primary={item.text} />
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => {
                  this.setState({
                    dialogOpen: true,
                    selectedItem: item.key,
                  });
                }}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon color="secondary" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </div>
      );
    });

    return (
      <div>
        {listItems}
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Silmek istediğinize emin misiniz?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Hayır
            </Button>
            <Button
              onClick={() => {
                this.props.handleDelete(this.state.selectedItem);
                this.setState({
                  dialogOpen: false,
                });
              }}
              color="primary"
              autoFocus
            >
              Evet
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ListItems;
