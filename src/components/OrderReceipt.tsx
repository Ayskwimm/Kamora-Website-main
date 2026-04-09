import React from 'react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: OrderItem[];
  paymentMethod: string;
  shippingProvider: string;
  total: number;
}

const OrderReceipt: React.FC<OrderReceiptProps> = ({ 
  isOpen, 
  onClose, 
  orderItems, 
  paymentMethod, 
  shippingProvider, 
  total 
}) => {
  if (!isOpen) return null;

  const generateOrderId = () => {
    return 'KAM' + Date.now().toString().slice(-8);
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const saveAsPDF = () => {
    // Create a simple text receipt for now
    const receiptContent = `
KAMORA RESTAURANT - ORDER RECEIPT
====================================

Order ID: ${generateOrderId()}
Date: ${getCurrentDate()}

ORDER DETAILS:
-------------
${orderItems.map(item => 
  `${item.name}
   Quantity: ${item.quantity}
   Price: $${item.price.toFixed(2)}
   Subtotal: $${(item.price * item.quantity).toFixed(2)}
   -------------------`
).join('\n')}

PAYMENT METHOD: ${paymentMethod.toUpperCase()}
SHIPPING PROVIDER: ${shippingProvider.toUpperCase()}

TOTAL AMOUNT: $${total.toFixed(2)}

Thank you for choosing Kamora!
Enjoy your meal!
    `.trim();

    // Create a blob and download
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Kamora-Receipt-${generateOrderId()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-kamora-orange to-kamora-red p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Order Receipt</h2>
              <p className="text-white/80">Order #{generateOrderId()}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Receipt Content */}
        <div className="p-6">
          {/* Order Info */}
          <div className="mb-6 pb-6 border-b">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-medium">{getCurrentDate()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Status</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Confirmed
                </span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Order Items</h3>
            <div className="space-y-4">
              {orderItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Shipping */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Payment Method</p>
              <p className="font-semibold text-blue-900">{paymentMethod === 'gcash' ? 'GCash' : 'Cash on Delivery'}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Shipping Provider</p>
              <p className="font-semibold text-green-900">{shippingProvider === 'lalamove' ? 'Lalamove' : 'Grab Express'}</p>
            </div>
          </div>

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total Amount</span>
              <span className="text-2xl font-bold text-kamora-orange">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={saveAsPDF}
              className="flex-1 px-6 py-3 bg-kamora-orange text-white rounded-lg hover:bg-kamora-red transition-colors font-medium"
            >
              Save as PDF
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;
