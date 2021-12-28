const groupCount = 1;
const groupInfoList = {'group1': {'count':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group2': {'count':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group3': {'count':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group4': {'count':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group5': {'count':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group6': {'count':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group7': {'count':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group8': {'count':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group9': {'count':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group10': {'count':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group11': {'count':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group12': {'count':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0}
                    };

const stockTypeArr = ['bio', 'electronics', 'construction', 'food', 'broadcast'];
const turnTypeArr = ['count', 'price1', 'price2', 'price3', 'price4', 'price5', 'price6', 'price7', 'price8', 'price9'];

const stockPrice = {"bio":{"count":0, "price1":0, "price2":0, "price3":0, "price4":0, "price5":0, "price6":0, "price7":0, "price8":0, "price9":0},
                  "construction":{"count":0, "price1":0, "price2":0, "price3":0, "price4":0, "price5":0, "price6":0, "price7":0, "price8":0, "price9":0},
                  "electronics":{"count":0, "price1":0, "price2":0, "price3":0, "price4":0, "price5":0, "price6":0, "price7":0, "price8":0, "price9":0},
                  "food":{"count":0, "price1":0, "price2":0, "price3":0, "price4":0, "price5":0, "price6":0, "price7":0, "price8":0, "price9":0},
                  "broadcast":{"count":0, "price1":0, "price2":0, "price3":0, "price4":0, "price5":0, "price6":0, "price7":0, "price8":0, "price9":0}
                  };
const defaultAPI = 'http://18.221.173.188:8080';

const userInfoButtonList = ['cash', 'bio', 'construction', 'electronics', 'food', 'broadcast'];

export { stockPrice, groupCount, groupInfoList, stockTypeArr, turnTypeArr, defaultAPI, userInfoButtonList }