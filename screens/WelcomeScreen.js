import { FlatList } from 'react-native';
import WelcomeScreenGridTile from '../components/WelcomeHomeGridTile';

import { CATEGORIES } from '../data/dummy-data';



function WelcomeScreen({navigation}) {

    function renderCategoryItem(itemData) {

        function pressHandler(){
            navigation.navigate("TaskScreen");
        }
    
        return (
            <WelcomeScreenGridTile title={itemData.item.title} color={itemData.item.color} onPress={pressHandler}/>
        );
    }

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}

export default WelcomeScreen;