// export interface Product {
//   id: string;
//   name: string;
//   type: number;
//   price: number;
//   img: string;
//   desc: string;
//   volume: number;
// }

// export enum CategoryTypes {
//   "" = 0,
//   computer = 1,
//   furniture = 2,
//   book = 3,
// }

export interface MenuType {
  name: string;
  type: number;
}

export const MenuData: MenuType[] = [
  { name: '全部', type: 0 },
  { name: '电脑', type: 1 },
  { name: '家具', type: 2 },
  { name: '图书', type: 3 },
]
