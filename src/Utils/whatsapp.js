export function sendWhatsAppMessage(product) {
    const message = `Hello! I'm interested in ${product.name} priced at $${product.price.toFixed(2)}. Can you provide more information?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/8118812545?text=${encodedMessage}`, '_blank');
  }