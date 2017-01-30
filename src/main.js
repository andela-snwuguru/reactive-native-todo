/**
 * Created by sundayguru on 30/01/2017.
 */

var React = require('react');


import  {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
}  from 'react-native';

var Todo = React.createClass({
    getInitialState: () => {
        return {
            notes: []
        }
    },
    render: () => {
        return (
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Welcome to React Native!
            </Text>
            <Text style={styles.instructions}>
              To get started, edit index.android.js
            </Text>
            <Text style={styles.instructions}>
              Double tap R on your keyboard to reload,{'\n'}
              Shake or press menu button for dev menu
            </Text>
          </View>
        );
     }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

module.exports = Todo;