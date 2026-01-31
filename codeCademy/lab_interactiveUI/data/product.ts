import { Product } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "Thinking Cap",
    price: 29.99,
    image:
      "https://static-assets.codecademy.com/Courses/learn-react-native-v53/03-interactive-uis/lab/hello-world-hat.jpg",
    onSale: true,
  },
  {
    id: 2,
    name: "Hoodie",
    price: 59.99,
    image:
      "https://static-assets.codecademy.com/Courses/learn-react-native-v53/03-interactive-uis/lab/hoodie.png",
    onSale: false,
  },
  {
    id: 3,
    name: "Sweatpants",
    price: 49.99,
    image:
      "https://static-assets.codecademy.com/Courses/learn-react-native-v53/03-interactive-uis/lab/sweatpants.png",
    onSale: false,
  },
];
