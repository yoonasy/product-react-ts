import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../index';
import productApi from "@/api/product.api";
import { useAppSelector } from "../hooks";

export interface ProductItem {
  id: string;
  name: string;
  type: number;
  price: number;
  img: string;
  desc: string;
  volume: number;
}

export interface ProductState {
  list: Array<ProductItem>
}

const initialState: ProductState = {
  list: []
};

const genRandom = (limit: number, count: number): Array<number> => {
  limit = limit - 1 // 0~299 300个偏移数
  const temp: number[] = []

  while (temp.length < count) {
    const rand = Number.parseInt(String(Math.random() * limit)) // 随机生成

    if (!temp.some(e => e === rand)) { // 不存在就添加
      temp.push(rand)
    }
  }

  return temp.sort((a, b) => a - b)
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(fetchDataAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchDataAsync = createAsyncThunk(
  'product/fetchList',
  async ({type, size, randomUpdate}: { type: number, size: number, randomUpdate?: boolean }, thunkAPI) => {
    let currentList = selectProduct(thunkAPI.getState() as RootState);
    const res = await productApi.getProductList(type, size)

    // 随机更新
    if (randomUpdate) {
      const updateIndex = genRandom(currentList.length, size)

      return currentList.map((e, i) => {
        if (updateIndex.some(j => j === i)) {
          return {
            ...res.splice(0, 1)[0],
            id: e.id
          }
        }

        return e
      })
    }

    return res
  }
);

export const product = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    assign: (state, action: PayloadAction<ProductItem[]>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.list = action.payload
    },
    // random update Product
    randomUpdate: (state, action: PayloadAction<ProductItem[]>) => {
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<ProductItem[]>) => {
      state.list = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // 文档：https://redux-toolkit.js.org/api/createSlice#extrareducers
  // 主要用于监听额外自定义的动作（支持异步） 或是其他切片的动作   可写成对象形式 {  [counter.actions.increment]: (state, action) => {} } 或是 addCase(counter.actions)
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAsync.pending, (state) => {
        // state.status = 'loading';
      })
      .addCase(fetchDataAsync.fulfilled, (state, action) => {
        state.list = action.payload
      });
  },
});

export const {assign, randomUpdate, incrementByAmount} = product.actions;
// export const actions = product.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.product.value)`
export const selectProduct = (state: RootState) => state.product.list;
export const selectProductItem = (state: Array<ProductItem>, id: string) => state.find(e => e.id === id)

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const clear = (): AppThunk => (
  dispatch,
  getState
) => {
  // const currentList = selectProduct(getState());
  dispatch(incrementByAmount([]));
};

export default product.reducer;
