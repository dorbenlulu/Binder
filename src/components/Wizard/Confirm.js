import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { List, ListItem } from "material-ui/List";
import Button from "@material-ui/core/Button";

@inject("generalStore", "user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer
class Confirm extends Component {
  continue = async event => {
    event.preventDefault();
    this.props.nextStep();
    await axios.post(`http://localhost:8080/signIn`, this.props.values);
  };

  back = event => {
    event.preventDefault();
    this.props.previousStep();
  };

  componentDidMount() {
    this.props.generalStore.setHeaderLabel("Confirm Information");
  }

  render() {
    const {
      values: {
        firstName,
        lastName,
        age,
        email,
        status,
        desiredRelationship,
        interstedIn,
        gender,
        picture
      }
    } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <List>
            <ListItem primaryText="First Name" secondaryText={firstName} />
            <ListItem primaryText="Last Name" secondaryText={lastName} />
            <ListItem primaryText="Age" secondaryText={age} />
            <ListItem primaryText="Email" secondaryText={email} />
            <ListItem primaryText="Status" secondaryText={status} />
            <ListItem
              primaryText="Desired Relationship"
              secondaryText={desiredRelationship}
            />
            <ListItem primaryText="Intersted In" secondaryText={interstedIn} />
            <ListItem primaryText="Gender" secondaryText={gender} />
            <ListItem primaryText="Picture" secondaryText={picture} />
          </List>
          <br />
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
            onClick={this.continue}
          >
            Confirm&Continue
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={styles.button}
            onClick={this.back}
          >
            Back
          </Button>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  buttons: {
    margin: 15
  }
};

export default Confirm;
