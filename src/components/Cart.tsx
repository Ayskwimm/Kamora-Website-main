import React, { useEffect, useState } from 'react';
import { useCart, CartItem } from '../contexts/CartContext';
import Button from './Button';

// Order interface for receipt
type OrderDetails = {
  items: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    customization?: string;
    extraPrice?: number;
  }>;
  total: number;
  paymentMethod: 'gcash';
  orderNumber: string;
  orderDate: string;
  pickupDate: string;
  pickupTime: string;
  pickupOption: 'store' | 'rider' | null;
  customerName: string;
  phoneNumber: string;
};

const Cart: React.FC = () => {
  const { cart, removeItem, updateQuantity, updateItem, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'gcash'>('gcash');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [customizingItem, setCustomizingItem] = useState<CartItem | null>(null);
  const [customizationNote, setCustomizationNote] = useState('');
  const [selectedOption, setSelectedOption] = useState('No extras');
  const [customOptionPrice, setCustomOptionPrice] = useState(0);

  // New form fields
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pickupOption, setPickupOption] = useState<'store' | 'rider' | null>(null);

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

  const customizationOptions = [
    { label: 'No extras', value: 'No extras', price: 0 },
    { label: 'Extra gravy', value: 'Extra gravy', price: 15 },
    { label: 'Extra cheese', value: 'Extra cheese', price: 25 },
    { label: 'Spicy kick', value: 'Spicy kick', price: 20 },
  ];

  const openCustomizationModal = (item: CartItem) => {
    const savedCustomization = item.customization ?? '';
    const matchedOption = customizationOptions.find((option) =>
      option.value !== 'No extras' && savedCustomization.startsWith(option.value)
    );

    setCustomizingItem(item);
    if (matchedOption) {
      setSelectedOption(matchedOption.value);
      setCustomOptionPrice(matchedOption.price);
      setCustomizationNote(savedCustomization.slice(matchedOption.value.length).replace(/^ · /, ''));
    } else {
      setSelectedOption('No extras');
      setCustomOptionPrice(item.extraPrice ?? 0);
      setCustomizationNote(savedCustomization);
    }
  };

  const closeCustomizationModal = () => {
    setCustomizingItem(null);
    setCustomizationNote('');
    setSelectedOption('No extras');
    setCustomOptionPrice(0);
  };

  const handleSaveCustomization = () => {
    if (!customizingItem) {
      return;
    }

    const customizationText = selectedOption === 'No extras'
      ? customizationNote
      : `${selectedOption}${customizationNote ? ` · ${customizationNote}` : ''}`;

    updateItem(customizingItem.id, customizationText, customOptionPrice);
    closeCustomizationModal();
  };

  useEffect(() => {
    const body = document.body;
    if (customizingItem || showReceipt || showConfirmation) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }

    return () => {
      body.style.overflow = '';
    };
  }, [customizingItem, showReceipt, showConfirmation]);

  const handleOptionChange = (optionValue: string, price: number) => {
    setSelectedOption(optionValue);
    setCustomOptionPrice(price);
  };

  const handleCheckout = () => {
    // Basic validation for separate pickup/contact details
    if (
      !pickupOption ||
      cart.items.length === 0 ||
      !customerName ||
      phoneNumber.length !== 11 ||
      !pickupDate ||
      !pickupTime
    ) {
      return;
    }
    
    // Generate order details
    const orderNumber = generateOrderNumber();
    const orderDate = getCurrentDateTime();
    
    // Store order details
    const newOrderDetails: OrderDetails = {
      items: [...cart.items],
      total: cart.total,
      paymentMethod,
      orderNumber,
      orderDate,
      pickupDate,
      pickupTime,
      customerName,
      phoneNumber,
      pickupOption
    };
    
    setOrderDetails(newOrderDetails);
    setShowConfirmation(true);
  };

  const isSunday = (dateString: string) => {
    const date = new Date(dateString);
    return date.getDay() === 0; // 0 = Sunday
  };

  const validatePickupDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if date is within 1 week and not Sunday
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return date >= today && date <= oneWeekFromNow && !isSunday(dateString);
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 19; hour++) {
      const startTime = `${hour.toString().padStart(2, '0')}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
      const endTime = `${(hour + 1).toString().padStart(2, '0')}:00 ${hour + 1 >= 12 ? 'PM' : 'AM'}`;
      const displayTime = hour === 12 ? '12:00 PM - 1:00 PM' : 
                         hour === 11 ? '11:00 AM - 12:00 PM' :
                         `${startTime} - ${endTime}`;
      slots.push({
        value: `${hour}:00-${hour + 1}:00`,
        display: displayTime
      });
    }
    return slots;
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
          ctx.fillText(`Customer Name: ${orderDetails.customerName}`, 50, yPos);
          yPos += 30;
          ctx.fillText(`Phone Number: ${orderDetails.phoneNumber}`, 50, yPos);
          yPos += 30;
          ctx.fillText(`Pickup Date: ${orderDetails.pickupDate}`, 50, yPos);
          yPos += 30;
          ctx.fillText(`Payment: ${orderDetails.paymentMethod === 'gcash' ? 'GCash' : 'GCash'}`, 50, yPos);
          yPos += 50;
          
          // Add items
          ctx.font = 'bold 18px Arial';
          ctx.fillText('Order Items:', 50, yPos);
          yPos += 30;
          
          ctx.font = '14px Arial';
          orderDetails.items.forEach((item) => {
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

  // Show receipt modal even if cart is empty (after checkout)
  if (customizingItem) {
    return (
      <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between p-5 border-b">
            <div>
              <h3 className="text-xl font-bold text-kamora-dark">Customize Your Meal</h3>
              <p className="text-sm text-gray-500">Edit your selected meal before checkout.</p>
            </div>
            <button
              onClick={closeCustomizationModal}
              className="text-red-500 hover:text-red-700"
              aria-label="Close customization modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-5">
            <div>
              <p className="text-sm font-semibold text-gray-700">Item</p>
              <p className="text-lg font-bold text-kamora-dark">{customizingItem.name}</p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-700">Choose an option</p>
              <div className="grid grid-cols-2 gap-3">
                {customizationOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleOptionChange(option.value, option.price)}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      selectedOption === option.value
                        ? 'border-kamora-orange bg-kamora-orange/10 text-kamora-dark'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-kamora-orange'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span>{option.label}</span>
                      {option.price > 0 && <span className="text-sm text-kamora-orange">+₱{option.price}</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-kamora-cream rounded-3xl p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Special instructions <span className="text-gray-500">(optional)</span>
              </label>
              <textarea
                value={customizationNote}
                onChange={(e) => setCustomizationNote(e.target.value)}
                rows={4}
                placeholder="Optional: Add requests like less salt, extra sauce, or no onions"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-kamora-orange"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-500">Customization fee</p>
                <p className="text-lg font-bold text-kamora-orange">+₱{customOptionPrice.toFixed(2)}</p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Button
                  onClick={closeCustomizationModal}
                  variant="secondary"
                  className="px-5 py-3 !bg-red-500 !text-white !border-red-500 hover:!bg-red-600 hover:!border-red-600"
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveCustomization} variant="primary" className="px-5 py-3">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showReceipt && orderDetails) {
    return (
      <>
        {/* Order Receipt Modal */}
        <div className="fixed inset-0 bg-black bg-opacity-50 flex min-h-screen items-center justify-center z-50 p-4 pt-20">
          <div id="receipt-modal-content" className="bg-white rounded-2xl max-w-2xl w-full max-h-[calc(100vh-8rem)] overflow-y-auto shadow-2xl">
            {/* Receipt Header */}
            <div className="bg-gradient-to-r from-kamora-orange to-kamora-red text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Kamora Order Receipt</h2>
                  <p className="text-orange-100">Thank you for your order!</p>
                </div>
                <button
                  onClick={() => setShowReceipt(false)}
                  className="text-white hover:text-orange-200"
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
                    <p className="text-sm text-gray-500">Customer Name</p>
                    <p className="font-semibold">{orderDetails.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-semibold">{orderDetails.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pickup Date</p>
                    <p className="font-semibold">{orderDetails.pickupDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p><strong>Payment Method:</strong> ${orderDetails.paymentMethod === 'gcash' ? 'GCash' : 'GCash'}</p>
                  </div>
                </div>
              </div>
              
              {/* Order Items */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                <div className="space-y-3">
                  {orderDetails.items.map((item, index) => {
                    const itemSubtotal = ((item.price + (item.extraPrice ?? 0)) * item.quantity).toFixed(2);
                    return (
                      <div key={index} className="flex flex-col gap-3 p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity} × {item.displayPrice || `₱${item.price.toFixed(2)}`}</p>
                            </div>
                          </div>
                          <p className="font-semibold text-lg">${itemSubtotal}</p>
                        </div>
                        {item.customization && (
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold text-gray-700">Special instructions:</span> {item.customization}
                          </p>
                        )}
                        {item.extraPrice ? (
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold text-gray-700">Customization fee:</span> +₱{item.extraPrice.toFixed(2)} each
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
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
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => captureReceipt('pdf')}
                  variant="primary"
                  className="flex-1"
                >
                  Save as PDF
                </Button>
                <Button
                  onClick={() => captureReceipt('image')}
                  variant="secondary"
                  className="flex-1"
                >
                  Save as Photo
                </Button>
              </div>
              
              {/* Footer */}
              <div className="text-center mt-6 text-sm text-gray-500">
                <p>For inquiries, contact us at support@kamora.com</p>
                <p>Thank you for choosing Kamora!</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-kamora-dark mb-4">Your Cart</h3>
        <p className="text-gray-500 text-center py-8">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-4 overflow-hidden max-h-full min-h-0">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-5">
        <h3 className="text-lg md:text-xl font-bold text-kamora-dark">Your Cart</h3>
        <Button
          onClick={clearCart}
          variant="secondary"
          className="text-sm py-2 px-4 bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600"
        >
          Clear Cart
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-[1.8fr_1fr] h-full overflow-hidden min-h-0">
        <div className="space-y-4 pr-2 min-h-0 lg:overflow-y-auto lg:max-h-[calc(100vh-14rem)]">
          {cart.items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-kamora-dark break-words whitespace-normal">{item.name}</h4>
                <p className="text-kamora-orange font-bold">{item.displayPrice || `₱${item.price.toFixed(2)}`}</p>
                {item.customization && (
                  <p className="text-sm text-gray-500 mt-1">Customization: {item.customization}</p>
                )}
                {item.extraPrice ? (
                  <p className="text-sm text-gray-500 mt-1">Customization fee: +₱{item.extraPrice.toFixed(2)} each</p>
                ) : (
                  <p className="text-sm text-gray-500 mt-1">No extra custom fees</p>
                )}
              </div>
              <div className="flex flex-col w-full sm:w-auto gap-3">
                <div className="flex items-center justify-between sm:justify-end gap-2">
                  <div className="flex items-center gap-2">
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
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2">
                  <p className="font-bold text-kamora-dark">
                    ${(item.price * item.quantity + (item.extraPrice ?? 0) * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => openCustomizationModal(item)}
                      className="text-kamora-orange hover:text-kamora-red text-sm font-semibold"
                    >
                      Customize Your Meal
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 rounded-3xl border border-gray-200 bg-kamora-cream p-3 pb-4 min-h-0 lg:overflow-y-auto lg:max-h-[calc(100vh-14rem)]">
          <div className="mb-3">
            <div className="flex flex-col gap-1">
              <span className="text-base font-semibold text-kamora-dark">Total</span>
              <span className="text-xl font-bold text-kamora-orange">${cart.total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">Review your order details and proceed to checkout when you're ready.</p>
          </div>

          <div className="space-y-2">
            <div className="bg-white rounded-2xl p-3">
              <label className="block text-sm font-medium text-kamora-dark mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => {
                  const value = e.target.value;
                  const lettersOnly = value.replace(/[^a-zA-Z\s]/g, '');
                  setCustomerName(lettersOnly);
                }}
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kamora-orange"
              />
              {customerName && /[^a-zA-Z\s]/.test(customerName) && (
                <p className="text-red-500 text-xs mt-1">Only letters and spaces are allowed</p>
              )}
            </div>

            <div className="bg-white rounded-2xl p-3">
              <label className="block text-sm font-medium text-kamora-dark mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  const numbersOnly = value.replace(/\D/g, '').slice(0, 11);
                  setPhoneNumber(numbersOnly);
                }}
                placeholder="Enter 11-digit phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kamora-orange"
                maxLength={11}
              />
              {phoneNumber.length > 0 && phoneNumber.length < 11 && (
                <p className="text-red-500 text-xs mt-1">Phone number must be exactly 11 digits</p>
              )}
            </div>

            <div className="bg-white rounded-2xl p-3">
              <label className="block text-sm font-medium text-kamora-dark mb-2">
                Pickup Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  if (validatePickupDate(selectedDate)) {
                    setPickupDate(selectedDate);
                  }
                }}
                min={new Date().toISOString().split('T')[0]}
                max={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kamora-orange"
                style={{ colorScheme: 'light' }}
              />
              <p className="text-gray-500 text-xs mt-1">Select a date within 1 week from today (Sunday is not available)</p>
            </div>

            <div className="bg-white rounded-2xl p-3">
              <label className="block text-sm font-medium text-kamora-dark mb-2">
                Pickup Time <span className="text-red-500">*</span>
              </label>
              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kamora-orange"
              >
                <option value="">Select a time slot</option>
                {generateTimeSlots().map((slot) => (
                  <option key={slot.value} value={slot.value}>
                    {slot.display}
                  </option>
                ))}
              </select>
              <p className="text-gray-500 text-sm mt-1">Select a 1-hour time slot between 8:00 AM and 8:00 PM</p>
            </div>

            <div className="bg-white rounded-2xl p-3">
              <h4 className="font-semibold text-kamora-dark mb-3">Payment Method</h4>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="gcash"
                  checked={paymentMethod === 'gcash'}
                  onChange={() => setPaymentMethod('gcash')}
                  className="w-4 h-4 text-kamora-orange"
                />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">GC</span>
                  </div>
                  <span className="text-sm font-medium">GCash</span>
                </div>
              </label>
            </div>

            {pickupDate && customerName && phoneNumber.length === 11 && pickupTime && (
              <div className="bg-white rounded-2xl p-3">
                <h4 className="font-semibold text-kamora-dark mb-3">Choose Pickup Option</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => setPickupOption('store')}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                      pickupOption === 'store'
                        ? 'bg-kamora-orange text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🏪 Pick-up at Store
                  </button>
                  <button
                    onClick={() => setPickupOption('rider')}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                      pickupOption === 'rider'
                        ? 'bg-kamora-orange text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🛵 Book Your Rider
                  </button>
                </div>
              </div>
            )}
          </div>

          <Button
            onClick={handleCheckout}
            variant="primary"
            disabled={cart.items.length === 0 || !pickupOption}
            className="w-full"
          >
            Checkout
          </Button>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      {showConfirmation && orderDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your order is confirmed!</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 text-left">
              <p className="text-lg font-semibold mb-2">Here are the details:</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">📍</span>
                  <span><strong>Address:</strong> 4031 Gen T. De Leon, Valenzuela City, Philippines</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">📞</span>
                  <span><strong>Contact:</strong> (number)</span>
                </div>
                {orderDetails.pickupOption === 'rider' && (
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🛵</span>
                    <span>You may now book via your Shipping provider (ex: Lalamove, Grab Express)</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                onClick={() => {
                  setShowConfirmation(false);
                }}
                variant="secondary"
                className="flex-1 !bg-red-500 !text-white !border-red-500 hover:!bg-red-600 hover:!border-red-600"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setShowConfirmation(false);
                  setShowReceipt(true);
                  clearCart();
                }}
                variant="primary"
                className="flex-1"
              >
                See Receipt
              </Button>
            </div>
          </div>
        </div>
      )}
      
            
    </div>
  );
};

export default Cart;
