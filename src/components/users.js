import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { fetchListUsers } from '../actions';
import Loader from './loader';
import UsersList from './usersList';


class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      getUsersList: false,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    const { listUsers } = this.props;
    const { page } = this.state;
    setTimeout(() => {
      listUsers(page);
      window.addEventListener('scroll', this.handleScroll);
      this.setState({ getUsersList: true });
    }, 3000);
  }

  handleScroll() {
    const { listUsers } = this.props;
    const { page } = this.state;
    const element = document.getElementById('users-wrap');
    const wrapHeight = element.offsetHeight;
    const scrollPosition = window.innerHeight + window.pageYOffset;
    const timeToLoadMore = Math.ceil(scrollPosition) >= wrapHeight;
    if (timeToLoadMore) {
      const nextPage = page + 1;
      this.setState({ page: nextPage }, listUsers(nextPage));
    }
  }

  renderLoadLastPage(readOnly) {
    if (readOnly.data.page !== undefined || readOnly.data.total_pages !== undefined) {
      if (readOnly.data.page >= readOnly.data.total_pages) {
        return (
          <div className="no-more">
            NO MORE USERS
          </div>);
      }
      return <div />;
    }
    return true;
  }

  renderUsersList(readOnly) {
    if (readOnly.users.length > 0) {
      return readOnly.users.map((user) => {
        return (
          <li key={user.id}>
            <UsersList
              {...user}
            />
          </li>
        );
      });
    }
    return <Loader />;
  }

  render() {
    const readOnly = this.props;
    const { getUsersList } = this.state;
    return (
      <div>
        <div className="users" id="users-wrap">
          {getUsersList
            ? (
              <div className="title">
                USERS
              </div>) : <div />}
          <ul>
            {this.renderUsersList(readOnly)}
          </ul>
          {this.renderLoadLastPage(readOnly)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return state;
};

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({
    listUsers: fetchListUsers,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);

Users.propTypes = {
  listUsers: PropTypes.func.isRequired,
};
