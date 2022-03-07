import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
  TextInput,
  Dimensions,
  Keyboard,
} from 'react-native';
const { width } = Dimensions.get('screen');
// dummyData
let Customer = [
  { id: 0, name: 'Customer 1', salary: '199' },
  { id: 1, name: 'Customer 2', salary: '299' },
  { id: 2, name: 'Customer 3', salary: '399' },
  { id: 3, name: 'Customer 4', salary: '499' },
  { id: 4, name: 'Customer 5', salary: '599' },
];
// Parent vanthu Class Component but ithu Child Component.... Start with capital letter and name salaru props ah pass aagiduchi
function RenderItem({ name, salary, id, navigation }) {
  // onPress-la id pass pannittu antha id vanthu props ah pass aagum. press pannumbothu handlePressla pass aagum.
  const deleteCustomer = (id) => {
    // customerla id check panni id ah check panni  alert work aagum
    const customer = Customer.find((cust) => {
      // cust.id vera. intha id vera but rendume onnethaan check pannuthu
      return cust.id === id;
    });
     Customer = Customer.filter((cust) => {
    return cust.id !== id });
    Alert.alert(
      'hello',
      ` name:${customer.name} and salary:${customer.salary}`
    );
     navigation.reset({
      index: 0,
      routes: [
        {
          name: 'MainScreen',
        }
      ]
    });
  };
  const handlePress = (id) => {
    const customer = Customer.find((cust) => {
      // cust.id vera. intha id vera but rendume onnethaan check pannuthu
      return cust.id === id;
    });
    console.log(customer);
    // ithu maathuri use panna koodathu
    // const helloCustomer = Customer.filter((cust) => {
    //   return cust.id !== id;
    // });
    // Customer epdi use pannanum
    {
      /*-------------JUST DISABLE-----------Customer = Customer.filter((cust) => {
    return cust.id !== id;-----------------DELETED OPTIONKKU USE PANNIKIROM-------------------------------------
  });*/
    }
    const updateCustomer = (id, name, ) => {
      let updatedCustomer = {
        id,
        name: name,
        salary,
      };
      Customer = Customer.map((cust) =>
        cust.id === id ? { ...cust, ...updatedCustomer } : cust
      );
    // this.props.navigation props ah navigationla ah pass panni MainScreen ah index:0 muliyama ah reset aagum. athaadaavathu new screen kidaikum
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'MainScreen',
        }
      ]
    });
    };

    Alert.prompt('Update Customer', `Updating Customer ${id}`, [
        {
          text: "Update",
          onPress: (text) => updateCustomer(id,text),
          
        },
        { text: "Cancel",style: "cancel", onPress: () => console.log("Cancelled") }
      ]);
    
    // console.log(helloCustomer)
    console.log(Customer);
  };
  return (
    <TouchableOpacity
      // handlePressla id props ah eduthukkittu. athai Componentla props ah value pass aaguthu
      onPress={() => handlePress(id)}
      onLongPress={() => deleteCustomer(id)}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'grey',
        marginVertical: 10,
        paddingVertical: 10,
      }}>
      <Text
        style={{
          fontSize: 20,
          color: 'darkblue',
          backgroundColor: 'lightblue',
          marginLeft: 20,
        }}>
        {name}
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: 'red',
          backgroundColor: 'lightblue',
          marginRight: 20,
        }}>
        {salary}
      </Text>
    </TouchableOpacity>
  );
}
// Header component Scroll ah aagum.

function renderHeaderComp() {
  return (
    <View>
      <Text style={{ fontSize: 20, backgroundColor: 'white' }}>
        React Native FlatList Learn
      </Text>
    </View>
  );
}

export default class MainScreen extends React.Component {
  state = {
    name: '',
    salary: 0,
  };
  // addCustomerla navigation vanthu props ah pass aaguthu but inthai maathiri prop ah use pannala
  // addCustomer = (navigation) => {
  // Without props here. navigation props use pannala. but navigation resetla props ah use pandrom
  addCustomer = () => {
    const { name, salary } = this.state;
    if (name && salary) {
      Customer.push({
        id: Customer[Customer.length - 1].id + 1,
        name: name,
        salary: salary,
      });
      // inge props ah addCustomerla pass panni iruntha ah value pass aagum
      // navigation.reset({
      // inge direct ah this.props ah use panni navigation ah pass pannikkalaam
      this.props.navigation.reset({
        index: 0,
        routes: [
          {
            name: 'MainScreen',
          },
        ],
      });
      {
        /*Alert working fine but customer add aaganum. athanaala navigation reset use pandrom.*/
      }
      // Alert.alert(`Customer Name : ${name} and Customer Salary : ${salary}`);
    } else {
      Alert.alert('Error, Field Must not be Empty!');
    }
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'purple' }}>
        <View style={{ backgroundColor: 'yellow' }}>
          <FlatList
            data={Customer}
            // renderItem ma ah irukka koodathu Start with CAPITAL LETTER
            renderItem={({ item }) => (
              <RenderItem
                navigation={this.props.navigation}
                name={item.name}
                salary={item.salary}
                id={item.id}
              />
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            // Header component Scroll ah aagum.
            ListHeaderComponent={renderHeaderComp}
            ListHeaderComponentStyle={{
              backgroundColor: 'red',
              paddingHorizontal: 70,
              paddingVertical: 20,
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: 'pink',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{ fontSize: 20, color: 'red', backgroundColor: 'orange' }}>
            Add New Customer
          </Text>
          <TextInput
            style={{
              paddingVertical: 10,
              backgroundColor: 'grey',
              borderRadius: 20,
              fontSize: 20,
              paddingLeft: 20,
              width: width / 1.3,
              marginVertical: 20,
              borderWidth: 1,
              borderColor: '#000',
            }}
            placeholder={'Please add new customer name'}
            placeholderTextColor={{ backgroundColor: 'yellow' }}
            onChangeText={(text) => this.setState({ name: text })}
          />
          <TextInput
            style={{
              paddingVertical: 10,
              backgroundColor: 'grey',
              borderRadius: 20,
              fontSize: 20,
              paddingLeft: 20,
              width: width / 1.3,
              borderWidth: 1,
              borderColor: '#000',
            }}
            placeholder={'Please add new customer salary'}
            onChangeText={(text) => this.setState({ salary: text })}
            keyboardType="numeric"
          />
          {/* ithu maathiri navigation ah pass panna mudiyum*/}
          {/* <TouchableOpacity onPress={()=>this.addCustomer(this.props.navigation)} >*/}
          <TouchableOpacity
            // onPress={() => this.addCustomer(this.props.navigation)}>
            onPress={() => this.addCustomer()}>
            <Text
              style={{
                fontSize: 20,
                color: 'red',
                backgroundColor: 'lightblue',
                marginTop: 10,
              }}>
              Add Customer
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
