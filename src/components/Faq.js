import React, { useState } from 'react';
import './Faq.css'

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    { 
      question: "What is Luminous Wear?",
      answer: "Luminous Wear is a fashion clothing brand that offers a wide range of stylish and high-quality women's apparel, including Western, Traditional, New Arrivals, and Sale items."
    },
    {
      question: "How do I place an order",
      answer: "To place an order, click on the product you wish to purchase. On the product page, you'll find a green 'Query on WhatsApp' button. Click on this button to be redirected to WhatsApp, where we can start a conversation. You can ask any additional questions about the product and finalize your order directly through WhatsApp."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards, debit cards, and other secure payment options like Phone Pay ,Paytm and Google Pay."
    },
    {
      question: "Do you offer Cash on Delivery (COD)?",
      answer: "Yes, we offer Cash on Delivery (COD) for your convenience. For COD orders, we require an advance payment of ₹150 to cover the shipping cost. The remaining amount can be paid at the time of delivery. This ensures a smooth and secure transaction process for both parties."
    },
    {
        question: "What is your return or refund policy for damaged or incorrect items?",
        answer: "We do not offer refunds; however, we are happy to provide an exchange for items that are damaged or not as per your order specifications. To ensure a smooth exchange process, please make an opening video of the package upon delivery. This video will serve as proof and help us verify the issue. Once verified, we will promptly process your exchange request."
      }

   
  ];

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      {faqData.map((item, index) => (
        <div 
          key={index} 
          className={`faq-item ${activeIndex === index ? 'active' : ''}`}
        >
          <div 
            className="faq-question" 
            onClick={() => toggleQuestion(index)}
          >
            {item.question}
          </div>
          <div className="faq-answer">{item.answer}</div>
        </div>
      ))}
    </div>
  );
};

export default Faq;