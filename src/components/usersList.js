import React from 'react';
import { PropTypes } from 'prop-types';

const UsersList = user => (
  <div className="content">
    <img src={user.avatar} alt={user.first_name} />
    <span>
      {user.first_name}
      &nbsp;
      {user.last_name}
    </span>
  </div>
);

export default UsersList;

UsersList.propTypes = {
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};
