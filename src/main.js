/**
 * Created by sundayguru on 30/01/2017.
 */

var React = require('react');
import  {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    ListView,
    TouchableHighlight
}  from 'react-native';
var Firebase = require('firebase');

var Todo = React.createClass({
    getInitialState: function() {
        var config = {
            apiKey: "AIzaSyCnfsQd_Rq9TgVryG8O-pyESly3YbiO-B4",
            authDomain: "mightys.firebaseapp.com",
            databaseURL: "https://mightys.firebaseio.com",
            storageBucket: "firebase-mightys.appspot.com",
            messagingSenderId: "92071818184"
        };
        Firebase.initializeApp(config);

        var db = Firebase.database();
        this.itemsRef = db.ref('items');
        this. items = [];
        return {
            newTodo: '',
            todoSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
        }
    },
    componentDidMount: function() {
      this.itemsRef.on('child_added', (dataSnapshot) => {
        this.items.push({id: dataSnapshot.key, text: dataSnapshot.val()});
        this.setState({
          todoSource: this.state.todoSource.cloneWithRows(this.items)
        });
      });

      this.itemsRef.on('child_removed', (dataSnapshot) => {
          this.items = this.items.filter((x) => x.id !== dataSnapshot.key);
          this.setState({
            todoSource: this.state.todoSource.cloneWithRows(this.items)
          });
      });

    },
    render: function() {
        return (
          <View style={styles.appContainer}>
              <View style={styles.titleView}>
                <Text style={styles.titleText}>
                  My Todos
                </Text>
              </View>
              <View style={styles.inputcontainer}>
                <TextInput style={styles.input} onChangeText={(text) => this.setState({newTodo: text})} value={this.state.newTodo}/>
                <TouchableHighlight
                  style={styles.button}
                  onPress={() => this.addTodo()}
                  underlayColor='#dddddd'>
                  <Text style={styles.btnText}>Add!</Text>
                </TouchableHighlight>
              </View>
              <ListView
                dataSource={this.state.todoSource}
                renderRow={this.renderRow} />
            </View>
        );
     },
    addTodo: function()  {
      if (this.state.newTodo !== '') {
        this.itemsRef.push({
          todo: this.state.newTodo
        });
        this.setState({
          newTodo : ''
        });
      }
    },
    removeTodo: function(rowData) {
      this.itemsRef.child(rowData.id).remove();
    },
    renderRow: function(rowData) {
      return (
        <TouchableHighlight
          underlayColor='#dddddd'
          onPress={() => this.removeTodo(rowData)}>
          <View>
            <View style={styles.row}>
              <Text style={styles.todoText}>{rowData.text.todo}</Text>
            </View>
            <View style={styles.separator} />
          </View>
        </TouchableHighlight>
      );
    }
});

const styles = StyleSheet.create({
  appContainer:{
    flex: 1
  },
  titleView:{
    backgroundColor: '#48afdb',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  titleText:{
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20
  },
  inputcontainer: {
    marginTop: 5,
    padding: 10,
    flexDirection: 'row'
  },
  button: {
    height: 36,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#48afdb',
    justifyContent: 'center',
    color: 'white',
    borderRadius: 4
  },
  btnText: {
    fontSize: 18,
    color: 'white',
    marginTop: 6
  },
  input: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48afdb',
    borderRadius: 4,
    color: '#48BBEC'
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 44
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  },
  todoText: {
    flex: 1
  }
});

module.exports = Todo;