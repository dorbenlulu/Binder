import React, { Component } from 'react';
import { observer, inject } from "mobx-react"

@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer
class EditProfile extends Component {
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default EditProfile;