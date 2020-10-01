import React from "react";
import "./App.css";
import ListItems from "./ListItems";
import {
  Button,
  TextField,
  Fab,
  IconButton,
  List,
  Grid,
  Snackbar,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/Alert";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertOpen: false,
      items: [],
      currentItem: {
        text: "",
        key: "",
      },
    };
  }

  handleInput = (e) => {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now(),
      },
    });
  };

  addItem = (e) => {
    e.preventDefault();
    const newItem = this.state.currentItem;
    console.log(newItem);
    if (newItem.text !== "") {
      const newItems = [...this.state.items, newItem];
      this.setState({
        items: newItems,
        currentItem: {
          text: "",
          key: "",
        },
        alertOpen: true,
      });
    }
  };
  handleDelete = (key) => {
    const filteredItems = this.state.items.filter((item) => item.key !== key);
    this.setState({
      items: filteredItems,
    });
  };
  handleClose = (event, reason) => {
    this.setState({
      alertOpen: false,
    });
  };

  render() {
    return (
      <div className="app">
        <Grid container spacing={1} className="container">
          <Grid item md={4}></Grid>
          <Grid item md={4} className="app-grid">
            <header>
              <form
                className="todo-form"
                noValidate
                autoComplete="off"
                onSubmit={this.addItem}
              >
                <TextField
                  id="outlined-basic"
                  label="Yapılacakları girin..."
                  variant="outlined"
                  value={this.state.currentItem.text}
                  onChange={this.handleInput}
                  inputProps={{
                    maxLength: 25,
                  }}
                  size="medium"
                  multiline="true"
                />
                <IconButton
                  color="primary"
                  aria-label="add"
                  className="add-button"
                  type="submit"
                >
                  <AddIcon />
                </IconButton>

                <Snackbar
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  open={this.state.alertOpen}
                  autoHideDuration={2000}
                  onClose={this.handleClose}
                >
                  <Alert onClose={this.handleClose} severity="success">
                    Başarıyla kaydedildi!
                  </Alert>
                </Snackbar>
              </form>
            </header>

            <List>
              <ListItems
                items={this.state.items}
                handleDelete={this.handleDelete}
              ></ListItems>
            </List>
          </Grid>
          <Grid item md={4}></Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
