
import { useLayoutEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, } from 'react-native';
import MealDetails from '../components/MealDetails';
import { MEALS } from '../data/dummy-data';
import Subtitle from '../components/MealDetail/Subtitle';
import List from '../components/MealDetail/List'
import IconButton from '../components/IconButton';
import {useDispatch,useSelector} from 'react-redux';
import {addFavorite,removeFavorite} from '../store/redux/favorites';


function MealDetailScreen({ route, navigation }) {

    const favoriteMealIds = useSelector((state) =>state.favoriteMeals.ids);   //hook
    
    const dispatch =  useDispatch();
  
    const mealId = route.params.mealId;

    const selecteMeal = MEALS.find((meal) => meal.id === mealId);

    const mealIsFavorite = favoriteMealIds.includes(mealId);

    function changeFavoriteStatusHandler() {
        if(mealIsFavorite){
           dispatch(removeFavorite({id:mealId}));
        } else {
           dispatch(addFavorite({id:mealId}));
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                <IconButton
                    icon={mealIsFavorite ? 'star' : 'star-outline'}
                    color='yellow'
                    onPress={changeFavoriteStatusHandler}
                />
                );
            },
        });
    }, [navigation, changeFavoriteStatusHandler]);
    return (
        <ScrollView style={styles.rootContainer}>
            <Image style={styles.image} source={{ uri: selecteMeal.imageUrl }} />
            <Text style={styles.title}>{selecteMeal.title}</Text>
            <MealDetails
                duration={selecteMeal.duration}
                complexity={selecteMeal.complexity}
                affordability={selecteMeal.affordability}
                textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>

                    <List data={selecteMeal.ingredients} />

                    <Subtitle>steps</Subtitle>
                    <List data={selecteMeal.steps} />

                </View>
            </View>


        </ScrollView>
    );

}

export default MealDetailScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32
    },
    image: {
        width: '100%',
        height: 350
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white'
    },
    detailText: {
        color: 'white'
    },
    listOuterContainer: {
        alignItems: 'center'
    },
    listContainer: {
        width: '80%'
    },


});