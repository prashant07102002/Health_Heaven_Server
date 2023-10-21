import * as cheerio from 'cheerio';
import axios from "axios";

export const getGymSuppliments = async (req, res) => {
    const url = `https://www.flipkart.com/search?q=gym+equipment`;
    const url2 = `https://www.flipkart.com/search?q=gym%20supplements`;
    let products = [];

    try {
        let response = await axios.get(url2);
        let $ = await cheerio.load(response.data);

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
            products[i] = {...products[i], imgHref: product[0].attribs.src};
            // productImageUrl.push({imgHref: product[0].attribs.src});
        })

        // rating 
        $('span ._3LWZlK').each((i, e) => {
            let product = $(e);
            // console.log(product);
            products[i] = {...products[i], rating: product.text()};
        });

        // users_rated
        $('._2_R_DZ').each((i, e) => {
            let product = $(e);
            // console.log(product);
            products[i] = {...products[i], users_rated: product.text()};
        });

        // percent_off
        $('._8VNy32 ._25b18c ._3Ay6Sb span').each((i, e) => {
            let product = $(e);
            // console.log(product);
            products[i] = {...products[i], percent_off: product.text()};
        });

        // Price
        $('._8VNy32 ._25b18c ._30jeq3').each((i, e) => {
            let product = $(e);
            // console.log(product);
            products[i] = {...products[i], price: product.text()};
        });

        res.send(products);
        
    } catch (error) {
        console.log("Err in getProducts: ", error);
    }
};