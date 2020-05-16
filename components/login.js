import React, { Component, PropTypes } from 'react';
import {
  Linking,
  StyleSheet,
  Platform,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';

export default class Login extends Component {

  static propTypes = {
    onLoggedIn: PropTypes.func.isRequired
  };

  
  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  };

  componentWillUnmount() {
    // remov listener
    Linking.removeEventListener('url', this.handleOpenURL);
  };

  handleOpenURL = ({ url }) => {
    const [, user_string] = url.match(/user=([^#]+)/);
    const user = JSON.parse(decodeURI(user_string));
    this.props.onLoggedIn(user);
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  loginWithFacebook = () => this.openURL('https://localhost:3000/auth/facebook');
  loginWithGoogle = () => this.openURL('https://localhost:3000/auth/google');

  openURL = (url) => {
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    }
    
    else {
      Linking.openURL(url);
    }
  };

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.content}>
          <Text style={styles.header}>
            Welcome Stranger!
          </Text>
          <View style={styles.avatar}>
            <Icon name="user-circle" size={100} color="rgba(0,0,0,.09)" />
          </View>
          <Text style={styles.text}>
            Please log in to continue {'\n'}
            to the awesomness
          </Text>
        </View>

        <View style={styles.buttons}>
          <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={this.loginWithFacebook}
            {...iconStyles}
          >
            Login with Facebook
          </Icon.Button>
          <Icon.Button
            name="google"
            backgroundColor="#DD4B39"
            onPress={this.loginWithGoogle}
            {...iconStyles}
          >
            Or with Google
          </Icon.Button>
        </View>

      </View>
    );
  }
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: 20,
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30,
  },
});