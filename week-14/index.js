function factorial(n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}

function hello(name = "bạn") {
    console.log(`hello ${name} nhé`);
}
let add = (x, y) => x + y;
function myFunction(callBackFunction) {
    callBackFunction("duy");
}

function myCallback(name) {
    console.log(`Hello ${name}`);
}
myFunction(myCallback);
// function
const courses = [
    { id: 1, name: "Javascript", coin: 200 },
    { id: 2, name: "HTML, CSS", coin: 0 },
    { id: 3, name: "PHP", coin: 100 },
    { id: 4, name: "Angular", coin: 0 },
];
let result=courses.filter((course, index)=> {
    return course.name==="Javascript";
})
// console.log(result[0].name.split("").reverse().);
let newCourses= courses.map( (course,index) => {
    return {
        id: course.id,
        name: `Khoa hoc: ${course.name}`,
        coin: course.coin,
        coinTex: `Gia: ${course.coin}`
    }
})
console.log(newCourses);
const ns=[1,2,3,4,5];
const newNs=ns.map((course)=> {
    return course*2;
})
console.log(newNs);

let i = 0;
function callback(accumulator, currentValue) {
    i++;
    console.table({
        "Luot chay: ": i,
        "Lưu trữ: ": accumulator,
        "Giá tiền: ": currentValue.coin,
        "Tổng tiền: ": accumulator + currentValue.coin,
    })
    return accumulator+currentValue.coin;
}

// // const total = courses.reduce(callback, 0);
// const sum=ns.reduce((acc,value) => {
//     return acc+value;
// })
// console.log(sum);

function customeSome(arr,myCallBack) {
    for (let i=0;i<arr.length;i++) {
        if(myCallBack(arr[i],i,arr)) return true;
    }
    return false;
}
function myCallBack(currentValue,index,array) {
    return currentValue %2===0;
}

function customeEvery(arr,myCallBack) {
    for (let i=0;i<arr.length;i++) {
        if(!myCallBack(arr[i],i,arr)) return false;
    }
    return true;
}
// const ns=[1,2,3,4,5];
let testArray=[1,2,6,7];
// console.log(customeEvery(testArray,myCallBack));

function customFind(arr,myCallBack) {
    for (let i=0;i<arr.length;i++) {
        if(myCallBack(arr[i],i,arr)) return arr[i];
    }
    return undefined;
}
function customFilter(arr,myCallBack) {
    let value=[];
    for (let i=0;i<arr.length;i++) {
        if(myCallBack(arr[i],i,arr)) value.push(arr[i]);
    }
    return value;
}
function customMap(arr, myCallBack) {
    let value=[]
    for (let i=0;i<arr.length;i++) {
        value.push(myCallBack2(arr[i],i,arr));
    }
    return value;
}
function myCallBack2(currentValue,index,array) {
    return currentValue+69;
}
console.log(customFind(testArray,myCallBack));
console.log(customFilter(testArray,myCallBack));
console.log(customMap(testArray,myCallBack2));
    
var course = courses.map(function (course, index, currentArray) {
    return course.coin >= 100;
  });
  
  console.log(course);