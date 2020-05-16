
// component for rendering user avatar, name, comment, time since posting

import React, { PureComponent, PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import moment from 'moment';

export default class Comment extends PureComponent {

  static propTypes = {
    
    comment: PropTypes.shape({
      content: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
      
     user: PropTypes.shape({
       name: PropTypes.string.isRequired,
       avatar: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  render() {
    
    const { comment } = this.props;
    const { content, created, user } = comment;
    
    const { name, avatar } = user;
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          {avatar && <Image
            resizeMode='contain'
            style={styles.avatar}
            source={{ uri: avatar }}
          />}
        </View>
        <View style={styles.contentContainer}>
          <Text>
            <Text style={[styles.text, styles.name]}>{name}</Text>
            {' '}
            <Text style={styles.text}>{content}</Text>
          </Text>
          <Text style={[styles.text, styles.created]}>{moment(created).fromNow()}</Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatarContainer: {
    alignItems: 'center',
    marginLeft: 5,
    paddingTop: 10,
    width: 40,
  },
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
    padding: 5,
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 13,
    width: 26,
    height: 26,
  },
  text: {
    color: '#000',
    fontFamily: 'Avenir',
    fontSize: 15,
  },
  name: {
    fontWeight: 'bold',
  },
  created: {
    color: '#BBB',
  },
});