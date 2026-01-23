import drink1 from "../images/drinks/hl1.png";
import drink2 from "../images/drinks/ht1.png";
import drink3 from "../images/drinks/capp1.png";
import drink4 from "../images/drinks/iced_coffee.png";
import drink5 from "../images/drinks/iced_latte.png";
import drink6 from "../images/drinks/moch1.png";
//foods
import food1 from "../images/foods/fd1.png";
import food2 from "../images/foods/fd2.png";
import food3 from "../images/foods/fd3.png";
import food4 from "../images/foods/fd4.png";
import food5 from "../images/foods/fd5.png";
//desserts
import dessert1 from "../images/desserts/ds1.png";
import dessert2 from "../images/desserts/ds2.png";
import dessert3 from "../images/desserts/ds3.png";
import dessert4 from "../images/desserts/ds4.png";

export const menuData = {
    drinks: [
        { id: 1, name: "Hot Latte", price: 6.5, image: drink1 },
        { id: 2, name: "Americano", price: 5.5, image: drink2 },
        { id: 3, name: "Hot Tea", price: 7.0, image: drink3 },
        { id: 4, name: "Hot Mocha", price: 7.5, image: drink4 },
        { id: 5, name: "Iced Coffee", price: 7.0, image: drink5 },
        { id: 6, name: "Iced Latte", price: 7.0, image: drink6 }
    ],
    food: [
        { id: 7, name: "Ham and Egg Sandwich", price: 8.5, image: food1 },
        { id: 8, name: "Egg Platter", price: 6.0, image: food2 },
        { id: 9, name: "Croissant and Egg", price: 5.5, image: food3 },
        { id: 10, name: "Butter, Honey Pancake", price: 7.0, image: food4 },
        { id: 11, name: "Waffles and Egg", price: 7.5, image: food5 }
    ],
    desserts: [
        { id: 12, name: " Strawberry Cheesecake", price: 5.0, image: dessert1 },
        { id: 13, name: "Ice Cream and Mochi", price: 7.5, image: dessert2 },
        { id: 14, name: "Egg Pie", price: 5.5, image: dessert3 },
        { id: 15, name: "Cherry Cream Cookies", price: 6.5, image: dessert4 }
    ]
};