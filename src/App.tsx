import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ShoppingBag, 
  ShoppingCart, 
  Search, 
  Trash, 
  Edit, 
  Plus, 
  Check, 
  MapPin, 
  Phone, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  User, 
  Lock, 
  Settings, 
  Clock, 
  Sparkles, 
  TrendingUp, 
  Percent, 
  X, 
  ChevronRight, 
  ArrowRight, 
  Sliders, 
  Info,
  CreditCard,
  Share2,
  Filter,
  MessageSquare,
  Send,
  HelpCircle,
  Loader2,
  BookOpen,
  PlusCircle,
  Award
} from 'lucide-react';

const DEFAULT_CATEGORIES = [
  { id: 'all', name: 'All Products', icon: '🛍️' },
  { id: 'vegetables', name: 'Fresh Vegetables', icon: '🥦' },
  { id: 'grocery', name: 'Groceries & Staples', icon: '🌾' },
  { id: 'biscuits', name: 'Biscuits & Cookies', icon: '🍪' },
  { id: 'chips', name: 'Chips & Snacks', icon: '🍿' },
  { id: 'juices', name: 'Juices & Beverages', icon: '🥤' },
  { id: 'bathroom', name: 'Bathroom Essentials', icon: '🧼' },
  { id: 'household', name: 'Household Products', icon: '🧹' }
];

const DEFAULT_PRODUCTS = [
  // Vegetables
  {
    id: 'veg-1',
    name: 'Fresh Red Tomatoes',
    category: 'vegetables',
    price: 32,
    quantity: '1 kg',
    inStock: true,
    badge: 'offer',
    image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=400&q=80',
    description: 'Fresh farm-picked juicy red tomatoes.'
  },
  {
    id: 'veg-2',
    name: 'Potato (Aloo)',
    category: 'vegetables',
    price: 28,
    quantity: '1 kg',
    inStock: true,
    badge: 'bestseller',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',
    description: 'Perfect multipurpose potatoes sourced from local farms.'
  },
  {
    id: 'veg-3',
    name: 'Onions (Pyaz)',
    category: 'vegetables',
    price: 45,
    quantity: '1 kg',
    inStock: true,
    badge: 'bestseller',
    image: 'https://images.unsplash.com/photo-1508747705729-40885702655a?auto=format&fit=crop&w=400&q=80',
    description: 'Crisp and premium quality country onions.'
  },
  {
    id: 'veg-4',
    name: 'English Cucumber',
    category: 'vegetables',
    price: 30,
    quantity: '500g',
    inStock: true,
    badge: 'new',
    image: 'https://images.unsplash.com/photo-1449300079324-964320ded47c?auto=format&fit=crop&w=400&q=80',
    description: 'Fresh, crunchy, and hydrating cucumber.'
  },
  // Groceries
  {
    id: 'groc-1',
    name: 'Premium Basmati Rice',
    category: 'grocery',
    price: 110,
    quantity: '1 kg',
    inStock: true,
    badge: 'bestseller',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
    description: 'Long grain aromatic aged Basmati rice.'
  },
  {
    id: 'groc-2',
    name: 'Toor Dal (Premium)',
    category: 'grocery',
    price: 160,
    quantity: '1 kg',
    inStock: true,
    badge: '',
    image: 'https://images.unsplash.com/photo-1585994187749-937860640b3c?auto=format&fit=crop&w=400&q=80',
    description: 'Unpolished, chemical-free native lentils.'
  },
  {
    id: 'groc-3',
    name: 'Gold Winner Sunflower Oil',
    category: 'grocery',
    price: 145,
    quantity: '1 Ltr',
    inStock: true,
    badge: 'offer',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
    description: 'Healthy cooking oil rich in vitamins.'
  },
  // Biscuits
  {
    id: 'bisc-1',
    name: 'Oreo Chocolate Sandwich',
    category: 'biscuits',
    price: 30,
    quantity: '120g',
    inStock: true,
    badge: '',
    image: 'https://images.unsplash.com/photo-1558961309-dbdf71799f5a?auto=format&fit=crop&w=400&q=80',
    description: 'Crunchy chocolate cookies filled with vanilla cream.'
  },
  // Chips
  {
    id: 'chips-1',
    name: 'Lays Magic Masala',
    category: 'chips',
    price: 20,
    quantity: '52g',
    inStock: true,
    badge: 'bestseller',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80',
    description: 'Classic potato chips loaded with Indian spices.'
  },
  // Juices
  {
    id: 'juice-1',
    name: 'Real Fruit Power Orange',
    category: 'juices',
    price: 120,
    quantity: '1 Ltr',
    inStock: true,
    badge: 'offer',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80',
    description: 'Pure, refreshing, and delicious orange juice.'
  },
  // Bathroom
  {
    id: 'bath-1',
    name: 'Dettol Liquid Handwash',
    category: 'bathroom',
    price: 99,
    quantity: '200ml',
    inStock: true,
    badge: '',
    image: 'https://images.unsplash.com/photo-1607006342411-1a9310a01948?auto=format&fit=crop&w=400&q=80',
    description: 'Germ protection liquid hand wash with pump.'
  },
  // Household
  {
    id: 'house-1',
    name: 'Vim Dishwash Gel',
    category: 'household',
    price: 55,
    quantity: '250ml',
    inStock: true,
    badge: 'offer',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=400&q=80',
    description: 'Concentrated lemon liquid with power of 100 lemons.'
  }
];

const DEFAULT_STORE_SETTINGS = {
  shopName: "Sri Sai Ram Provision Store",
  tagline: "Fresh Groceries & Daily Essentials Delivered Near You",
  phone: "+919663390887",
  address: "Opposite to Racket Club, Bilekahalli, Bangalore, Karnataka - 560076",
  deliveryRange: "3 km",
  minOrder: 100,
  upiId: "9663390887@okbizaxis",
  whatsappNumber: "+919663390887",
  gmapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.043690225114!2d77.6046424757342!3d12.90489111621258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae151be6cb75b7%3A0xe74e92eb0b4b24e6!2sBilekahalli%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1719200000000!5m2!1sen!2sin"
};

export default function App() {
  // Products and Catalog State
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('ssr_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('ssr_categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  const [storeSettings, setStoreSettings] = useState(() => {
    const saved = localStorage.getItem('ssr_settings');
    return saved ? JSON.parse(saved) : DEFAULT_STORE_SETTINGS;
  });

  // UI state variables
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBadge, setSelectedBadge] = useState('all');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  
  // Checkout info
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI on Delivery');
  const [upiTxnId, setUpiTxnId] = useState('');
  const [showQrCode, setShowQrCode] = useState(false);

  // Admin control
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'vegetables',
    price: '',
    quantity: '1 kg',
    inStock: true,
    badge: '',
    image: '',
    description: ''
  });

  // Custom Modal State (to avoid native alert/confirm)
  const [customModal, setCustomModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    confirmText: 'Confirm',
    cancelText: 'Cancel'
  });

  // Gemini API Configuration
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return localStorage.getItem('ssr_gemini_key') || '';
  });
  const [showApiSettings, setShowApiSettings] = useState(false);

  // AI Meal Planner State
  const [mealPrompt, setMealPrompt] = useState('');
  const [aiRecipeLoading, setAiRecipeLoading] = useState(false);
  const [aiRecipeResult, setAiRecipeResult] = useState(null);
  const [mealPresetActive, setMealPresetActive] = useState('');

  // AI Chatbot State
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatbotMessages, setChatbotMessages] = useState([
    { 
      sender: 'bot', 
      text: "👋 Namaste! I'm your Sai Ram Shopping Assistant. I can suggest recipes using what's in our store, calculate meals, or help you find groceries. What's on your mind today?", 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  // AI Copywriter Loading State (Admin panel)
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);

  useEffect(() => {
    localStorage.setItem('ssr_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ssr_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('ssr_settings', JSON.stringify(storeSettings));
  }, [storeSettings]);

  useEffect(() => {
    localStorage.setItem('ssr_gemini_key', geminiApiKey);
  }, [geminiApiKey]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatbotMessages, isChatLoading]);

  // Toast notification helper
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Custom Modal Trigger Helper
  const triggerConfirm = (title, message, onConfirm) => {
    setCustomModal({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setCustomModal(prev => ({ ...prev, isOpen: false }));
      },
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });
  };

  const addToCart = (product) => {
    if (!product.inStock) {
      showToast("⚠️ Out of stock!");
      return;
    }
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantitySelected: item.quantitySelected + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantitySelected: 1 }]);
    }
    showToast(`🛒 Added ${product.name} to cart!`);
  };

  const updateCartQuantity = (productId, change) => {
    const updated = cart.map(item => {
      if (item.id === productId) {
        const nextQty = item.quantitySelected + change;
        return nextQty > 0 ? { ...item, quantitySelected: nextQty } : null;
      }
      return item;
    }).filter(Boolean);
    setCart(updated);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    showToast("❌ Removed item from cart.");
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantitySelected), 0);
  }, [cart]);

  // Filtering products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBadge = selectedBadge === 'all' || product.badge === selectedBadge;
      return matchesCategory && matchesSearch && matchesBadge;
    });
  }, [products, selectedCategory, searchTerm, selectedBadge]);

  const requestGeminiText = async (promptText, systemInstructionText = '', jsonSchema = null) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${geminiApiKey}`;
    
    const payload = {
      contents: [{ role: 'user', parts: [{ text: promptText }] }],
      systemInstruction: systemInstructionText ? {
        parts: [{ text: systemInstructionText }]
      } : undefined
    };

    if (jsonSchema) {
      payload.generationConfig = {
        responseMimeType: "application/json",
        responseSchema: jsonSchema
      };
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP ${response.status}`);
      }

      const resJson = await response.json();
      const content = resJson.candidates?.[0]?.content?.parts?.[0]?.text;
      return content || '';
    } catch (err) {
      console.error("Gemini API Request Failed:", err);
      throw err;
    }
  };

  const generateAIRecipe = async (userPrompt) => {
    if (!userPrompt.trim()) {
      showToast("⚠️ Please enter a recipe idea or craving!");
      return;
    }
    setAiRecipeLoading(true);
    setAiRecipeResult(null);

    // Contextualize Gemini with currently in-stock products
    const inStockList = products
      .filter(p => p.inStock)
      .map(p => `ID: ${p.id}, Name: ${p.name}, Category: ${p.category}, Price: ₹${p.price}, Size: ${p.quantity}`)
      .join('\n');

    const systemInstruction = `You are an expert chef assistant for 'Sri Sai Ram Provision Store' in Bangalore. 
Your goal is to suggest a wonderful meal/recipe based on the user's prompt, prioritizing ingredients that are available in-stock at our store.
You MUST respond strictly in JSON matching the specified schema. 
Only map ingredients to product IDs if they are highly relevant and exist in the provided list. 
If an ingredient is absolutely required but not in our list, specify it as a non-matched extra.

In-Stock Products at Store:
${inStockList}`;

    const schema = {
      type: "OBJECT",
      properties: {
        recipeName: { type: "STRING" },
        description: { type: "STRING" },
        prepTime: { type: "STRING" },
        cookTime: { type: "STRING" },
        servings: { type: "STRING" },
        ingredients: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              name: { type: "STRING" },
              quantityRequired: { type: "STRING" },
              isAvailableInStore: { type: "BOOLEAN" },
              matchedProductId: { type: "STRING", description: "The product ID from the in-stock list, or empty if not available" }
            },
            required: ["name", "quantityRequired", "isAvailableInStore"]
          }
        },
        steps: {
          type: "ARRAY",
          items: { type: "STRING" }
        },
        nutritionalBenefits: { type: "STRING" }
      },
      required: ["recipeName", "description", "prepTime", "cookTime", "ingredients", "steps"]
    };

    try {
      const responseText = await requestGeminiText(userPrompt, systemInstruction, schema);
      const parsed = JSON.parse(responseText);
      setAiRecipeResult(parsed);
      showToast("✨ AI Recipe & Cart map created successfully!");
    } catch (err) {
      showToast(`❌ AI Failed: ${err.message || 'Make sure API Key is set'}`);
      setShowApiSettings(true);
    } finally {
      setAiRecipeLoading(false);
    }
  };

  // Preset prompts for AI recipes
  const handlePresetMeal = (presetName, promptText) => {
    setMealPresetActive(presetName);
    setMealPrompt(promptText);
    generateAIRecipe(promptText);
  };

  const addRecipeIngredientsToCart = () => {
    if (!aiRecipeResult || !aiRecipeResult.ingredients) return;
    
    let addedCount = 0;
    aiRecipeResult.ingredients.forEach(ing => {
      if (ing.isAvailableInStore && ing.matchedProductId) {
        const item = products.find(p => p.id === ing.matchedProductId);
        if (item && item.inStock) {
          // Check if already in cart
          const existing = cart.find(c => c.id === item.id);
          if (!existing) {
            setCart(prev => [...prev, { ...item, quantitySelected: 1 }]);
            addedCount++;
          }
        }
      }
    });

    if (addedCount > 0) {
      showToast(`🎉 Added ${addedCount} matched recipe ingredients to your cart!`);
    } else {
      showToast(`🛒 Matched ingredients already in your cart!`);
    }
  };

  const handleSendChatMessage = async (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = {
      sender: 'user',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

   setChatbotMessages(prev => [...prev, userMsg]);
    const currentInput = chatInput;
    setChatInput('');
    setIsChatLoading(true);

    const availableProdsSummary = products
      .map(p => `- ${p.name} (${p.quantity}) @ ₹${p.price} [${p.inStock ? "In Stock" : "Out of Stock"}]`)
      .join('\n');

    const chatSystemInstruction = `You are 'Sai Ram Sahayak', a highly enthusiastic, helpful, and polite Indian grocery shopping expert chatbot representing 'Sri Sai Ram Provision Store' in Bilekahalli, Bangalore.
Speak with a warm hospitality, using terms like 'Namaste', 'Aloo', 'Pyaz', 'Dal', or 'Ji' where appropriate, but maintain clean, professional English.
You assist customers in finding items, planning grocery budgets, detailing ingredient health details, and designing quick meals.
Be concise. Keep responses to under 3-4 short paragraphs so it reads well on mobile screens. Refer to items in our list as available.

Here is the exact live inventory catalog of the shop right now:
${availableProdsSummary}

Shop Details:
Address: Opposite to Racket Club, Bilekahalli, Bangalore, Karnataka - 560076
Phone / WhatsApp: +91 9663390887
UPI ID for instant transfers: 9663390887@okbizaxis
Delivery limits: Available within 3 km only, minimum order ₹100. Always free delivery!`;

    try {
      const response = await requestGeminiText(currentInput, chatSystemInstruction);
      const botMsg = {
        sender: 'bot',
        text: response || "I'm having a small connection issue, but you can check out our products tab to explore all ingredients!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatbotMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const botMsg = {
        sender: 'bot',
        text: `⚠️ API Connection Issue. Please configure your API key inside Settings. (Error: ${err.message})`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatbotMessages(prev => [...prev, botMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const generateProductDetailsAI = async () => {
    if (!newProduct.name) {
      showToast("⚠️ Type a product name first before generating details!");
      return;
    }
    setIsGeneratingDesc(true);

    const promptText = `Generate an appetizing, clear, short single-sentence retail description for a grocery item named '${newProduct.name}' in a neighborhood store. Also recommend the most fitting category from: ${categories.filter(c => c.id !== 'all').map(c => c.id).join(', ')} and a suggested badge from 'bestseller', 'offer', 'new' or '' if no badge matches. Respond in valid raw JSON.`;
    
    const schema = {
      type: "OBJECT",
      properties: {
        description: { type: "STRING" },
        suggestedCategory: { type: "STRING" },
        suggestedBadge: { type: "STRING" }
      },
      required: ["description", "suggestedCategory", "suggestedBadge"]
    };

    try {
      const responseText = await requestGeminiText(promptText, "You are an assistant copywriter for a premium neighborhood supermarket.", schema);
      const parsed = JSON.parse(responseText);
      
      setNewProduct(prev => ({
        ...prev,
        description: parsed.description || prev.description,
        category: parsed.suggestedCategory || prev.category,
        badge: parsed.suggestedBadge || prev.badge
      }));

      showToast("🪄 AI updated description, category and badges!");
    } catch (err) {
      showToast(`❌ Generation failed: ${err.message}`);
    } finally {
      setIsGeneratingDesc(false);
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast("⚠️ Your cart is empty!");
      return;
    }
    if (!customerName.trim() || !customerAddress.trim()) {
      showToast("⚠️ Please fill in all delivery details.");
      return;
    }
    if (paymentMethod.includes('Instant UPI') && !upiTxnId.trim()) {
      showToast("⚠️ Please enter your UPI Payment Transaction ID or Reference Number!");
      return;
    }

    // Build receipt
    let message = `🛒 *NEW ORDER - ${storeSettings.shopName}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `👤 *Customer:* ${customerName.trim()}\n`;
    message += `📍 *Delivery Address:* ${customerAddress.trim()}\n`;
    message += `👉 *Payment Choice:* ${paymentMethod}\n`;
    if (paymentMethod.includes('Instant UPI') && upiTxnId.trim()) {
      message += `🆔 *UPI Txn ID/Ref:* ${upiTxnId.trim()} (PAID ✅)\n`;
    }
    message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `📦 *Ordered Items:*\n`;

    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantitySelected;
      message += `${index + 1}. *${item.name}* (${item.quantity})\n`;
      message += `   Qty: ${item.quantitySelected} x ₹${item.price} = *₹${subtotal}*\n`;
    });

    message += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💵 *Total Bill Amount:* ₹${cartTotal}\n`;
    message += `🚚 *Delivery Service:* Available within ${storeSettings.deliveryRange} (Bilekahalli Area)\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `👍 Please confirm and process my order. Thank you!`;

    // Format WhatsApp Link
    const cleanPhone = storeSettings.whatsappNumber.replace(/[^0-9]/g, "");
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    
    // Open in window
    window.open(whatsappUrl, '_blank');
    
    // Reset Cart & UI
    setCart([]);
    setIsCartOpen(false);
    setCustomerName('');
    setCustomerAddress('');
    setUpiTxnId('');
    setShowQrCode(false);
    showToast("🎉 Order shared to WhatsApp! Please check chat to send.");
  };

  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (adminPassword === 'sai123' || adminPassword === '123') {
      setIsAdminAuthenticated(true);
      showToast("🔓 Access Granted!");
    } else {
      showToast("❌ Incorrect Password. Try '123'");
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      showToast("⚠️ Product name & price are required!");
      return;
    }

    const created = {
      ...newProduct,
      id: `prod-${Date.now()}`,
      price: parseFloat(newProduct.price),
      image: newProduct.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'
    };

    setProducts([created, ...products]);
    setNewProduct({
      name: '',
      category: 'vegetables',
      price: '',
      quantity: '1 kg',
      inStock: true,
      badge: '',
      image: '',
      description: ''
    });
    showToast("✅ Product Added Successfully!");
  };

  const handleEditProductClick = (product) => {
    setEditingProduct(product);
  };

  const handleSaveEditedProduct = (e) => {
    e.preventDefault();
    setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    setEditingProduct(null);
    showToast("✅ Product details updated!");
  };

  const handleDeleteProduct = (id) => {
    triggerConfirm(
      "Confirm Deletion",
      "Are you sure you want to delete this product from your inventory permanently?",
      () => {
        setProducts(products.filter(p => p.id !== id));
        showToast("🗑️ Product removed!");
      }
    );
  };

  const updateStoreSetting = (field, value) => {
    setStoreSettings({ ...storeSettings, [field]: value });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white pb-16">
      
      {/* Toast Alert Component */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-900 text-emerald-100 px-6 py-3 rounded-full shadow-2xl flex items-center space-x-3 text-sm font-semibold border border-emerald-500 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Custom Confirmation Dialog */}
      {customModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-slate-100 shadow-2xl">
            <h3 className="text-lg font-black text-slate-900 mb-2">{customModal.title}</h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">{customModal.message}</p>
            <div className="flex space-x-3">
              <button 
                onClick={() => setCustomModal(prev => ({ ...prev, isOpen: false }))} 
                className="w-1/2 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition text-sm"
              >
                {customModal.cancelText}
              </button>
              <button 
                onClick={customModal.onConfirm} 
                className="w-1/2 py-2.5 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition text-sm"
              >
                {customModal.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API Key Configuration Banner */}
      {showApiSettings && (
        <div className="bg-emerald-950 text-emerald-100 py-3.5 px-4 border-b border-emerald-800 animate-slideDown">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2.5">
              <Sparkles size={16} className="text-emerald-400 animate-pulse flex-shrink-0" />
              <span>
                <strong>Gemini AI Integration:</strong> Provide your key to unleash recipe planners and shopping assistant features. Leaving it empty uses Canvas automated keys if enabled.
              </span>
            </div>
            <div className="flex w-full md:w-auto items-center space-x-2">
              <input 
                type="password" 
                placeholder="Paste Gemini API Key..." 
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                className="bg-emerald-900/50 border border-emerald-700 text-white rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-400 placeholder-emerald-400/60 flex-1 md:w-60 text-xs font-mono"
              />
              <button 
                onClick={() => {
                  setShowApiSettings(false);
                  showToast("🔐 API Settings saved!");
                }}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-1.5 rounded-lg transition shrink-0"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-45 bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo area */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-tr from-emerald-500 to-green-400 p-2.5 rounded-xl shadow-md text-white">
                <ShoppingBag size={22} className="animate-pulse" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">
                  Sai Ram Store
                </span>
                <span className="block text-[9px] text-emerald-600 font-semibold tracking-widest uppercase">
                  Bilekahalli, Blr
                </span>
              </div>
            </div>

            {/* Mid Desk Navigation */}
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
              <a href="#shop" className="hover:text-emerald-600 transition">Products</a>
              <a href="#ai-planner" className="text-emerald-700 font-bold hover:text-emerald-900 transition flex items-center space-x-1">
                <Sparkles size={14} className="text-emerald-500" />
                <span>AI Meal Planner</span>
              </a>
              <a href="#why-us" className="hover:text-emerald-600 transition">About Delivery</a>
              <a href="#contact" className="hover:text-emerald-600 transition">Store Info</a>
            </div>

            {/* Right controls */}
            <div className="flex items-center space-x-2.5">
              <button 
                onClick={() => setShowApiSettings(!showApiSettings)}
                className="p-2 text-slate-500 hover:text-emerald-600 bg-slate-100 hover:bg-emerald-50 rounded-xl transition"
                title="Configure Gemini API Settings"
              >
                <Settings size={18} />
              </button>

              <button 
                onClick={() => setIsAdminMode(!isAdminMode)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isAdminMode 
                    ? 'bg-amber-100 text-amber-800 ring-2 ring-amber-400' 
                    : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                <Lock size={12} />
                <span>{isAdminMode ? "Admin Active" : "Admin Panel"}</span>
              </button>

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative bg-emerald-500 hover:bg-emerald-600 text-white p-2.5 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                    {cart.reduce((tot, item) => tot + item.quantitySelected, 0)}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-emerald-10/20 to-white pt-8 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Banner Left Copy */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide">
                <Sparkles size={13} className="text-emerald-600 animate-spin" />
                <span>SUPERCHARGED WITH GEMINI AI MEAL PLANNING</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
                {storeSettings.shopName}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
                {storeSettings.tagline} Setup right next to you at <span className="font-semibold text-emerald-700">Opposite to Racket Club, Bilekahalli</span>. Try our new **Gemini AI Recipe Matcher** below to cook delicious food with available ingredients!
              </p>

              {/* USP Highlights Grid */}
              <div className="grid grid-cols-3 gap-4 py-2 text-left max-w-md mx-auto lg:mx-0">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <span className="block text-2xl">🥦</span>
                  <span className="block text-xs font-bold text-slate-800 mt-1">100% Fresh</span>
                  <span className="text-[10px] text-slate-500">Handpicked Daily</span>
                </div>
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <span className="block text-2xl">🪄</span>
                  <span className="block text-xs font-bold text-slate-800 mt-1">AI Smart Chef</span>
                  <span className="text-[10px] text-slate-500">Load Recipe to Cart</span>
                </div>
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <span className="block text-2xl">📱</span>
                  <span className="block text-xs font-bold text-slate-800 mt-1">Direct WA</span>
                  <span className="text-[10px] text-slate-500">Fast WhatsApp Orders</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 pt-2">
                <a 
                  href="#shop" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5 transition flex items-center justify-center space-x-2"
                >
                  <span>Shop Fresh Groceries</span>
                  <ArrowRight size={18} />
                </a>
                <a 
                  href="#ai-planner"
                  className="bg-white hover:bg-slate-50 text-slate-700 border-2 border-emerald-400 font-bold px-6 py-3.5 rounded-2xl transition flex items-center justify-center space-x-2 shadow-sm shadow-emerald-50"
                >
                  <Sparkles size={16} className="text-emerald-600" />
                  <span>Try AI Meal Planner</span>
                </a>
              </div>
            </div>

            {/* Banner Right Image Illustration */}
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
              
              <div className="relative mx-auto max-w-md bg-white p-4 rounded-3xl shadow-2xl border border-slate-100 transform hover:scale-[1.02] transition duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80" 
                  alt="Sai Ram Provision Store Fresh Veggies and Stock" 
                  className="rounded-2xl w-full object-cover h-64"
                />
                
                {/* Floating offer banner */}
                <div className="absolute -bottom-4 -left-4 bg-emerald-600 text-white p-4 rounded-2xl shadow-xl flex items-center space-x-3 max-w-[90%]">
                  <div className="bg-emerald-500 p-2 rounded-xl text-lg shrink-0">🤖</div>
                  <div>
                    <span className="block text-[10px] text-emerald-200 uppercase tracking-widest font-semibold">Gemini Feature Active</span>
                    <span className="block text-xs font-bold leading-tight">Ask our AI chatbot at the bottom-right for instant support!</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {}
      {isAdminMode && (
        <section className="bg-slate-900 text-slate-100 py-10 border-y-4 border-amber-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-amber-500">
                <Lock size={24} />
                <h2 className="text-2xl font-black">Store Owner Admin Dashboard</h2>
              </div>
              <button 
                onClick={() => {
                  setIsAdminAuthenticated(false);
                  setIsAdminMode(false);
                }} 
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-sm font-medium transition"
              >
                Close Admin Panel
              </button>
            </div>

            {!isAdminAuthenticated ? (
              // Admin Authentication Portal
              <div className="max-w-md mx-auto bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700">
                <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                  <span>Enter Store Admin Password</span>
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Verify ownership of Sri Sai Ram Provision Store to edit items, pricing, images and shop settings. (Default demo pass: <span className="text-amber-400 font-mono">123</span>)
                </p>
                <form onSubmit={handleAdminAuth} className="space-y-4">
                  <input 
                    type="password" 
                    placeholder="Enter Admin Password" 
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button 
                    type="submit" 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl transition"
                  >
                    Unlock Dashboard
                  </button>
                </form>
              </div>
            ) : (
              // Authenticated Owner Actions Panel
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
                
                {/* Form to Add New Products */}
                <div className="lg:col-span-5 bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-6">
                  <div className="border-b border-slate-700 pb-3 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-emerald-400 flex items-center space-x-2">
                      <Plus size={18} />
                      <span>Add New Product to Shop</span>
                    </h3>
                  </div>
                  
                  <form onSubmit={handleAddProduct} className="space-y-4 text-sm text-slate-300">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-medium text-slate-400">Product Name *</label>
                        <button
                          type="button"
                          onClick={generateProductDetailsAI}
                          disabled={isGeneratingDesc || !newProduct.name}
                          className="text-[10px] text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1.5 bg-slate-900 px-2 py-1 rounded border border-slate-700 disabled:opacity-50"
                        >
                          {isGeneratingDesc ? (
                            <>
                              <Loader2 size={10} className="animate-spin" />
                              <span>Generating Copy...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles size={10} className="text-amber-400" />
                              <span>AI Fill description & tags</span>
                            </>
                          )}
                        </button>
                      </div>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Fresh Red Carrots" 
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
                        <select 
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none"
                        >
                          {categories.filter(c => c.id !== 'all').map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Badge / Tag</label>
                        <select 
                          value={newProduct.badge}
                          onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none"
                        >
                          <option value="">None</option>
                          <option value="bestseller">Best Seller 🔥</option>
                          <option value="offer">Today's Offer 🏷️</option>
                          <option value="new">New Arrival ✨</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Price (₹) *</label>
                        <input 
                          type="number" 
                          required
                          placeholder="e.g. 45" 
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Quantity/Weight</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 1 kg, 500g, 1 Packet" 
                          value={newProduct.quantity}
                          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Product Photo URL (Unsplash or any link)</label>
                      <input 
                        type="url" 
                        placeholder="Paste image link, or leave blank for placeholder" 
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Short Description</label>
                      <textarea 
                        rows="2"
                        placeholder="e.g. Handpicked organic daily fresh carrots directly from Nilgiris." 
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <input 
                        type="checkbox" 
                        id="inStock"
                        checked={newProduct.inStock}
                        onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })}
                        className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                      />
                      <label htmlFor="inStock" className="text-sm font-medium">Product is Available/In Stock</label>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-lg transition"
                    >
                      Publish Product
                    </button>
                  </form>
                </div>

                {/* Edit Store Settings Section & Quick Editor List */}
                <div className="lg:col-span-7 space-y-8">
                  
                  {/* Edit Shop Settings Card */}
                  <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                    <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center space-x-2">
                      <Settings size={18} />
                      <span>Configure Store Setup</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Shop Name</label>
                        <input 
                          type="text" 
                          value={storeSettings.shopName}
                          onChange={(e) => updateStoreSetting('shopName', e.target.value)}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">WhatsApp Number (e.g. +919663390887)</label>
                        <input 
                          type="text" 
                          value={storeSettings.whatsappNumber}
                          onChange={(e) => updateStoreSetting('whatsappNumber', e.target.value)}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-slate-400 mb-1">Tagline Subtitle</label>
                        <input 
                          type="text" 
                          value={storeSettings.tagline}
                          onChange={(e) => updateStoreSetting('tagline', e.target.value)}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-slate-400 mb-1">Shop Address</label>
                        <input 
                          type="text" 
                          value={storeSettings.address}
                          onChange={(e) => updateStoreSetting('address', e.target.value)}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Delivery Limits</label>
                        <input 
                          type="text" 
                          value={storeSettings.deliveryRange}
                          onChange={(e) => updateStoreSetting('deliveryRange', e.target.value)}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">UPI ID (Accepted for transfers)</label>
                        <input 
                          type="text" 
                          value={storeSettings.upiId}
                          onChange={(e) => updateStoreSetting('upiId', e.target.value)}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quick Edit Items List */}
                  <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                    <h3 className="text-lg font-bold text-amber-400 mb-4">Manage & Edit Active Catalog ({products.length} Products)</h3>
                    
                    <div className="max-h-[350px] overflow-y-auto space-y-2 pr-2">
                      {products.map(p => (
                        <div key={p.id} className="bg-slate-900 p-3 rounded-xl flex items-center justify-between text-xs space-x-4">
                          <div className="flex items-center space-x-3">
                            <img src={p.image} alt="" className="w-10 h-10 object-cover rounded-md" />
                            <div>
                              <p className="font-bold text-white">{p.name}</p>
                              <p className="text-slate-400">{p.quantity} • <span className="text-emerald-400 font-semibold">₹{p.price}</span></p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleEditProductClick(p)}
                              className="p-1.5 bg-blue-900/40 hover:bg-blue-900 text-blue-300 rounded"
                              title="Edit Details"
                            >
                              <Edit size={14} />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-1.5 bg-rose-900/40 hover:bg-rose-900 text-rose-300 rounded"
                              title="Delete Item"
                            >
                              <Trash size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Inline Product Modal Editor */}
                {editingProduct && (
                  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-800 text-white rounded-3xl p-6 w-full max-w-md border border-slate-700 shadow-2xl">
                      <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-3">
                        <h4 className="text-lg font-bold text-amber-400">Update: {editingProduct.name}</h4>
                        <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-white">
                          <X size={20} />
                        </button>
                      </div>

                      <form onSubmit={handleSaveEditedProduct} className="space-y-4 text-sm">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Product Title</label>
                          <input 
                            type="text" 
                            required
                            value={editingProduct.name}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">Price (₹)</label>
                            <input 
                              type="number" 
                              required
                              value={editingProduct.price}
                              onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">Pack Size / Weight</label>
                            <input 
                              type="text" 
                              required
                              value={editingProduct.quantity}
                              onChange={(e) => setEditingProduct({ ...editingProduct, quantity: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">Badge</label>
                            <select 
                              value={editingProduct.badge}
                              onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white"
                            >
                              <option value="">None</option>
                              <option value="bestseller">Best Seller</option>
                              <option value="offer">Today's Offer</option>
                              <option value="new">New Arrival</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">Stock Status</label>
                            <select 
                              value={editingProduct.inStock ? "yes" : "no"}
                              onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.value === 'yes' })}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white"
                            >
                              <option value="yes">In Stock</option>
                              <option value="no">Out of Stock</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Image Link URL</label>
                          <input 
                            type="text" 
                            value={editingProduct.image}
                            onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white"
                          />
                        </div>

                        <div className="flex space-x-2 pt-4 border-t border-slate-700">
                          <button 
                            type="button" 
                            onClick={() => setEditingProduct(null)} 
                            className="w-1/2 bg-slate-700 hover:bg-slate-600 py-2 rounded font-bold"
                          >
                            Discard
                          </button>
                          <button 
                            type="submit" 
                            className="w-1/2 bg-emerald-500 hover:bg-emerald-600 py-2 rounded font-bold text-slate-950"
                          >
                            Save Updates
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        </section>
      )}

      {}
      <section id="ai-planner" className="py-12 bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-950 text-white scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="inline-flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
              <Sparkles size={12} className="animate-pulse" />
              <span>Gemini Smart Chef</span>
            </span>
            <h2 className="text-3xl font-black tracking-tight">AI Dinner & Recipe Matcher</h2>
            <p className="text-sm text-emerald-100/80 leading-relaxed">
              Type what you are craving! Our AI matches ingredients strictly against our store catalog and allows you to load them instantly into your cart.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Interactive Planner Left */}
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 space-y-6">
              <div>
                <h3 className="font-bold text-lg text-emerald-300">1. Tell us what you want to eat</h3>
                <p className="text-xs text-emerald-100/60 mt-1">We will check our live inventory to suggest matched items.</p>
              </div>

              {/* Presets */}
              <div className="space-y-2">
                <span className="block text-xs font-bold text-emerald-400 uppercase tracking-wider">Quick Inspiring Prompts:</span>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => handlePresetMeal('sambar', 'A traditional South Indian Tomato & Potato Sambar with Toor Dal')}
                    className={`text-xs px-3 py-2 rounded-xl font-medium transition ${
                      mealPresetActive === 'sambar' 
                        ? 'bg-emerald-500 text-slate-950 shadow' 
                        : 'bg-white/10 text-white hover:bg-white/15'
                    }`}
                  >
                    🍲 South Indian Sambar
                  </button>
                  <button 
                    onClick={() => handlePresetMeal('friedrice', 'Quick and delicious English Cucumber & Tomato vegetable Fried Rice')}
                    className={`text-xs px-3 py-2 rounded-xl font-medium transition ${
                      mealPresetActive === 'friedrice' 
                        ? 'bg-emerald-500 text-slate-950 shadow' 
                        : 'bg-white/10 text-white hover:bg-white/15'
                    }`}
                  >
                    🍚 Veg Fried Rice
                  </button>
                  <button 
                    onClick={() => handlePresetMeal('highprotein', 'High protein healthy lunch using unpolished Toor Dal and Basmati Rice')}
                    className={`text-xs px-3 py-2 rounded-xl font-medium transition ${
                      mealPresetActive === 'highprotein' 
                        ? 'bg-emerald-500 text-slate-950 shadow' 
                        : 'bg-white/10 text-white hover:bg-white/15'
                    }`}
                  >
                    💪 High Protein Dal
                  </button>
                </div>
              </div>

              {/* Input Prompt Box */}
              <div className="space-y-3 pt-2">
                <textarea 
                  rows="3"
                  value={mealPrompt}
                  onChange={(e) => setMealPrompt(e.target.value)}
                  placeholder="e.g. A quick evening snack with potato and spices, or a light summer diet..."
                  className="w-full bg-slate-950/40 border border-white/15 rounded-2xl p-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />

                <button
                  onClick={() => generateAIRecipe(mealPrompt)}
                  disabled={aiRecipeLoading}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3.5 rounded-2xl shadow-lg transition flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {aiRecipeLoading ? (
                    <>
                      <Loader2 className="animate-spin text-slate-950" size={18} />
                      <span>Gemini is planning your meal...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} className="text-slate-950 animate-pulse" />
                      <span>Suggest Recipe & Check Stock</span>
                    </>
                  )}
                </button>
              </div>

              {/* Helpful Notice */}
              <div className="flex items-start space-x-2.5 bg-slate-950/20 p-3.5 rounded-2xl border border-white/5 text-xs text-emerald-100/70">
                <Info size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <p>AI scans our real-time tomatoes, Basmati rice, lentils, cucumber, and snack list to find perfect matches!</p>
              </div>
            </div>

            {/* Interactive Planner Right - Output Recipe Card */}
            <div className="lg:col-span-7">
              {aiRecipeResult ? (
                <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 animate-fadeIn">
                  
                  {/* Recipe Header */}
                  <div className="border-b border-slate-100 pb-4 space-y-2">
                    <div className="flex justify-between items-start gap-4 flex-wrap">
                      <h3 className="text-2xl font-black text-slate-900 leading-tight">
                        {aiRecipeResult.recipeName}
                      </h3>
                      <div className="flex space-x-2">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          ⏱️ {aiRecipeResult.cookTime}
                        </span>
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          👥 {aiRecipeResult.servings || '2 Servings'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed italic">
                      "{aiRecipeResult.description}"
                    </p>
                  </div>

                  {/* Ingredients Mapping Grid */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-extrabold text-slate-900 text-sm flex items-center space-x-1.5">
                        <BookOpen size={16} className="text-emerald-600" />
                        <span>Recipe Ingredients Check:</span>
                      </h4>
                      <button
                        onClick={addRecipeIngredientsToCart}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition shadow"
                      >
                        <PlusCircle size={14} />
                        <span>Load Matched to Cart</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {aiRecipeResult.ingredients.map((ing, i) => (
                        <div 
                          key={i} 
                          className={`p-3 rounded-xl border flex items-center justify-between text-xs transition ${
                            ing.isAvailableInStore 
                              ? 'bg-emerald-50/70 border-emerald-100 text-slate-800' 
                              : 'bg-slate-50 border-slate-150 text-slate-500'
                          }`}
                        >
                          <div>
                            <span className="font-bold block text-slate-900">{ing.name}</span>
                            <span className="text-[10px] text-slate-500">Req: {ing.quantityRequired}</span>
                          </div>
                          
                          {ing.isAvailableInStore ? (
                            <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                              In Stock
                            </span>
                          ) : (
                            <span className="bg-slate-200 text-slate-500 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                              Add manually
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cooking Steps Accordion list */}
                  <div className="space-y-3 border-t border-slate-100 pt-5">
                    <h4 className="font-extrabold text-slate-900 text-sm">Step-by-step Preparation:</h4>
                    <ol className="space-y-2.5 text-xs text-slate-600">
                      {aiRecipeResult.steps.map((step, idx) => (
                        <li key={idx} className="flex space-x-2">
                          <span className="bg-emerald-100 text-emerald-800 font-extrabold h-5 w-5 rounded-full flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Nutritional Benefits */}
                  {aiRecipeResult.nutritionalBenefits && (
                    <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-start space-x-3 text-xs text-emerald-900">
                      <Award size={18} className="text-emerald-700 shrink-0 mt-0.5 animate-bounce" />
                      <div>
                        <strong className="block font-bold">Nutritional Advantage:</strong>
                        <p className="mt-0.5 opacity-90 leading-relaxed">{aiRecipeResult.nutritionalBenefits}</p>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center justify-center h-full min-h-[300px]">
                  <div className="bg-white/10 p-5 rounded-full text-emerald-400 mb-4 animate-pulse">
                    <Sparkles size={36} />
                  </div>
                  <h3 className="font-black text-lg text-white mb-1">Your Recipe Output Appears Here</h3>
                  <p className="text-xs text-emerald-100/60 max-w-sm leading-relaxed">
                    Once Gemini designs your meal plan, steps, time estimation, and matches ingredients to our stock, they will render here instantly.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="categories" className="py-8 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-950">Browse by Categories</h2>
              <p className="text-xs sm:text-sm text-slate-500">Pick a category to filter daily essentials instantly</p>
            </div>
          </div>
          
          {/* Categorization list slider */}
          <div className="flex items-center space-x-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-emerald-100 scrollbar-track-transparent">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition transform hover:scale-[1.03] ${
                  selectedCategory === cat.id 
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-100' 
                    : 'bg-slate-50 text-slate-700 border border-slate-100 hover:bg-emerald-50 hover:text-emerald-800'
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog Grid View */}
      <main id="shop" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filters and search headers block */}
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 mb-10 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
            
            {/* Search inputs */}
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Search size={18} />
              </span>
              <input 
                type="text" 
                placeholder="Search fresh potato, rice, biscuits, snacks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Quick Badge Filters */}
            <div className="flex items-center space-x-2 overflow-x-auto py-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest hidden lg:inline mr-2">Filter tags:</span>
              <button 
                onClick={() => setSelectedBadge('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedBadge === 'all' 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                All Offers
              </button>
              <button 
                onClick={() => setSelectedBadge('offer')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center space-x-1 ${
                  selectedBadge === 'offer' 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Percent size={12} className="text-emerald-600" />
                <span>Offers</span>
              </button>
              <button 
                onClick={() => setSelectedBadge('bestseller')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center space-x-1 ${
                  selectedBadge === 'bestseller' 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <TrendingUp size={12} className="text-emerald-600" />
                <span>Bestsellers</span>
              </button>
              <button 
                onClick={() => setSelectedBadge('new')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center space-x-1 ${
                  selectedBadge === 'new' 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Sparkles size={12} className="text-emerald-600" />
                <span>New Arrival</span>
              </button>
            </div>

          </div>

          {/* Catalog Grid View */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto shadow-sm border border-slate-100">
              <span className="text-5xl block mb-4">🔍</span>
              <h3 className="text-lg font-bold text-slate-900 mb-1">No grocery items found</h3>
              <p className="text-sm text-slate-500 mb-6">We couldn't match any of our active shelf items with "{searchTerm}". Please check spelling or select another category.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedBadge('all');
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-xl text-sm transition"
              >
                Reset Catalog Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => {
                const inCartItem = cart.find(item => item.id === product.id);
                return (
                  <div 
                    key={product.id}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-slate-100 flex flex-col justify-between overflow-hidden relative"
                  >
                    
                    {/* Badge Pill tag absolute overlays */}
                    {product.badge && (
                      <span className={`absolute top-2.5 left-2.5 z-10 text-[9px] uppercase tracking-wider font-extrabold px-2 py-1 rounded-md shadow-sm ${
                        product.badge === 'bestseller' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                        product.badge === 'offer' ? 'bg-red-100 text-red-800 border border-red-200' :
                        'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        {product.badge === 'bestseller' ? '🔥 Bestseller' :
                         product.badge === 'offer' ? '🏷️ Discount' :
                         '✨ New'}
                      </span>
                    )}

                    {/* Stock Status Pill overlay */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center p-2 text-center">
                        <span className="bg-slate-900 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-md">
                          Out Of Stock
                        </span>
                      </div>
                    )}

                    {/* Photo Content */}
                    <div className="relative pt-[100%] overflow-hidden bg-slate-100">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Body Info */}
                    <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-widest block mb-0.5">
                          {categories.find(c => c.id === product.category)?.name || "General"}
                        </span>
                        <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-tight group-hover:text-emerald-700 transition">
                          {product.name}
                        </h4>
                        <p className="text-slate-400 text-[10px] sm:text-xs mt-0.5 font-medium">
                          Pack Size: {product.quantity}
                        </p>
                        {product.description && (
                          <p className="text-slate-500 text-[10px] sm:text-xs mt-1.5 leading-snug line-clamp-2">
                            {product.description}
                          </p>
                        )}
                      </div>

                      <div className="pt-2 border-t border-slate-50">
                        <div className="flex items-baseline space-x-1.5 mb-2.5">
                          <span className="text-lg sm:text-xl font-black text-slate-950">₹{product.price}</span>
                          <span className="text-slate-400 text-xs line-through">₹{Math.round(product.price * 1.25)}</span>
                        </div>

                        {/* Cart add/qty selectors container */}
                        {inCartItem ? (
                          <div className="flex items-center justify-between bg-emerald-50 rounded-xl p-1.5 border border-emerald-100">
                            <button 
                              onClick={() => updateCartQuantity(product.id, -1)}
                              className="bg-white text-emerald-700 hover:bg-emerald-600 hover:text-white h-7 w-7 rounded-lg flex items-center justify-center font-bold text-sm transition shadow-sm"
                            >
                              -
                            </button>
                            <span className="font-bold text-emerald-950 text-sm">
                              {inCartItem.quantitySelected}
                            </span>
                            <button 
                              onClick={() => updateCartQuantity(product.id, 1)}
                              className="bg-white text-emerald-700 hover:bg-emerald-600 hover:text-white h-7 w-7 rounded-lg flex items-center justify-center font-bold text-sm transition shadow-sm"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(product)}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center space-x-1 transition shadow-sm"
                          >
                            <Plus size={14} />
                            <span>Add to Cart</span>
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </main>

      {}
      <section id="why-us" className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Our Store Guidelines</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto mb-10">Fresh products every single day, with zero hassle order handling through WhatsApp. Check our local policy guidelines below.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center p-4">
              <div className="bg-emerald-50 p-4 rounded-3xl text-emerald-600 mb-3 text-2xl">⚡</div>
              <h3 className="font-bold text-slate-900 mb-1">Fast Delivery</h3>
              <p className="text-xs text-slate-500">Delivering fast right to your doorstep near the Racket Club area.</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-amber-50 p-4 rounded-3xl text-amber-600 mb-3 text-2xl">📍</div>
              <h3 className="font-bold text-slate-900 mb-1">Within 3 KM</h3>
              <p className="text-xs text-slate-500">Only delivering inside a local 3 km radius from Bilekahalli.</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-blue-50 p-4 rounded-3xl text-blue-600 mb-3 text-2xl">🥗</div>
              <h3 className="font-bold text-slate-900 mb-1">100% Freshness</h3>
              <p className="text-xs text-slate-500">Daily replenishment of vegetables, fruits, and Provision goods.</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-purple-50 p-4 rounded-3xl text-purple-600 mb-3 text-2xl">💳</div>
              <h3 className="font-bold text-slate-900 mb-1">UPI Accepted</h3>
              <p className="text-xs text-slate-500">Scan QR codes or pay using GPay, PhonePe, Paytm after delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Neighbors Review and FAQ */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Review Block */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900">What Our Neighborhood Says</h2>
                <p className="text-sm text-slate-500">Kind ratings from residents near Bilekahalli, Bangalore</p>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                  <div className="flex items-center space-x-1 text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                  <p className="text-sm text-slate-600">"Sri Sai Ram Provision Store has been my go-to shop. Their potatoes and vegetables are extremely fresh. Direct WhatsApp order is simple and saves me time."</p>
                  <span className="block text-xs font-bold text-slate-900">— Suneetha K., Bilekahalli Resident</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                  <div className="flex items-center space-x-1 text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                  <p className="text-sm text-slate-600">"Super easy! Just add everything into the cart on this website and click checkout. It brings down the entire typed receipt onto WhatsApp chat. Got my order delivered in 45 mins!"</p>
                  <span className="block text-xs font-bold text-slate-900">— Amit Sharma, Bilekahalli</span>
                </div>
              </div>
            </div>

            {/* FAQs Accordion Block */}
            <div id="faq" className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h2>
                <p className="text-sm text-slate-500">Everything you need to know about placing order</p>
              </div>

              <div className="space-y-3">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-1">How do I place an order?</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Add any desired groceries or fresh vegetables to your cart, click the Cart icon, fill out your name and delivery address, and click "Place Order on WhatsApp". It will instantly launch WhatsApp on your phone or desktop with a preformatted receipt to send us!</p>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-1">Are there any payment options on the website?</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">We do not process credit cards directly through our site to keep things simple. You can pay via any UPI app (GPay, PhonePe, Paytm) or Cash on Delivery once your package arrives safely.</p>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-1">What are the delivery charges & range?</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">We deliver for FREE on minimum orders of ₹100 within a 3 kilometer radius from our store located opposite the Racket Club in Bilekahalli.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {}
      <section id="contact" className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Store details list */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">VISIT US IN PERSON</span>
                <h2 className="text-3xl font-black text-slate-950">Sri Sai Ram Provision Store</h2>
                <p className="text-sm text-slate-500">Our family grocery store is located in the heart of Bilekahalli near key residential complexes.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3.5">
                  <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl mt-1">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Store Location Address</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{storeSettings.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl mt-1">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Owner Phone Number</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{storeSettings.phone} (Click to call directly)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl mt-1">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Business Store Hours</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Open Daily: 07:30 AM to 09:30 PM (Sunday open)</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(storeSettings.address)}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition text-xs flex items-center space-x-2"
                >
                  <MapPin size={14} />
                  <span>Get Directions on Google Maps</span>
                </a>
                <a 
                  href={`tel:${storeSettings.phone}`} 
                  className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold px-6 py-3 rounded-xl border border-slate-200 transition text-xs flex items-center space-x-2"
                >
                  <Phone size={14} className="text-emerald-600" />
                  <span>Call Store Owner</span>
                </a>
              </div>
            </div>

            {/* Google Map Section / Interactive iframe */}
            <div className="relative bg-slate-100 rounded-3xl overflow-hidden aspect-video lg:aspect-square shadow-xl border border-slate-200">
              <iframe 
                title="Sri Sai Ram Provision Store Location"
                src={storeSettings.gmapsEmbedUrl} 
                className="w-full h-full border-0" 
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            
            <div className="space-y-4">
              <span className="font-extrabold text-2xl text-white tracking-wide">
                Sai Ram Store
              </span>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your trusted, neighborhood Provision Store in Bilekahalli, Bangalore. Serving fresh staples, dairy needs, spices, soaps, biscuits, and vegetables directly to your door.
              </p>
              <div className="flex items-center space-x-2">
                <div className="bg-emerald-950 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase">
                  UPI Accepted
                </div>
                <div className="bg-slate-900 text-slate-300 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase">
                  AI Integrated
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-widest">Our Offerings</h4>
              <ul className="space-y-2.5 text-xs">
                {categories.filter(c => c.id !== 'all').slice(0, 5).map(cat => (
                  <li key={cat.id}>
                    <button onClick={() => setSelectedCategory(cat.id)} className="hover:text-emerald-500 transition">
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-widest">Contact Information</h4>
              <ul className="space-y-3 text-xs text-slate-500">
                <li className="flex items-start space-x-2">
                  <MapPin size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{storeSettings.address}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone size={14} className="text-emerald-500" />
                  <span>{storeSettings.phone}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Clock size={14} className="text-emerald-500" />
                  <span>07:30 AM to 09:30 PM (All Days)</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-widest">Store Operations</h4>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">We deliver orders only within a 3 km local radius around Bilekahalli to ensure high quality and freshness. Call us directly for custom bulk orders!</p>
              <a 
                href={`https://wa.me/${storeSettings.whatsappNumber.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-md"
              >
                <Phone size={12} />
                <span>Chat with Owner</span>
              </a>
            </div>

          </div>

          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Sri Sai Ram Provision Store. All Rights Reserved.</p>
            <p className="mt-2 md:mt-0">Premium Grocery Design • Created with Gemini & React</p>
          </div>
        </div>
      </footer>

      {}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
              
              {/* Drawer Top Header */}
              <div className="px-4 py-6 bg-slate-50 border-b border-slate-100 sm:px-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                    <ShoppingCart className="text-emerald-600" size={20} />
                    <span>Your Shopping Bag</span>
                  </h2>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200 transition"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Drawer Cart items section */}
              <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <span className="text-5xl block mb-4">🛒</span>
                    <h3 className="text-base font-bold text-slate-900 mb-1">Your cart is empty</h3>
                    <p className="text-xs text-slate-500">Pick fresh items from the catalog first.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex py-3 border-b border-slate-50 items-center justify-between space-x-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-14 h-14 object-cover rounded-xl border border-slate-100 flex-shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 text-sm truncate">{item.name}</h4>
                          <p className="text-xs text-slate-500 mt-0.5">{item.quantity} • ₹{item.price}</p>
                          <div className="flex items-center space-x-2 mt-1.5">
                            <button 
                              onClick={() => updateCartQuantity(item.id, -1)}
                              className="text-slate-500 bg-slate-100 hover:bg-slate-200 h-5 w-5 rounded flex items-center justify-center text-xs font-bold"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold text-slate-800">{item.quantitySelected}</span>
                            <button 
                              onClick={() => updateCartQuantity(item.id, 1)}
                              className="text-slate-500 bg-slate-100 hover:bg-slate-200 h-5 w-5 rounded flex items-center justify-center text-xs font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="text-right flex flex-col justify-between items-end h-full">
                          <span className="font-extrabold text-sm text-slate-950">₹{item.price * item.quantitySelected}</span>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-rose-500 hover:text-rose-700 text-xs mt-2.5"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Checkout and Address Form Section */}
              {cart.length > 0 && (
                <div className="border-t border-slate-150 p-4 sm:p-6 bg-slate-50 space-y-4 max-h-[60%] overflow-y-auto">
                  
                  {/* Total pricing box */}
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal items</span>
                      <span>₹{cartTotal}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Local Delivery Charge</span>
                      <span className="text-emerald-600 font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                      <span>Total Invoice Amount</span>
                      <span>₹{cartTotal}</span>
                    </div>
                  </div>

                  {/* Dynamic UPI Payment Block */}
                  {paymentMethod.includes('Instant UPI') && (
                    <div className="bg-white border-2 border-emerald-500 p-4 rounded-2xl shadow-inner space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Pay Instantly using UPI</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Secure</span>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center py-2 text-center">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                            `upi://pay?pa=${storeSettings.upiId}&pn=${encodeURIComponent(storeSettings.shopName)}&am=${cartTotal}&cu=INR&tn=Store%20Order`
                          )}`} 
                          alt="UPI Payment QR Code" 
                          className="w-40 h-40 object-contain border p-2 rounded-xl bg-slate-50 shadow-sm"
                        />
                        <p className="text-[11px] text-slate-500 mt-2">Scan with GPay, PhonePe, Paytm or BHIM app</p>
                        <span className="text-sm font-black text-slate-900 mt-1">Amount: ₹{cartTotal}</span>
                      </div>

                      <div className="space-y-2">
                        {/* Mobile Direct Pay Button */}
                        <a 
                          href={`upi://pay?pa=${storeSettings.upiId}&pn=${encodeURIComponent(storeSettings.shopName)}&am=${cartTotal}&cu=INR&tn=Store%20Order`}
                          className="w-full bg-emerald-50 text-emerald-700 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition border border-emerald-200 hover:bg-emerald-100"
                        >
                          <CreditCard size={14} />
                          <span>Tap to Pay via Mobile UPI App</span>
                        </a>

                        <div>
                          <label className="block text-[10px] text-slate-500 font-bold uppercase mb-1">Enter Transaction Ref/ID *</label>
                          <input 
                            type="text"
                            required
                            placeholder="12-digit UPI Ref Number (e.g. 4028...)"
                            value={upiTxnId}
                            onChange={(e) => setUpiTxnId(e.target.value)}
                            className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Delivery Detail forms */}
                  <form onSubmit={handlePlaceOrder} className="space-y-3.5">
                    <div className="border-t border-slate-200 pt-3">
                      <span className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Delivery Particulars</span>
                      
                      <div className="space-y-2 text-xs">
                        <div>
                          <input 
                            type="text" 
                            required
                            placeholder="Your Name *"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-855 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>

                        <div>
                          <textarea 
                            rows="2"
                            required
                            placeholder="Complete Delivery Address (e.g., Flat/House No, Floor, Building Name, Opp Racket Club Area) *"
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-855 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Preferred Payment Choice</label>
                          <select 
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full px-2 py-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                          >
                            <option value="Instant UPI QR Code (Pay Instantly)">Instant UPI Payment (QR Code/Mobile App Link)</option>
                            <option value="UPI on Delivery (GPay / PhonePe / Paytm)">UPI App Transfer after delivery</option>
                            <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Delivery alert policy notice box */}
                    <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-lg text-[10px] text-emerald-800 space-y-0.5">
                      <p className="font-bold flex items-center space-x-1">
                        <Info size={10} />
                        <span>Delivery Range Check:</span>
                      </p>
                      <p>Currently serving customers located up to 3 km away from Bilekahalli near Racket Club only.</p>
                    </div>

                    {/* WhatsApp Checkout action button */}
                    <button 
                      type="submit" 
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl shadow-lg hover:shadow-emerald-200 transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 text-sm"
                    >
                      <Phone size={16} fill="currentColor" />
                      <span>{paymentMethod.includes('Instant UPI') ? "Verify & Order on WhatsApp" : `Order on WhatsApp (₹${cartTotal})`}</span>
                    </button>
                  </form>

                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {}
      <div className="fixed bottom-5 right-5 z-50">
        {!isChatbotOpen ? (
          <button 
            onClick={() => setIsChatbotOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center relative group"
            title="Chat with Assistant"
          >
            <MessageSquare size={24} />
            <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 font-extrabold text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider animate-bounce">
              AI
            </span>
          </button>
        ) : (
          <div className="w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-150 flex flex-col overflow-hidden max-h-[500px] animate-fadeIn">
            
            {/* Chatbot Header */}
            <div className="bg-gradient-to-r from-emerald-850 from-emerald-800 to-green-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="bg-white/10 p-1.5 rounded-xl text-lg relative">
                  🤖
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 border border-slate-900"></span>
                </div>
                <div>
                  <span className="font-extrabold text-sm block">Sai Ram Sahayak</span>
                  <span className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider">Active Store Assistant</span>
                </div>
              </div>
              <button 
                onClick={() => setIsChatbotOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Message Pane */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 min-h-[250px] max-h-[350px]">
              {chatbotMessages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                  }`}
                >
                  <div 
                    className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-emerald-600 text-white rounded-br-none' 
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}
              
              {isChatLoading && (
                <div className="mr-auto max-w-[85%] flex items-center space-x-2 bg-white border border-slate-200 px-3.5 py-2.5 rounded-2xl rounded-bl-none shadow-sm text-xs text-slate-500">
                  <Loader2 size={12} className="animate-spin text-emerald-600" />
                  <span>Assistant is thinking...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Helper presets */}
            <div className="px-3 py-2 bg-slate-100 border-t border-slate-150 flex gap-1.5 overflow-x-auto text-[10px] font-semibold text-slate-600 scrollbar-none">
              <button 
                onClick={() => setChatInput("What can I cook under ₹100 using fresh tomatoes?")}
                className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 shrink-0"
              >
                🥘 Under ₹100 meal
              </button>
              <button 
                onClick={() => setChatInput("Is Toor Dal organic?")}
                className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 shrink-0"
              >
                🌾 Toor Dal details
              </button>
              <button 
                onClick={() => setChatInput("What is your shop location & timing?")}
                className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 shrink-0"
              >
                📍 Store Timing
              </button>
            </div>

            {/* Chat Input form */}
            <form onSubmit={handleSendChatMessage} className="p-3 bg-white border-t border-slate-150 flex items-center space-x-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about prices, recipe suggestions..."
                className="flex-1 bg-slate-50 px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white"
              />
              <button 
                type="submit"
                disabled={isChatLoading || !chatInput.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-xl transition disabled:opacity-50"
              >
                <Send size={14} />
              </button>
            </form>

          </div>
        )}
      </div>

    </div>
  );
}