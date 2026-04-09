import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import Button from './Button';

// Order interface for receipt
type OrderDetails = {
  items: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }>;
  total: number;
  paymentMethod: 'gcash' | 'cod';
  orderNumber: string;
  orderDate: string;
};

const Cart: React.FC = () => {
  const { cart, removeItem, updateQuantity, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'gcash' | 'cod'>('gcash');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  const generateOrderNumber = () => {
    return 'KAM' + Date.now().toString().slice(-8);
  };

  const getCurrentDateTime = () => {
    return new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCheckout = () => {
    setIsCheckout(true);
    
    // Generate order details immediately
    const orderNumber = generateOrderNumber();
    const orderDate = getCurrentDateTime();
    
    // Store order details
    const newOrderDetails: OrderDetails = {
      items: [...cart.items],
      total: cart.total,
      paymentMethod,
      orderNumber,
      orderDate
    };
    
    setOrderDetails(newOrderDetails);
    setIsCheckout(false);
    setShowConfirmation(true);
    
    // Auto-hide confirmation and show receipt after 1.5 seconds
    setTimeout(() => {
      setShowConfirmation(false);
      setShowReceipt(true);
      clearCart();
    }, 1500);
  };

  const captureReceipt = async (format: 'pdf' | 'image') => {
    const receiptElement = document.getElementById('receipt-modal-content');
    if (!receiptElement) return;
    
    try {
      // Use html2canvas library for screenshot functionality
      // For now, we'll use a fallback method with window.print
      if (format === 'pdf') {
        // Create a printable version
        const printContent = receiptElement.innerHTML;
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>Kamora Order Receipt</title>
                <style>
                  body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                  @media print { body { margin: 0; } }
                </style>
              </head>
              <body>
                ${printContent}
              </body>
            </html>
          `);
          printWindow.document.close();
          printWindow.focus();
          
          // Wait for content to load then print
          setTimeout(() => {
            printWindow.print();
            printWindow.close();
          }, 500);
        }
      } else {
        // For image format, we'll use a data URL approach
        // This is a simplified version - in production, you'd use html2canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Set canvas size
        canvas.width = 800;
        canvas.height = 1000;
        
        // Create a simple visual representation
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add header
        ctx.fillStyle = '#f97316';
        ctx.fillRect(0, 0, canvas.width, 80);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 32px Arial';
        ctx.fillText('🍽️ Kamora Order Receipt', 50, 50);
        
        // Add order info
        ctx.fillStyle = '#333333';
        ctx.font = '16px Arial';
        let yPos = 120;
        
        if (orderDetails) {
          ctx.fillText(`Order Number: ${orderDetails.orderNumber}`, 50, yPos);
          yPos += 30;
          ctx.fillText(`Date: ${orderDetails.orderDate}`, 50, yPos);
          yPos += 30;
          ctx.fillText(`Payment: ${orderDetails.paymentMethod === 'gcash' ? 'GCash' : 'Cash on Delivery'}`, 50, yPos);
          yPos += 50;
          
          // Add items
          ctx.font = 'bold 18px Arial';
          ctx.fillText('Order Items:', 50, yPos);
          yPos += 30;
          
          ctx.font = '14px Arial';
          orderDetails.items.forEach((item, index) => {
            ctx.fillText(`${item.name} - Qty: ${item.quantity} × $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(2)}`, 50, yPos);
            yPos += 25;
          });
          
          yPos += 20;
          ctx.font = 'bold 20px Arial';
          ctx.fillStyle = '#f97316';
          ctx.fillText(`Total: $${orderDetails.total.toFixed(2)}`, 50, yPos);
        }
        
        // Convert to image and download
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `kamora-receipt-${orderDetails?.orderNumber || Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }
        });
      }
    } catch (error) {
      console.error('Error capturing receipt:', error);
      // Fallback to simple print
      window.print();
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-kamora-dark mb-4">Your Cart</h3>
        <p className="text-gray-500 text-center py-8">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-kamora-dark">Your Cart</h3>
        <Button
          onClick={clearCart}
          variant="secondary"
          className="text-sm py-2 px-4"
        >
          Clear Cart
        </Button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {cart.items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-kamora-dark">{item.name}</h4>
              <p className="text-kamora-orange font-bold">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
              >
                -
              </button>
              <span className="w-8 text-center font-semibold">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
              >
                +
              </button>
            </div>
            <div className="text-right">
              <p className="font-bold text-kamora-dark">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Section */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-kamora-dark">Total:</span>
          <span className="text-2xl font-bold text-kamora-orange">
            ${cart.total.toFixed(2)}
          </span>
        </div>

        {/* Payment Method Selection */}
        <div className="bg-kamora-cream rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-kamora-dark mb-3">Payment Method</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="gcash"
                checked={paymentMethod === 'gcash'}
                onChange={(e) => setPaymentMethod(e.target.value as 'gcash' | 'cod')}
                className="w-4 h-4 text-kamora-orange"
              />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">GC</span>
                </div>
                <span className="text-sm font-medium">GCash</span>
              </div>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value as 'gcash' | 'cod')}
                className="w-4 h-4 text-kamora-orange"
              />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">💵</span>
                </div>
                <span className="text-sm font-medium">Cash on Delivery</span>
              </div>
            </label>
          </div>
        </div>


        <Button
          onClick={handleCheckout}
          variant="primary"
          disabled={isCheckout}
          className="w-full"
        >
          {isCheckout ? 'Processing...' : `Checkout with ${paymentMethod === 'gcash' ? 'GCash' : 'COD'}`}
        </Button>
      </div>
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center transform scale-100 animate-pulse">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Successful!</h3>
            <p className="text-gray-600">Your order has been placed successfully</p>
          </div>
        </div>
      )}
      
      {/* Order Receipt Modal */}
      {showReceipt && orderDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div id="receipt-modal-content" className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Receipt Header */}
            <div className="bg-gradient-to-r from-kamora-orange to-kamora-red text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">🍽️ Kamora Order Receipt</h2>
                  <p className="text-orange-100">Thank you for your order!</p>
                </div>
                <button
                  onClick={() => setShowReceipt(false)}
                  className="text-white hover:text-orange-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Receipt Content */}
            <div className="p-6">
              {/* Order Information */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order Number</p>
                    <p className="font-semibold">{orderDetails.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-semibold">{orderDetails.orderDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-semibold">{orderDetails.paymentMethod === 'gcash' ? 'GCash' : 'Cash on Delivery'}</p>
                  </div>
                </div>
              </div>
              
              {/* Order Items */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                <div className="space-y-3">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Total */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Amount:</span>
                  <span className="text-2xl font-bold text-kamora-orange">
                    ${orderDetails.total.toFixed(2)}
                  </span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="grid grid-cols-3 gap-3">
                <Button
                  onClick={() => captureReceipt('pdf')}
                  variant="primary"
                  className="flex-1"
                >
                  📄 Save as PDF
                </Button>
                <Button
                  onClick={() => captureReceipt('image')}
                  variant="secondary"
                  className="flex-1"
                >
                  📸 Save as Photo
                </Button>
                <Button
                  onClick={() => setShowReceipt(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
              
              {/* Footer */}
              <div className="text-center mt-6 text-sm text-gray-500">
                <p>For inquiries, contact us at support@kamora.com</p>
                <p>Thank you for choosing Kamora! 🍽️</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
