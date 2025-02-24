function extractRestaurantCardsData() {
  const restaurantElements = document.querySelectorAll('.sc-evWYkj.cRThYq');
  const allRestaurantsData = [];

  restaurantElements.forEach(restaurantElement => {
    // Try more general selectors for name, cuisine, price, and location
    const nameElement = restaurantElement.querySelector('h4.sc-1hp8d8a-0'); // More general name selector
    const ratingElement = restaurantElement.querySelector('.sc-1q7bklc-1.cILgox');
    const cuisineElement = restaurantElement.querySelector('div.sc-ekQYnd.jEGIEZ > p.sc-1hez2tp-0.sc-gggouf'); // More specific cuisine selector
    const priceForTwoElement = restaurantElement.querySelector('div.sc-ekQYnd.jEGIEZ > p.sc-1hez2tp-0.sc-gggouf.KXcjT'); // More specific price selector
    const distanceElement = restaurantElement.querySelector('.min-basic-info-right p');
    const imageElement = restaurantElement.querySelector('img.sc-s1isp7-5');
    const promotionElement = restaurantElement.querySelector('.sc-gtXRHa.beFvka');
    const discountElement = restaurantElement.querySelector('.walkin-offer-value b');
    // More general location selector - trying to find p tag within min-basic-info-left div
    const locationElement = restaurantElement.querySelector('.min-basic-info-left p.sc-1hez2tp-0'); // More general location selector

    const restaurantData = {
      name: nameElement ? nameElement.textContent.trim() : null,
      cuisine: cuisineElement ? cuisineElement.textContent.trim() : null,
      priceForTwo: priceForTwoElement ? parseInt(priceForTwoElement.textContent.replace('₹', '').replace(',', '').replace('for two','').trim(), 10) : null,
      distance: distanceElement ? distanceElement.textContent.trim() : null,
      image: imageElement ? imageElement.getAttribute('src') : null,
      discount: discountElement ? parseInt(discountElement.textContent.replace('% OFF', '').trim(), 10) : null,
      rating: ratingElement ? parseFloat(ratingElement.textContent.trim()) : null,
      location: locationElement ? locationElement.textContent.trim() : null,
      isPromoted: !!promotionElement,
    };

    if (restaurantData.image) {
      allRestaurantsData.push(restaurantData);
    }
  });

  const jsonData = JSON.stringify(allRestaurantsData, null, 2);
  console.log(jsonData);
  console.log(`\nNumber of restaurant objects extracted: ${allRestaurantsData.length}`);

  return jsonData;
}

// Run the function to extract data from the current website and get the JSON string
const restaurantsJSON = extractRestaurantCardsData();