import { menuData } from "../data/menuData";

//runs once file loads, no re-renders, accessible inside all hooks 
export const menuMap = Object.values(menuData)
    .flat()
    .reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
}, {});