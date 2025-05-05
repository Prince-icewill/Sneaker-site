"use client"

import React, { useState } from 'react'

import { useEffect } from "react"
import {
  ShoppingCart,
  Minus,
  Plus,
  User,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Star,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react"
import "./App.css"

function App() {
  // Product images array
  const productImages = [
    "/sneaker-1.jpg",
    "/sneaker-2.jpg",
    "/sneaker-3.jpg",
    "/sneaker-4.jpg",
  ]


  // State management
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [cartItems, setCartItems] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState("42")
  const [selectedColor, setSelectedColor] = useState("white")
  const [notification, setNotification] = useState(null)

  // Product data
  const product = {
    id: 1,
    name: "Fall Limited Edition Sneakers",
    company: "SNEAKER COMPANY",
    description:
      "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
    price: 125.0,
    originalPrice: 250.0,
    discount: "50%",
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "white", code: "#ffffff", border: true },
      { name: "black", code: "#000000" },
      { name: "red", code: "#ef4444" },
      { name: "blue", code: "#3b82f6" },
    ],
    rating: 4.2,
    reviewCount: 43,
  }

  // Navigation functions
  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))
  }

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
  }

  // Quantity functions
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0))
  }

  // Cart functions
  const addToCart = () => {
    if (quantity === 0) {
      showNotification("Please select at least 1 item")
      return
    }

    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id && item.size === selectedSize && item.color === selectedColor,
    )

    if (existingItemIndex !== -1) {
      // Update existing item
      const updatedCart = [...cartItems]
      updatedCart[existingItemIndex].quantity += quantity
      setCartItems(updatedCart)
    } else {
      // Add new item
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: productImages[0],
          quantity,
          size: selectedSize,
          color: selectedColor,
        },
      ])
    }

    showNotification("Added to cart!")
    setQuantity(0)
  }

  const removeFromCart = (index) => {
    const newCart = [...cartItems]
    newCart.splice(index, 1)
    setCartItems(newCart)
    showNotification("Item removed from cart")
  }

  const clearCart = () => {
    setCartItems([])
    showNotification("Cart cleared")
  }

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // Close cart and menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCart && !event.target.closest(".cart-dropdown") && !event.target.closest(".cart-button")) {
        setShowCart(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showCart])

  return (
    <div className="app-container">
      {/* Notification */}
      {notification && <div className="notification">{notification}</div>}

      {/* Navigation */}
      <header className="header">
        <div className="nav-container">
          {/* Mobile menu button */}
          <button className="menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            <Menu className="icon" />
          </button>

          <h1 className="brand-name">sneakers</h1>

          {/* Desktop Navigation */}
          <nav className="main-nav">
            <a href="#" className="nav-link">
              Collections
            </a>
            <a href="#" className="nav-link">
              Men
            </a>
            <a href="#" className="nav-link">
              Women
            </a>
            <a href="#" className="nav-link">
              About
            </a>
            <a href="#" className="nav-link">
              Contact
            </a>
          </nav>

          <div className="nav-right">
            {/* Cart button */}
            <button aria-label="Cart" className="icon-button cart-button" onClick={() => setShowCart(!showCart)}>
              <ShoppingCart className="icon" />
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
              )}
            </button>

            {/* User avatar */}
            <div className="user-avatar">
            <img src="logo-1.jpg" alt="" />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-container">
            <button className="close-menu-button" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
              <X className="icon" />
            </button>

            <nav className="mobile-nav">
              <a href="#" className="mobile-nav-link">
                Collections
              </a>
              <a href="#" className="mobile-nav-link">
                Men
              </a>
              <a href="#" className="mobile-nav-link">
                Women
              </a>
              <a href="#" className="mobile-nav-link">
                About
              </a>
              <a href="#" className="mobile-nav-link">
                Contact
              </a>
            </nav>
          </div>
        </div>

        {/* Cart Dropdown */}
        {showCart && (
          <div className="cart-dropdown">
            <div className="cart-header">
              <h3>Shopping Cart</h3>
              {cartItems.length > 0 && (
                <button onClick={clearCart} className="clear-cart-button">
                  Clear
                </button>
              )}
            </div>

            <div className="cart-content">
              {cartItems.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
              ) : (
                <>
                  <ul className="cart-items">
                    {cartItems.map((item, index) => (
                      <li key={index} className="cart-item">
                        <img src={item.image || "/placeholder.svg"} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                          <p className="cart-item-name">{item.name}</p>
                          <p className="cart-item-price">
                            ${item.price.toFixed(2)} × {item.quantity}
                            <span className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</span>
                          </p>
                          <div className="cart-item-meta">
                            <span className="cart-item-size">Size: {item.size}</span>
                            <span
                              className="cart-item-color"
                              style={{
                                backgroundColor: product.colors.find((c) => c.name === item.color)?.code,
                              }}
                            ></span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="remove-item-button"
                          aria-label="Remove item"
                        >
                          <X className="remove-icon" />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="cart-total">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>

                  <button className="checkout-button">Checkout</button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="breadcrumbs-container">
          <a href="#" className="breadcrumb-link">
            Home
          </a>
          <span className="breadcrumb-separator">/</span>
          <a href="#" className="breadcrumb-link">
            Men
          </a>
          <span className="breadcrumb-separator">/</span>
          <a href="#" className="breadcrumb-link">
            Shoes
          </a>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Fall Limited Edition Sneakers</span>
        </div>
      </div>

      {/* Product Section */}
      <main className="main-content">
        <div className="product-container">
          {/* Product Image Gallery */}
          <div className="product-gallery">
            {/* Main Image */}
            <div className="main-image-container">
              <div className="main-image-wrapper">
                <img
                  src={productImages[currentImageIndex] || "/placeholder.svg"}
                  alt={`Fall Limited Edition Sneakers - View ${currentImageIndex + 1}`}
                  className="main-image"
                />
              </div>

              {/* Navigation Arrows */}
              <button onClick={goToPrevImage} className="nav-arrow nav-arrow-left" aria-label="Previous image">
                <ChevronLeft className="arrow-icon" />
              </button>

              <button onClick={goToNextImage} className="nav-arrow nav-arrow-right" aria-label="Next image">
                <ChevronRight className="arrow-icon" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="thumbnail-container">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`thumbnail-button ${currentImageIndex === index ? "active" : ""}`}
                  aria-label={`View image ${index + 1}`}
                  aria-current={currentImageIndex === index}
                >
                  <div className="thumbnail-wrapper">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className={`thumbnail-image ${currentImageIndex === index ? "selected" : ""}`}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="product-details">
            <div className="product-header">
              <p className="company-name">{product.company}</p>
              <h2 className="product-title">{product.name}</h2>

              {/* Product Rating */}
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`star-icon ${i < Math.floor(product.rating) ? "filled" : ""}`}
                      fill={i < Math.floor(product.rating) ? "#f97316" : "none"}
                    />
                  ))}
                </div>
                <span className="rating-text">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="price-container">
              <div className="current-price-container">
                <span className="current-price">${product.price.toFixed(2)}</span>
                <span className="discount-badge">{product.discount}</span>
              </div>
              <p className="original-price">${product.originalPrice.toFixed(2)}</p>
            </div>

            {/* Color Selection */}
            <div className="product-colors">
              <h3 className="option-title">Color</h3>
              <div className="color-options">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`color-option ${selectedColor === color.name ? "selected" : ""} ${color.border ? "with-border" : ""}`}
                    style={{ backgroundColor: color.code }}
                    onClick={() => setSelectedColor(color.name)}
                    aria-label={`Select ${color.name} color`}
                    aria-pressed={selectedColor === color.name}
                  ></button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="product-sizes">
              <div className="size-header">
                <h3 className="option-title">Size</h3>
                <button className="size-guide-button">Size Guide</button>
              </div>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? "selected" : ""}`}
                    onClick={() => setSelectedSize(size)}
                    aria-label={`Select size ${size}`}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="actions-container">
              {/* Quantity Selector */}
              <div className="quantity-selector">
                <button
                  className="quantity-button"
                  onClick={decreaseQuantity}
                  aria-label="Decrease quantity"
                  disabled={quantity === 0}
                >
                  <Minus className="quantity-icon" />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button className="quantity-button" onClick={increaseQuantity} aria-label="Increase quantity">
                  <Plus className="quantity-icon" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button className="add-to-cart-button" onClick={addToCart} disabled={quantity === 0}>
                <ShoppingCart className="cart-icon" />
                Add to cart
              </button>

              {/* Wishlist Button */}
              <button className="wishlist-button" aria-label="Add to wishlist">
                <Heart className="wishlist-icon" />
              </button>
            </div>

            {/* Product Benefits */}
            <div className="product-benefits">
              <div className="benefit">
                <Truck className="benefit-icon" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="benefit">
                <RotateCcw className="benefit-icon" />
                <span>30-day return policy</span>
              </div>
              <div className="benefit">
                <ShieldCheck className="benefit-icon" />
                <span>2-year warranty</span>
              </div>
            </div>

            {/* Share */}
            <div className="product-share">
              <button className="share-button">
                <Share2 className="share-icon" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Product Reviews - Updated to match the reference image */}
        <div className="product-reviews">
          <h2 className="review-heading">Customer Reviews</h2>

          <div className="reviews-container">
            <div className="rating-summary">
              <div className="rating-number">{product.rating}</div>
              <div className="rating-stars-vertical">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`star-icon-vertical ${i < Math.floor(product.rating) ? "filled" : ""}`}
                    fill={i < Math.floor(product.rating) ? "#f97316" : "none"}
                  />
                ))}
                <div className="review-count-text">Based on {product.reviewCount} reviews</div>
              </div>
            </div>

            <button className="write-review-button">Write a Review</button>
          </div>

          <div className="review-list">
            <div className="review">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">JD</div>
                  <div className="reviewer-details">
                    <span className="reviewer-name">John Doe</span>
                    <span className="review-date">2 weeks ago</span>
                  </div>
                </div>
                <div className="review-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`star-icon ${i < 5 ? "filled" : ""}`}
                      fill={i < 5 ? "#f97316" : "none"}
                      size={16}
                    />
                  ))}
                </div>
              </div>
              <h4 className="review-title">Perfect fit and very comfortable</h4>
              <p className="review-content">
                These sneakers are amazing! They fit perfectly and are very comfortable for all-day wear. The quality is
                excellent and they look even better in person than in the photos.
              </p>
            </div>

            <div className="review">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">AS</div>
                  <div className="reviewer-details">
                    <span className="reviewer-name">Alice Smith</span>
                    <span className="review-date">1 month ago</span>
                  </div>
                </div>
                <div className="review-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`star-icon ${i < 4 ? "filled" : ""}`}
                      fill={i < 4 ? "#f97316" : "none"}
                      size={16}
                    />
                  ))}
                </div>
              </div>
              <h4 className="review-title">Great design, runs a bit large</h4>
              <p className="review-content">
                I love the design and color of these sneakers. The only issue is that they run a bit large, so I would
                recommend sizing down. Otherwise, they're great quality and very stylish.
              </p>
            </div>

            <button className="load-more-button">Load More Reviews</button>
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products">
          <h3 className="section-title">You May Also Like</h3>
          <div className="product-grid">
            {[1, 2, 3, 4,].map((item) => (
              <div key={item} className="related-product">
                <div className="related-product-image">
                  <img src={`/related-${item}.jpg`} alt={`Related Product ${item}`} />
                </div>
                <div className="related-product-info">
                  <h4 className="related-product-title">Classic Running Sneakers</h4>
                  <div className="related-product-price">$119.00</div>
                  <div className="related-product-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`star-icon ${i < 4 ? "filled" : ""}`}
                        fill={i < 4 ? "#f97316" : "none"}
                        size={14}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3 className="footer-title">sneakers</h3>
            <p className="footer-description">
              The best place to find premium quality sneakers for all your needs. We offer a wide range of styles and
              brands.
            </p>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Shop</h4>
            <ul className="footer-links">
              <li>
                <a href="#">Men</a>
              </li>
              <li>
                <a href="#">Women</a>
              </li>
              <li>
                <a href="#">Kids</a>
              </li>
              <li>
                <a href="#">Collections</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Shipping Info</a>
              </li>
              <li>
                <a href="#">Returns</a>
              </li>
              <li>
                <a href="#">Size Guide</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2025 Sneakers. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
