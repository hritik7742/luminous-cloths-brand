export function sendWhatsAppMessage(product) {
    const message = `Hello , I am interested in the product named ${product.name}, which is priced at ₹${product.price.toFixed(2)}. The product code is ${product.productCode}. Could you please assist me with placing an order for this item?`
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/7427887570?text=${encodedMessage}`, '_blank');
  }