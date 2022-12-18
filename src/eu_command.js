const util = require("./util.js");

let euCommand = [
    {"year":"1996","country":"Чехия","flag":"cz.png","city":"Злин","g_country":"Россия","g_flag":"ru.png","s_country":"Словения","s_flag":"si.png","b_country":"Чехия","b_flag":"cz.png"},
    {"year":"1999","country":"Югославия","flag":"yu.jpg","city":"Белград","g_country":"Россия","g_flag":"ru.png","s_country":"Румыния","s_flag":"ro.png","b_country":"Чехия","b_flag":"cz.png"},
    {"year":"2001","country":"Россия","flag":"ru.png","city":"Москва","g_country":"Россия","g_flag":"ru.png","s_country":"Россия","s_flag":"ru.png","b_country":"Украина","b_flag":"ua.png"},
    {"year":"2005","country":"Россия","flag":"ru.png","city":"Санкт-Петербург","g_country":"Россия","g_flag":"ru.png","s_country":"Чехия","s_flag":"cz.png","b_country":"Россия","b_flag":"ru.png"},
    {"year":"2006","country":"Словакия","flag":"sk.png","city":"Братислава","g_country":"Румыния","g_flag":"ro.png","s_country":"Чехия","s_flag":"cz.png","b_country":"Венгрия","b_flag":"hu.png"},
    {"year":"2007","country":"Германия","flag":"de.png","city":"Лейпциг","g_country":"Германия","g_flag":"de.png","s_country":"Россия","s_flag":"ru.png","b_country":"Нидерланды","b_flag":"nl.png"},
    {"year":"2008","country":"Франция","flag":"fr.png","city":"Канны","g_country":"Франция","g_flag":"fr.png","s_country":"Франция","s_flag":"fr.png","b_country":"Сербия","b_flag":"rs.png"},
    {"year":"2009","country":"Румыния","flag":"ro.png","city":"Питести","g_country":"Румыния","g_flag":"ro.png","s_country":"Сербия","s_flag":"rs.png","b_country":"Венгрия","b_flag":"hu.png"},
    {"year":"2010","country":"Швеция","flag":"se.png","city":"Лександ","g_country":"Нидерланды","g_flag":"nl.png","s_country":"Сербия","s_flag":"rs.png","b_country":"Россия","b_flag":"ru.png"},
    {"year":"2011","country":"Франция","flag":"fr.png","city":"Бордо","g_country":"Россия","g_flag":"ru.png","s_country":"Румыния","s_flag":"ro.png","b_country":"Украина","b_flag":"ua.png"},
    {"year":"2012","country":"Германия","flag":"de.png","city":"Бонн","g_country":"Россия","g_flag":"ru.png","s_country":"Чехия","s_flag":"cz.png","b_country":"Украина","b_flag":"ua.png"},
    {"year":"2013","country":"Польша","flag":"pl.png","city":"Ольштын","g_country":"Чехия","g_flag":"cz.png","s_country":"Россия","s_flag":"ru.png","b_country":"Украина","b_flag":"ua.png"},
    {"year":"2014","country":"Румыния","flag":"ro.png","city":"Сибиу","g_country":"Россия","g_flag":"ru.png","s_country":"Чехия","s_flag":"cz.png","b_country":"Франция","b_flag":"fr.png"},
    {"year":"2015","country":"Чехия","flag":"cz.png","city":"Либерец","g_country":"Франция","g_flag":"fr.png","s_country":"Украина","s_flag":"ua.png","b_country":"Чехия","b_flag":"cz.png"},
    {"year":"2016","country":"Россия","flag":"ru.png","city":"Санкт-Петербург","g_country":"Украина","g_flag":"ua.png","s_country":"Россия","s_flag":"ru.png","b_country":"Франция","b_flag":"fr.png"},
    {"year":"2017","country":"Германия","flag":"de.png","city":"Оберхов","g_country":"Россия","g_flag":"ru.png","s_country":"Румыния","s_flag":"ro.png","b_country":"Венгрия","b_flag":"hu.png"},
    {"year":"2018","country":"Италия","flag":"it.png","city":"Пиза","g_country":"Россия","g_flag":"ru.png","s_country":"Франция","s_flag":"fr.png","b_country":"Украина","b_flag":"ua.png"},
    {"year":"2019","country":"Бельгия","flag":"be.png","city":"Брюссель","g_country":"Франция","g_flag":"fr.png","s_country":"Россия","s_flag":"ru.png","b_country":"Украина","b_flag":"ua.png"},
    {"year":"2020","country":"Интернет","flag":"","city":"Интернет","g_country":"Франция","g_flag":"fr.png","s_country":"Россия","s_flag":"ru.png","b_country":"Чехия","b_flag":"cz.png"},
    {"year":"2021","country":"Интернет","flag":"","city":"Интернет","g_country":"Франция","g_flag":"fr.png","s_country":"Россия","s_flag":"ru.png","b_country":"Украина","b_flag":"ua.png"}
];

euCommand.sort(util.decreaseByNumberField("year"));
module.exports = euCommand;