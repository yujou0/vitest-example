import { test, describe, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Products from '../src/components/Products.vue';
import App from '../src/App.vue';
import axios from 'axios';
describe('App.vue', () => {

    const getProducts = vi.spyOn(axios, 'get');
    // vi.spyOn監視 axios, 'get'可以知道 axios.get 方法是否被呼叫，呼叫時的參數是什麼等等。
    getProducts.mockReturnValue({ data: [
      {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
            "rate": 3.9,
            "count": 120
        }
      },
    ]});
//模擬(mock)返回值，回應內容的格式應該和預期的回應格式一致
    test('products 方法有被呼叫一次', () => {
        expect(getProducts).toHaveBeenCalledTimes(1);
      });


//測試App
//   const wrapper = mount(App);

//測試 Products 元件
const wrapper = mount(App, {
    global: {
      components: {
        Products
      }
    }
  });

  test('標題是否為 IsRayNotArray 正確', () => {
    const text = wrapper.find('h1.text-base').text();
    expect(text).toBe('IsRayNotArray');
  });

  test('products 目前已經有資料，而且資料長度為 3', () => {
    expect(wrapper.vm.products.length).toBe(3);
  });
  
  test('products 裡面的資料是否正確', () => {
    expect(wrapper.vm.products[0].title).toBe("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops");
  })

  function add(a, b) {
    return a + b;
  }

  test('add 函式可以正常運作並回傳 3', () => {
    expect(add(1, 2)).toBe(3);
  });
  
//   spyOn 在使用的時候要多加注意，它第一個參數必須是一個物件，而第二個參數必須是一個字串，而且字串必須是物件的方法，否則會失敗。
const cart = {
    getApples: () => 13,
  }
  
  const spy = vi.spyOn(cart, 'getApples')
  

  test('Products 元件是否存在於畫面上', () => {
    expect(wrapper.findComponent(Products).exists()).toBe(true);
  });
  

  test('Products 元件是否正確顯示商品資訊', () => {
    const items = wrapper.findAll('li');
    expect(items.length).toBe(3);
    expect(items[0].text()).toBe('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
    expect(items[1].text()).toBe('Mens Casual Premium Slim Fit T-Shirts ');
    expect(items[2].text()).toBe('Mens Cotton Jacket');
  });
  
});
