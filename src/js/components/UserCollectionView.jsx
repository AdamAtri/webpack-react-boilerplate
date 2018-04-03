import './user-style.scss';
import React from 'react';
import UserView from './UserView';

const users = require('../../assets/user-data.json');

class UserCollectionView extends React.Component {
  render() {
    return (
      <ul>
        {users.map( user => {
          return (<li key={user.id} onClick={this.logUser.bind(null, user)}><UserView user={user}/></li>);
        })}
      </ul>
    );
  }

  logUser(user, e) {
    console.log(e.currentTarget);
    e.preventDefault();
    console.log(user);
  }
}

export default UserCollectionView;
