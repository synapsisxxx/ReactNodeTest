//make API call t fetch existing comments when being loaded for first time
//render scrollable list with comments rendered as Comment components and an input field rendered by Input component
//refresh comments

import React, { Component, PropTypes } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { get, put } from '../../api';
import Comment from './comment';
import Input from './input';

export default class List extends Component {

  static propTypes = {
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    comments: [], // array of comments fetched from the API backend
    refreshing: true, // if refreshed or not
  };

  componentWillMount = () => this.fetchComments();
  onRefresh = () => this.fetchComments();

  fetchComments = async () => {
    this.setState({ refreshing: true });
    try {
      const response = await get('comments');
      // Convert to JSON
      const json = await response.json();
      this.setState({
        refreshing: false,
        comments: json.comments
      });
    }
    catch (error) {
      alert(error);
    }
  };

  // submit new comment
  submitComment = async (comment) => {
    const { user } = this.props;
    this._scrollView.scrollTo({ y: 0 });
    try {
      const response = await put('comments', {
        user_id: user._id,
        content: comment,
      });
      const json = await response.json();
      this.setState({
        // new comment on top
        comments: [json.comment, ...this.state.comments]
      });
    }
    catch (error) {
      alert(error);
    }
  };

  render() {
    const { comments } = this.state;
    return (
      <View style={styles.container}>
        {/* scrollable list */}
        <ScrollView
          ref={(scrollView) => { this._scrollView = scrollView; }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          {/* render comment wit Comment component */}
          {comments.map((comment, index) => <Comment comment={comment} key={index} />)}
        </ScrollView>
        {/* comment input */}
        <Input onSubmit={this.submitComment} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20,
  }
});