import React from 'react';

class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { create: new Date() };
  }

  render() {
    const { user } = this.props;
    return (
      <div className="user-view">
        <span className="user-name">{user.first_name} {user.last_name}</span><br/>
        <span className="user-email">{user.email}</span><br />
        <span className="user-create">{this.state.create.toLocaleString()}</span>
      </div>
    );
  }
}

export default UserView;
