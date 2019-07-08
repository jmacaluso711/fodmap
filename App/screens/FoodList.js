import React from 'react';
import { 
  SafeAreaView, 
  View,
  Text, 
  ScrollView, 
  ActivityIndicator,
  Header,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import ListItem, { Separator } from '../components/ListItem';

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  filterContainer: {
    height: 75,
    paddingHorizontal: 10,
    backgroundColor: '#2D3748'
  },
  filterContentContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3182CE',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 8,
    borderRadius: 3
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})

class FoodList extends React.Component {
  state = {
    food: [],
    removeFilters: true,
    categoryList: [],
    filteredList: [],
    loading: true
  }

  async componentDidMount() {
    const url = `https://api.sheety.co/56ff1558-1370-4b28-8113-557b9383d6c5`;
    try {
      const FoodApi = await fetch(url);
      const Food = await FoodApi.json();
      this.setState({
        food: Food,
        loading: false,
      })
    } catch (e) {
      console.error(e);
    }

    this.availableCategories();
  }

  availableCategories = () => {
    const categories = [...this.state.food].map(f => f.category);
    const categoryList = Array.from(new Set(categories));
    this.setState({
      categoryList: categoryList
    });
  }

  renderFilters = () => {
    return (
      <ScrollView
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContentContainer}
        horizontal='true'
      >
        {this.state.categoryList.map((item) => (
          <TouchableOpacity
            style={styles.button}
            key={item} 
            onPress={() => {
              const filteredList = [...this.state.food].filter(f => f.category === item);
              this.setState({
                filteredList: filteredList,
                removeFilters: false
              });
            }}
          >
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    )
  }

  render() {
    const { food, loading, filteredList, removeFilters } = this.state;

    if (!loading) {
      return (
        <SafeAreaView>
          {this.renderFilters()}
          <ScrollView>
            {removeFilters ? 
              food.map((f, index) =>
                <React.Fragment key={index}>
                  <ListItem 
                    name={f.food} 
                    fodMap={f.fODMap}
                  />
                  <Separator />
                </React.Fragment>
              ) :
              filteredList.map((f, index) =>
                <React.Fragment key={index}>
                  <ListItem
                    name={f.food}
                    fodMap={f.fODMap}
                  />
                  <Separator />
                </React.Fragment>
              )
            }
          </ScrollView>
        </SafeAreaView>
      )
    } else {
      return <ActivityIndicator />
    }
  }
}

export default FoodList;