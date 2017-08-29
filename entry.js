import $ from 'jquery';
import queryString from 'query-string';
import getData from './js/getData';
import initDetail from './js/details';

//UI component
let navbar = $("ul.nav");
let search = $(".search");

//data
var allData = [];   //allData為所有筆資料，topData為首頁精選的資料
var topData = [];

let initData = async() => {
    allData = await getData();
    // console.log('Returnd value from getData:', allData);
    for(let i = 0; i <= 5; i++) {
        topData[i] = allData[i]; //抓取allData的前五筆為首頁精選
    }
    console.log('Top 6 data:', topData.length);
    initCollection();
}

let initCollection = () => {
        // console.log('Top 6 data:', topData.length);
        $('.colHead').each(function (i)  {
            console.log('colHead.title before', $(this).text());
            console.log('colHead.title after', $(this).text(topData[i].title));
        });
        
        $('.link-detail').each(function(i) {    //i: index of .link-detail
            $(this).on('click', function() {
                let stringifiedTopData =  queryString.stringify(topData[i]);
                $(this).attr('href', 'details.html?' + stringifiedTopData);
                
            });
        });

}

initData();

// console.log('Top 6 data:', topData.length);
// const p1 = new Promise((resolve) => {
//     await initData();
//     resolve();
// })
// p1.then(() => {
//     initCollection();
// });

navbar.find('a').click(function(){
// navbar.on('click', '.navCol', function() {
    var $href = $(this).attr('href');
    var $anchor = $($href).offset();
    // window.scrollTo($anchor.left,$anchor.top);
    $('body').animate({ scrollTop: $anchor.top });
    return false;
});




