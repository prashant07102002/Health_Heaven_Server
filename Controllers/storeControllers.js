import * as cheerio from 'cheerio';
import axios from "axios";
import { success, error } from '../Utils/responseWrapper.js';
import fetch from 'node-fetch';

export const getProducts = async (req, res) => {

    const { product } = req.params;

    const url2 = `https://www.flipkart.com/search?q=${product}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off`;
    const url = `https://www.flipkart.com/search?q=gym+supplement`;
    let products = [];

    try {
        // let response = await fetch(url2, {
        //     method: 'GET'
        // });
        // let response = await axios.get(url);
        let response = await axios.get(url2, {
            responseType: "arraybuffer",
            headers: {
                "Content-Type": "text/html; charset=UTF-8"
            }
        })
        
        console.log(response);
        let $ = cheerio.load(response.data);

        // Title, Product Href
        $('.s1Q9rs').each((i, e) => {
            let product = $(e);
            // console.log(product);
            products.push({
                title: product[0].attribs.title,
                product_link: `https://www.flipkart.com${product[0].attribs.href}`
            });
        });

        // Image Link
        $(`._4ddWXP .CXW8mj img`).each((i, e) => {
            let product = $(e);
            // console.log(product);
            products[i] = { ...products[i], imgHref: product[0].attribs.src };
            // productImageUrl.push({imgHref: product[0].attribs.src});
        })

        // rating 
        $('span ._3LWZlK').each((i, e) => {
            let product = $(e);
            // console.log(product);
            products[i] = { ...products[i], rating: product.text() };
        });

        // users_rated
        $('._2_R_DZ').each((i, e) => {
            let product = $(e);
            // console.log(product);
            products[i] = { ...products[i], users_rated: product.text() };
        });

        // percent_off
        $('._8VNy32 ._25b18c ._3Ay6Sb span').each((i, e) => {
            let product = $(e);
            // console.log(product);
            products[i] = { ...products[i], percent_off: product.text() };
        });

        // Price
        $('._8VNy32 ._25b18c ._30jeq3').each((i, e) => {
            let product = $(e);
            // console.log(product);
            products[i] = { ...products[i], price: product.text() };
        });

        // console.log(products);
        res.send(success(200, products));
    } catch (e) {
        console.log("Err in getProducts: ", e);
        res.send(error(500,  "Not Loading, Slow Network connection, Try again"))
    }
};