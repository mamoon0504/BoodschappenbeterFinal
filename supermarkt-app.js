import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class SupermarktApp extends LitElement {
  static properties = {
    products: { type: Array },
    categories: { type: Array },
    searchQuery: { type: String },
    displayedProducts: { type: Array },
    currentView: { type: String },
    selectedProduct: { type: Object },
    selectedProductIndex: { type: Number },
    isLoading: { type: Boolean },
    sortBy: { type: String },
    cart: { type: Array },
    shoppingLists: { type: Array },
    currentList: { type: Object },
    showNewListDialog: { type: Boolean },
    showDeleteListDialog: { type: Boolean },
    listToDelete: { type: Object },
    isAddingToList: { type: Boolean },
    expandedListComparison: { type: Boolean },
    selectedSupermarket: { type: String },
    notification: { type: Object },
    showPrivacyDialog: { type: Boolean },
    showSortExplanation: { type: Boolean }
  };

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
      min-height: 100vh;
      padding-bottom: 70px;
    }

    :root {
      --radius-sm: 6px;   /* kleine elementen */
      --radius-md: 8px;   /* medium elementen */
      --radius-lg: 12px;  /* grote cards */
    }


    /* Algorithm FAQ */
    .algorithm-faq {
      background: white;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border: 1px solid #e0e0e0;
    }

    .algorithm-faq summary {
      font-size: 15px;
      font-weight: 600;
      color: #333;
      cursor: pointer;
      list-style: none;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .algorithm-faq summary::-webkit-details-marker {
      display: none;
    }

    .algorithm-faq[open] summary {
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 2px solid #2E8B57;
    }

    .faq-content {
      margin-top: 0;
    }

    .faq-item {
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;
    }

    .faq-item:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }

    .faq-item strong {
      display: block;
      color: #2E8B57;
      margin-bottom: 8px;
      font-size: 14px;
    }

    .faq-item p {
      font-size: 13px;
      color: #666;
      line-height: 1.6;
      margin: 0;
    }



    .comparison-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .info-btn {
      background: #e8f5e9;
      border: 1px solid #2E8B57;
      color: #2E8B57;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 13px;
      cursor: pointer;
      font-weight: 600;
    }

    .info-btn:hover {
      background: #d4edda;
    }

    .algorithm-bias-notice {
      background: #fff3cd;
      border-left: 4px solid #ff9800;
      padding: 14px;
      margin-bottom: 16px;
      border-radius: 6px;
      font-size: 13px;
      line-height: 1.6;
    }

    .algorithm-bias-notice strong {
      display: block;
      color: #856404;
      margin-bottom: 8px;
    }

    .algorithm-bias-notice p {
      margin: 6px 0;
      color: #666;
    }

    .sort-explanation {
      background: #fff3cd;
      border-left: 4px solid #FF8C00;
      padding: 16px;
      margin-bottom: 16px;
      border-radius: 6px;
      font-size: 13px;
      line-height: 1.6;
    }

    .sort-explanation ul {
      margin-left: 20px;
      margin-top: 8px;
    }

    .sort-explanation li {
      margin-bottom: 4px;
    }


    .user-story-card {
      background: linear-gradient(135deg, #2E8B57 0%, #3ba368 100%);
      color: white;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 24px;
      box-shadow: 0 4px 12px rgba(46, 139, 87, 0.3);
    }

    .user-story-card h3 {
      font-size: 18px;
      margin-bottom: 16px;
    }

    .stat-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 16px;
    }

    .stat-item {
      background: rgba(255, 255, 255, 0.15);
      padding: 12px;
      border-radius: 8px;
      text-align: center;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 11px;
      opacity: 0.9;
    }

    .story-text {
      font-size: 13px;
      line-height: 1.6;
      background: rgba(255, 255, 255, 0.1);
      padding: 12px;
      border-radius: 6px;
      border-left: 3px solid #FF8C00;
    }


    .privacy-banner {
      background: #e8f5e9;
      border: 1px solid #2E8B57;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      color: #2E8B57;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      margin-bottom: 16px;
    }

    .privacy-banner button {
      background: none;
      border: none;
      font-size: 16px;
      cursor: pointer;
    }


    /* NOTIFICATION */
    .notification {
      position: fixed;
      top: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: #2E8B57;
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 1001;
      animation: slideDown 0.3s ease-out;
      max-width: 90%;
      text-align: center;
      font-weight: 600;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }

    /* HEADER */
    .header {
      background: #2E8B57;
      padding: 16px;
      color: white;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }

    .header-with-back {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .back-button, .home-button {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
    }

    .home-button {
      margin-left: auto;
    }

    .header-title {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }

    .search-container {
      position: relative;
      margin-top: 16px;
    }

    button:focus-visible, 
    .nav-item:focus-visible,
    .product-card:focus-visible {
      outline: 3px solid #2E8B57;
      outline-offset: 2px;
    }

    .search-box:focus {
      outline: 2px solid #2E8B57;
      outline-offset: 0;
    }

    .search-box {
      width: 100%;
      padding: 12px 40px 12px 40px;
      border: none;
      border-radius: 8px;
      font-size: 15px;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
      font-size: 18px;
    }

    .filter-button {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #666;
      font-size: 20px;
      cursor: pointer;
      padding: 4px;
    }

    /* MAIN CONTENT */
    .main-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 16px;
      padding-bottom: 100px;
      width: 100%;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    /* LOADING SKELETON */
    .loading-skeleton {
      padding: 20px;
    }

    .skeleton-item {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
      border-radius: 8px;
      margin-bottom: 12px;
    }

    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    .skeleton-card {
      height: 280px;
      margin-bottom: 12px;
    }

    /* SORT BUTTONS */
    .sort-controls {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }

    .sort-button {
      padding: 8px 16px;
      border: 2px solid #2E8B57;
      background: white;
      color: #2E8B57;
      border-radius: var(--radius-md);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      letter-spacing: 0.3px;
    }

    .sort-button.active {
      background: #2E8B57;
      color: white;
    }

    /* SHOPPING LISTS */
    .shopping-lists-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .add-list-btn {
      background: #2E8B57;
      color: white;
      border: none;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      font-size: 28px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }

    .list-card {
      background: #e8e8e8;
      border-radius: var(--radius-lg);
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: relative;
    }

    .list-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .list-name {
      font-size: 22px;
      font-weight: 700;
      color: #333;
    }

    .delete-list-btn {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }

    .list-items {
      font-size: 15px;
      color: #000;
      margin-bottom: 12px;
      line-height: 1.8;
      white-space: pre-line;
    }

    .best-deal {
      background: #FF8C00;
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 8px;
      cursor: pointer;
    }

    .best-deal.neutral {
      background: #f0f0f0;
      color: #333;
    }

    .best-deal-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }

    .best-deal-supermarket {
      font-size: 18px;
      font-weight: 700;
      color: #000;
    }

    .best-deal.neutral .best-deal-supermarket {
      color: #666;
    }

    .best-deal-price {
      font-size: 20px;
      font-weight: 700;
      color: #2E8B57;
    }

    .best-deal.neutral .best-deal-price {
      color: #666;
    }

    .original-price {
      font-size: 14px;
      text-decoration: line-through;
      opacity: 0.8;
      color: #828282;
    }

    .availability-warning {
      background: #fff3cd;
      border-left: 4px solid #ff9800;
      padding: 8px 12px;
      margin-bottom: 8px;
      border-radius: 4px;
      font-size: 12px;
      color: #856404;
    }

    .view-more-btn, .add-to-cart-from-list-btn {
      background: none;
      border: none;
      color: #000;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 8px;
      margin-left: auto;
    }

    .add-to-cart-from-list-btn {
      background: #FF8C00;
      color: black;
      padding: 10px 20px;
      border-radius: 8px;
      margin-left: 0;
    }

    /* LIST DETAIL */
    .list-detail-products {
      background: white;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .list-product-item {
      display: flex;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
      gap: 12px;
    }

    .list-product-item:last-child {
      border-bottom: none;
    }

    .list-product-image {
      width: 50px;
      height: 50px;
      object-fit: contain;
      border-radius: 8px;
      background: #f9f9f9;
    }

    .list-product-info {
      flex: 1;
    }

    .list-product-name {
      font-size: 14px;
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
      line-height: 1.5;
    }

    .list-product-price {
      font-size: 13px;
      color: #FF8C00;
      font-weight: 700;
    }

    .remove-from-list-btn {
      background: #e74c3c;
      border: none;
      color: white;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .supermarket-comparison {
      background: white;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .comparison-title {
      font-size: 16px;
      font-weight: 700;
      color: #333;
      margin-bottom: 12px;
    }

    .comparison-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      margin-bottom: 12px;
      border-radius: 8px;
      background: #f9f9f9;
      cursor: pointer;
      transition: all 0.2s;
    }

    .comparison-item:hover {
      background: #f0f0f0;
    }

    .comparison-item.best {
      background: #FF8C00;
      color: white;
    }

    .comparison-item.selected {
      border: 3px solid #2E8B57;
      background: #e8f5e9;
    }

    .comparison-item.unavailable {
      opacity: 0.5;
      background: #ffebee;
    }

    .comparison-left {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
    }

    .comparison-supermarket {
      font-size: 16px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .comparison-item.best .comparison-supermarket {
      color: #000;
    }

    .comparison-price {
      font-size: 18px;
      font-weight: 700;
      margin-right: 12px;
    }

    .comparison-item.best .comparison-price {
      color: #000;
    }

    .choose-btn {
      background: #2E8B57;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: var(--radius-md);
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      letter-spacing: 0.3px;
    }

    .choose-btn:hover {
      background: #257d4a;
    }

    .comparison-item.selected .choose-btn {
      background: #666;
      cursor: default;
    }

    .unavailable-badge {
      font-size: 11px;
      background: #e74c3c;
      color: white;
      padding: 2px 6px;
      border-radius: var(--radius-sm);
      margin-left: 8px;
    }

    .comparison-details {
      background: #f9f9f9;
      padding: 12px;
      margin-top: 8px;
      border-radius: 8px;
      font-size: 13px;
    }

    .comparison-product-line {
      display: flex;
      justify-content: space-between;
      padding: 4px 0;
      color: #333;
    }

    .add-products-btn, .add-to-cart-list-btn {
      background: #2E8B57;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      width: 100%;
      margin-top: 12px;
    }

    .add-to-cart-list-btn {
      background: #FF8C00;
      color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 17px;
      font-weight: 700;
      padding: 16px 24px;
    }

    .add-to-cart-list-btn:hover {
      background: #e67e00;
    }

    .adding-mode-indicator {
      background: #2E8B57;
      color: white;
      padding: 8px 16px;
      border-radius: 8px;
      margin-bottom: 16px;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .done-adding-btn {
      background: white;
      color: #2E8B57;
      border: none;
      padding: 6px 16px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }

    .selected-market-indicator {
      background: #e8f5e9;
      border-left: 4px solid #2E8B57;
      padding: 12px;
      margin-bottom: 16px;
      border-radius: 4px;
      font-size: 14px;
      color: #2E8B57;
      font-weight: 600;
    }

    /* DIALOG */
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .dialog {
      background: white;
      border-radius: 12px;
      padding: 24px;
      max-width: 400px;
      width: 90%;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }

    .dialog-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 16px;
      color: #333;
    }

    .dialog-input {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 15px;
      margin-bottom: 16px;
    }

    .dialog-buttons {
      display: flex;
      gap: 12px;
    }

    .dialog-btn {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: var(--radius-md);
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      letter-spacing: 0.3px;
    }

    .dialog-btn.primary {
      background: #2E8B57;
      color: white;
    }

    .dialog-btn.secondary {
      background: #e0e0e0;
      color: #333;
    }

    .dialog-btn.danger {
      background: #e74c3c;
      color: white;
    }

    /* CATEGORY GRID */
    .categories-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 24px;
    }

    .category-card {
      background: white;
      border-radius: 12px;
      padding: 16px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }

    .category-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .category-image {
      width: 80px;
      height: 80px;
      margin: 0 auto 12px;
      background: #2E8B57;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
    }

    .category-name {
      font-size: 13px;
      font-weight: 500;
      color: #000000ff;
      line-height: 1.3;
    }

    
    .results-header {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #666;
    }

    .product-grid-container {
      min-height: 400px;
      display: flex;
      justify-content: center;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 12px;
      padding: 4px;
      width: 100%;
      justify-items: center;
    }

    .product-card {
      background: white;
      border-radius: var(--radius-lg);
      padding: 12px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      position: relative;
      height: 280px;
      width: 100%;
      max-width: 280px;
    }

    .product-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .add-to-cart-btn, .add-to-list-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #FF8C00;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      z-index: 10;
    }

    .add-to-list-btn {
      background: #2E8B57;
    }

    .product-image-small {
      width: 100%;
      height: 120px;
      object-fit: contain;
      border-radius: 8px;
      background: #f9f9f9;
      margin-bottom: 8px;
    }

    .product-name {
      font-size: 13px;
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
      line-height: 1.5;
      min-height: 36px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-price-from {
      font-size: 12px;
      color: #666;
      margin-bottom: 4px;
    }

    .best-price {
      display: inline-block;
      padding: 4px 8px;
      border-radius: var(--radius-sm);
      font-size: 14px;
      font-weight: 700;
      background: #FF8C00;
      color: #000;
    }

    /* PRODUCT DETAIL */
    .product-detail {
      background: white;
      border-radius: 12px;
      margin-bottom: 16px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: relative;
    }

    .product-detail-header {
      padding: 16px;
      border-bottom: 1px solid #f0f0f0;
    }

    .product-detail-name {
      font-size: 20px;
      font-weight: 700;
      color: #333;
      line-height: 1.3;
    }

    .product-detail-actions {
      display: flex;
      gap: 8px;
      padding: 12px 16px;
      background: #f9f9f9;
      border-bottom: 1px solid #f0f0f0;
    }

    .product-action-btn {
      flex: 1;
      padding: 12px 16px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .product-action-btn.cart {
      background: #FF8C00;
      color: white;
    }

    .product-action-btn.list {
      background: #2E8B57;
      color: white;
    }

    .product-image-large {
      width: 100%;
      max-height: 250px;
      object-fit: contain;
      padding: 24px;
      background: #f9f9f9;
    }

    .price-list {
      padding: 0;
    }

    .price-item {
      display: flex;
      align-items: center;
      padding: 16px;
      gap: 12px;
      background: #f0f0f0;
      margin-bottom: 2px;
    }

    .price-item.best {
      background: #FF8C00;
    }

    .price-rank {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 16px;
      flex-shrink: 0;
    }

    .price-item.best .price-rank {
      color: #FF8C00;
    }

    .price-info {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .supermarket-name {
      font-weight: 700;
      font-size: 17px;
      color: #333;
    }

    .price-item.best .supermarket-name {
      color: #000;
    }

    .star-icon {
      color: white;
      font-size: 18px;
    }

    .price-value {
      font-weight: 700;
      font-size: 17px;
      color: #333;
      margin-left: auto;
    }

    .price-item.best .price-value {
      color: #000;
    }

    /* MAP */
    .map-container {
      background: white;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .map-image {
      width: 100%;
      height: auto;
      border-radius: 8px;
      display: block;
    }

    /* CART */
    .cart-empty {
      text-align: center;
      padding: 60px 20px;
      color: #666;
    }

    .cart-empty-icon {
      font-size: 80px;
      margin-bottom: 16px;
    }

    .cart-item {
      background: white;
      border-radius: var(--radius-lg);
      padding: 16px;
      margin-bottom: 12px;
      display: flex;
      gap: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .cart-item-image {
      width: 80px;
      height: 80px;
      object-fit: contain;
      border-radius: 8px;
      background: #f9f9f9;
    }

    .cart-item-details {
      flex: 1;
    }

    .cart-item-name {
      font-size: 15px;
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
      line-height: 1.5;
    }

    .cart-item-price {
      font-size: 18px;
      font-weight: 700;
      color: #FF8C00;
    }

    .remove-btn {
      background: #e74c3c;
      border: none;
      color: white;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
    }

    .cart-total {
      background: white;
      border-radius: 12px;
      padding: 20px;
      margin-top: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .cart-total-label {
      font-size: 18px;
      font-weight: 700;
      color: #333;
      margin-bottom: 8px;
    }

    .cart-total-amount {
      font-size: 32px;
      font-weight: 700;
      color: #2E8B57;
    }

    /* ALTERNATIVES */
    .alternatives {
      background: white;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .alternatives-title {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #333;
    }

    .alternatives-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .alternative-item {
      text-align: center;
      cursor: pointer;
      padding: 8px;
      border-radius: 8px;
      transition: background 0.2s;
    }

    .alternative-item:hover {
      background: #f9f9f9;
    }

    .alternative-image {
      width: 100%;
      height: 100px;
      object-fit: contain;
      border-radius: 8px;
      background: #f9f9f9;
      margin-bottom: 8px;
    }

    .alternative-name {
      font-size: 12px;
      color: #333;
      font-weight: 500;
      line-height: 1.3;
    }

    
    .bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: white;
      border-top: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-around;
      padding: 8px 0;
      z-index: 100;
      box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 8px 16px;
      cursor: pointer;
      border: none;
      background: none;
      color: #666;
      transition: all 0.2s;
      position: relative;
      flex: 1;
      border-radius: 8px;
    }

    .nav-item:hover {
      color: #2E8B57;
      background: #f0f0f0;
    }

    /* Verbeter active state visibility */
    .nav-item.active::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 3px;
      background: #2E8B57;
      border-radius: 0 0 3px 3px;
    }


    .nav-item.active {
      color: #2E8B57;
      background: #e8f5e9;
    }

    .nav-icon {
      font-size: 24px;
      position: relative;
      display: inline-block;
    }

    .nav-label {
      font-size: 11px;
      font-weight: 600;
    }

    .cart-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #e74c3c;
      color: white;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
    }

    /* LOADING & EMPTY */
    .loading {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    .no-results {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    .data-info-card {
      background: #fff3cd;
      border-left: 4px solid #FF8C00;
      padding: 16px;
      margin: 16px 0;
      border-radius: 8px;
    }

    .data-info-card h3 {
      font-size: 16px;
      color: #856404;
      margin-bottom: 12px;
    }

    .data-details p {
      font-size: 13px;
      color: #856404;
      margin-bottom: 8px;
      line-height: 1.6;
    }

    .data-disclaimer {
      margin-top: 12px;
      font-style: italic;
      border-top: 1px solid #ffc107;
      padding-top: 12px;
    }

    /* Data control section */
    .data-control-section {
      background: #f9f9f9;
      border-radius: 12px;
      padding: 16px;
      margin-top: 20px;
      border: 1px solid #e0e0e0;
    }

    .data-control-section summary {
      font-size: 14px;
      font-weight: 600;
      color: #666;
      cursor: pointer;
      list-style: none;
    }

    .data-control-section summary::-webkit-details-marker {
      display: none;
    }

    .reset-data-btn {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      width: 100%;
      transition: background 0.2s;
    }

    .reset-data-btn:hover {
      background: #c0392b;
    }



    /* RESPONSIVE */
    @media (min-width: 768px) {
      .categories-grid {
        grid-template-columns: repeat(3, 1fr);
      }

      .product-grid {
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 16px;
      }

      .alternatives-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .product-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  `;

  constructor() {
    super();
    this.products = [];
    this.categories = [];
    this.searchQuery = '';
    this.displayedProducts = [];
    this.currentView = 'home';
    this.selectedProduct = null;
    this.selectedProductIndex = -1;
    this.isLoading = true;
    this.sortBy = 'alphabetical';
    this.cart = this.loadCart();
    this.shoppingLists = this.loadShoppingLists();
    this.currentList = null;
    this.showNewListDialog = false;
    this.showDeleteListDialog = false;
    this.listToDelete = null;
    this.isAddingToList = false;
    this.expandedListComparison = false;
    this.selectedSupermarket = null;
    this.searchDebounceTimer = null;
    this.notification = null;
    this.loadProducts();
    this.showPrivacyDialog = false;
  }

  // NOTIFICATION SYSTEM (geen alert meer!)
  showNotification(message) {
    this.notification = { message };
    this.requestUpdate();

    setTimeout(() => {
      this.notification = null;
      this.requestUpdate();
    }, 3000);
  }

  loadCart() {
    try {
      const saved = localStorage.getItem('shopping-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  saveCart() {
    localStorage.setItem('shopping-cart', JSON.stringify(this.cart));
  }

  loadShoppingLists() {
    try {
      const saved = localStorage.getItem('shopping-lists');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  saveShoppingLists() {
    localStorage.setItem('shopping-lists', JSON.stringify(this.shoppingLists));
  }

  async loadProducts() {
    try {
      console.time('⚡ JSON laden');
      const response = await fetch('/products_grouped.json');
      const products = await response.json();
      console.timeEnd('⚡ JSON laden');
      products.forEach(product => {
        if (product.prices && product.prices.length > 0) {
          const minPrice = Math.min(...product.prices.map(p => p.prijs));
          product.prices.forEach((price, index) => {
            price.isCheapest = (price.prijs === minPrice);
            price.rank = index + 1; // Voeg rank toe
          });
        }
      });
      this.products = products;
      this.extractCategories();
      this.isLoading = false;
      console.log(`✅ Geladen: ${products.length} producten`);
    } catch (error) {
      console.error('Fout bij laden producten:', error);
      this.isLoading = false;
    }
  }

  extractCategories() {
    const categoryCount = new Map();
    this.products.forEach(product => {
      const cat = product.category;
      if (cat) {
        categoryCount.set(cat, (categoryCount.get(cat) || 0) + 1);
      }
    });

    const categoryIcons = {
      'Kerst': '🎄',
      'Aardappelen, Groente En Fruit': '🥔',
      'Verse Maaltijden En Gemak': '🍱',
      'Vlees, Vis En Vega': '🥩',
      'Brood En Gebak': '🍞',
      'Vleeswaren, Kaas En Tapas': '🧀',
      'Zuivel, Eieren, Boter': '🥛',
      'Koek, Snoep, Chocolade En Chips': '🍪',
      'Frisdrank En Sappen': '🥤',
      'Ontbijt, Broodbeleg En Bakproducten': '🥞',
      'Conserven, Soepen, Sauzen, Olien': '🥫',
      'Wereldkeukens, Kruiden, Pasta En Rijst': '🍝',
      'Bier En Wijn': '🍷',
      'Drogisterij En Baby': '🧴',
      'Huishouden En Dieren': '🧹',
      'Diepvries': '❄️',
      'Koffie, Thee En Cacao': '☕',
      'Non Food': '📦',
      'Speciale Voeding': '🌾'
    };

    this.categories = Array.from(categoryCount.entries())
      .map(([name, count]) => ({
        name: name,
        icon: categoryIcons[name] || '📦',
        count: count
      }))
      .sort((a, b) => b.count - a.count);
  }

  handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    this.searchQuery = query;

    clearTimeout(this.searchDebounceTimer);

    if (query.length < 2) {
      if (this.currentView === 'allproducts') {
        this.showAllProducts();
      } else if (this.currentView === 'search') {
        this.displayedProducts = [];
        this.currentView = 'home';
      }
      return;
    }

    this.searchDebounceTimer = setTimeout(() => {
      console.time('🔍 Zoeken');
      this.currentView = 'search';

      const results = this.products.filter(product => 
        product.name?.toLowerCase().includes(query)
      );

      
      this.displayedProducts = this.sortProductsBySearchRelevance(results, query);
      console.timeEnd('🔍 Zoeken');
    }, 300);
  }

  
  sortProductsBySearchRelevance(products, query) {
    const filtered = this.sortProducts(products, this.isAddingToList);

    
    const startsWithQuery = [];
    const containsQuery = [];

    filtered.forEach(product => {
      const name = product.name.toLowerCase();
      const queryWords = query.split(' ');
      const firstQueryWord = queryWords[0];

      
      const productFirstWord = name.split(' ')[0];

      if (productFirstWord.startsWith(firstQueryWord)) {
        startsWithQuery.push(product);
      } else {
        containsQuery.push(product);
      }
    });

    
    return [...startsWithQuery, ...containsQuery];
  }

  sortProducts(products, filterAllSupermarkets = false) {
    const REQUIRED_SUPERMARKETS = ['Jumbo', 'Albert Heijn', 'Plus', 'Dirk'];

    let results = [...products];

    if (filterAllSupermarkets) {
      results = results.filter(item => {
        const availableMarkets = item.prices.map(p => p.supermarkt);
        return REQUIRED_SUPERMARKETS.every(market => availableMarkets.includes(market));
      });
    }

    if (this.sortBy === 'alphabetical' || this.currentView === 'search') {
      results.sort((a, b) => a.name.localeCompare(b.name, 'nl'));
    } else if (this.sortBy === 'price-asc') {
      results.sort((a, b) => (a.prices[0]?.prijs || 0) - (b.prices[0]?.prijs || 0));
    } else if (this.sortBy === 'price-desc') {
      results.sort((a, b) => (b.prices[0]?.prijs || 0) - (a.prices[0]?.prijs || 0));
    }

    return results;
  }

  handleCategoryClick(category) {
    console.time('📂 Categorie laden');
    this.currentView = 'search';
    this.searchQuery = category.name;

    const results = this.products.filter(product => 
      product.category === category.name
    );

    this.displayedProducts = this.sortProducts(results, this.isAddingToList);
    console.timeEnd('📂 Categorie laden');
    window.scrollTo(0, 0);
  }

  handleProductClick(product, index) {
    this.selectedProduct = product;
    this.selectedProductIndex = index;
    this.currentView = 'product';
    window.scrollTo(0, 0);
  }

  handleBack() {
    if (this.currentView === 'product') {
      this.currentView = 'search';
      this.selectedProduct = null;
      this.selectedProductIndex = -1;
    } else if (this.currentView === 'listdetail') {
      this.currentView = 'shoppinglists';
      this.currentList = null;
      this.isAddingToList = false;
      this.selectedSupermarket = null;
    } else {
      this.currentView = 'home';
      this.searchQuery = '';
      this.displayedProducts = [];
      this.isAddingToList = false;
    }
    window.scrollTo(0, 0);
  }

  handleGoHome() {
    this.currentView = 'home';
    this.searchQuery = '';
    this.displayedProducts = [];
    this.selectedProduct = null;
    this.selectedProductIndex = -1;
    this.currentList = null;
    this.isAddingToList = false;
    this.selectedSupermarket = null;
    window.scrollTo(0, 0);
  }

  showAllProducts() {
    console.time('📦 Alle producten');
    this.currentView = 'allproducts';
    this.searchQuery = '';
    this.displayedProducts = this.sortProducts(this.products, this.isAddingToList);
    console.timeEnd('📦 Alle producten');
    window.scrollTo(0, 0);
  }

  showCart() {
    this.currentView = 'cart';
    this.isAddingToList = false;
    window.scrollTo(0, 0);
  }

  showScan() {
    this.currentView = 'scan';
    this.isAddingToList = false;
    window.scrollTo(0, 0);
  }

  showShoppingLists() {
    this.currentView = 'shoppinglists';
    this.isAddingToList = false;
    window.scrollTo(0, 0);
  }

  setSortBy(sortType) {
    this.sortBy = sortType;
    if (this.displayedProducts.length > 0) {
      const query = this.searchQuery.toLowerCase();
      if (query) {
        // Als er een search query is, hergebruik search relevance sorting
        this.displayedProducts = this.sortProductsBySearchRelevance(this.displayedProducts, query);
      } else {
        this.displayedProducts = this.sortProducts(this.displayedProducts, this.isAddingToList);
      }
    }
  }

  
  addToCart(product, e) {
    e.stopPropagation();
    this.cart = [...this.cart, {
      id: Date.now(),
      name: product.name,
      price: product.prices[0]?.prijs || 0,
      supermarket: product.prices[0]?.supermarkt || '',
      image: product.image
    }];
    this.saveCart();
    this.showNotification(`✅ ${product.name} toegevoegd aan winkelmandje!`);
  }

  removeFromCart(index) {
    this.cart = this.cart.filter((_, i) => i !== index);
    this.saveCart();
  }

  getCartTotal() {
    return this.cart.reduce((sum, item) => sum + item.price, 0);
  }

  createNewList() {
    this.showNewListDialog = true;
  }

  closeDialog() {
    this.showNewListDialog = false;
    this.showDeleteListDialog = false;
    this.listToDelete = null;
  }

  handleCreateList(e) {
    e.preventDefault();
    const input = this.shadowRoot.querySelector('#list-name-input');
    const name = input?.value.trim();

    if (name) {
      const newList = {
        id: Date.now(),
        name: name,
        items: [],
        selectedSupermarket: null,
        createdAt: new Date().toISOString()
      };

      this.shoppingLists = [...this.shoppingLists, newList];
      this.saveShoppingLists();
      this.showNewListDialog = false;

      this.currentList = newList;
      this.currentView = 'listdetail';
    }
  }

  
  confirmDeleteList(list, e) {
    e.stopPropagation();
    this.listToDelete = list;
    this.showDeleteListDialog = true;
  }

  deleteList() {
    if (!this.listToDelete) return;

    this.shoppingLists = this.shoppingLists.filter(l => l.id !== this.listToDelete.id);
    this.saveShoppingLists();
    this.showNotification(`🗑️ Lijst "${this.listToDelete.name}" verwijderd`);
    this.closeDialog();
  }

  viewListDetail(list) {
    this.currentList = list;
    this.selectedSupermarket = list.selectedSupermarket || null;
    this.currentView = 'listdetail';
    this.expandedListComparison = false;
    window.scrollTo(0, 0);
  }

  
  addToList(product, e) {
    e.stopPropagation();

    if (!this.currentList) {
      this.showNotification('⚠️ Selecteer eerst een lijst!');
      return;
    }

    const listIndex = this.shoppingLists.findIndex(l => l.id === this.currentList.id);

    if (listIndex >= 0) {
      const alreadyAdded = this.shoppingLists[listIndex].items.some(
        item => item.name === product.name
      );

      if (alreadyAdded) {
        this.showNotification('⚠️ Product staat al in de lijst!');
        return;
      }

      this.shoppingLists[listIndex].items.push({
        name: product.name,
        image: product.image,
        category: product.category,
        prices: product.prices
      });

      this.currentList = this.shoppingLists[listIndex];
      this.saveShoppingLists();
      this.requestUpdate();
      this.showNotification(`✅ ${product.name} toegevoegd aan lijst!`);
    }
  }

  removeFromList(itemIndex) {
    if (!this.currentList) return;

    const listIndex = this.shoppingLists.findIndex(l => l.id === this.currentList.id);

    if (listIndex >= 0) {
      this.shoppingLists[listIndex].items.splice(itemIndex, 1);
      this.currentList = this.shoppingLists[listIndex];
      this.saveShoppingLists();
      this.requestUpdate();
    }
  }

  selectSupermarket(supermarkt) {
    if (!this.currentList) return;

    const listIndex = this.shoppingLists.findIndex(l => l.id === this.currentList.id);

    if (listIndex >= 0) {
      this.shoppingLists[listIndex].selectedSupermarket = supermarkt;
      this.currentList = this.shoppingLists[listIndex];
      this.selectedSupermarket = supermarkt;
      this.saveShoppingLists();
      this.requestUpdate();
    }
  }

  
  addListToCart() {
    if (!this.currentList || !this.selectedSupermarket) {
      this.showNotification('⚠️ Selecteer eerst een supermarkt!');
      return;
    }

    let addedCount = 0;

    this.currentList.items.forEach(item => {
      const price = item.prices.find(p => p.supermarkt === this.selectedSupermarket);

      if (price) {
        this.cart = [...this.cart, {
          id: Date.now() + addedCount,
          name: item.name,
          price: price.prijs,
          supermarket: this.selectedSupermarket,
          image: item.image
        }];
        addedCount++;
      }
    });

    this.saveCart();
    this.showNotification(`✅ ${addedCount} producten van ${this.selectedSupermarket} toegevoegd!`);
    this.requestUpdate();
  }

  
  addListToCartFromOverview(list, e) {
    e.stopPropagation();

    const bestDeal = this.getBestDeal(list);
    if (!bestDeal || !bestDeal.hasAll) {
      this.showNotification('⚠️ Niet alle producten beschikbaar, open de lijst om een supermarkt te kiezen');
      return;
    }

    let addedCount = 0;
    list.items.forEach(item => {
      const price = item.prices.find(p => p.supermarkt === bestDeal.supermarkt);
      if (price) {
        this.cart = [...this.cart, {
          id: Date.now() + addedCount,
          name: item.name,
          price: price.prijs,
          supermarket: bestDeal.supermarkt,
          image: item.image
        }];
        addedCount++;
      }
    });

    this.saveCart();
    this.showNotification(`✅ ${addedCount} producten van ${bestDeal.supermarkt} toegevoegd!`);
    this.requestUpdate();
  }

  calculateSupermarketTotals(list) {
    const REQUIRED_SUPERMARKETS = ['Jumbo', 'Albert Heijn', 'Plus', 'Dirk'];
    const totals = new Map();
    const availability = new Map();

    REQUIRED_SUPERMARKETS.forEach(market => {
      totals.set(market, 0);
      availability.set(market, { available: 0, total: list.items.length });
    });

    list.items.forEach(item => {
      item.prices.forEach(price => {
        if (REQUIRED_SUPERMARKETS.includes(price.supermarkt)) {
          const current = totals.get(price.supermarkt) || 0;
          totals.set(price.supermarkt, current + price.prijs);

          const avail = availability.get(price.supermarkt);
          avail.available++;
        }
      });
    });

    return Array.from(totals.entries())
      .map(([supermarkt, total]) => ({
        supermarkt,
        total,
        available: availability.get(supermarkt).available,
        totalItems: availability.get(supermarkt).total,
        hasAll: availability.get(supermarkt).available === availability.get(supermarkt).total
      }))
      .sort((a, b) => {
        if (a.hasAll && !b.hasAll) return -1;
        if (!a.hasAll && b.hasAll) return 1;
        return a.total - b.total;
      });
  }

  getBestDeal(list) {
    
    if (!list.items || list.items.length === 0) {
      return null;
    }
    const totals = this.calculateSupermarketTotals(list);
    return totals.length > 0 ? totals[0] : null;
  }

  getWorstDeal(list) {
    if (!list.items || list.items.length === 0) {
      return null;
    }
    const totals = this.calculateSupermarketTotals(list);
    const onlyComplete = totals.filter(t => t.hasAll);
    return onlyComplete.length > 0 ? onlyComplete[onlyComplete.length - 1] : null;
  }

  startAddingProducts() {
    this.isAddingToList = true;
    this.showAllProducts();
  }

  doneAddingProducts() {
    this.isAddingToList = false;
    this.viewListDetail(this.currentList);
  }

  getSupermarketDetails(list, supermarkt) {
    return list.items.map(item => {
      const price = item.prices.find(p => p.supermarkt === supermarkt);
      return {
        name: item.name,
        price: price ? price.prijs : null
      };
    });
  }

  render() {
    if (this.isLoading) {
      return html`
        <div class="loading">
          <div class="loading-skeleton">
            <div class="skeleton-item skeleton-card"></div>
            <div class="skeleton-item skeleton-card"></div>
            <div class="skeleton-item skeleton-card"></div>
          </div>
          <p>Producten laden...</p>
        </div>
      `;
    }

    return html`
      ${this.notification ? html`
        <div class="notification">${this.notification.message}</div>
      ` : ''}
      ${this.renderHeader()}
      ${this.renderContent()}
      ${this.renderBottomNav()}
      ${this.showNewListDialog ? this.renderNewListDialog() : ''}
      ${this.showDeleteListDialog ? this.renderDeleteListDialog() : ''}
      ${this.showPrivacyDialog ? this.renderPrivacyDialog() : ''}
    `;
  }

  

  renderHeader() {
    
    if (this.currentView === 'product' && this.selectedProduct) {
      return html`
        <div class="header">
          <div class="header-content">
            <div class="header-with-back">
              <button class="back-button" @click=${this.handleBack}>←</button>
              <div class="header-title">${this.selectedProduct.category || 'Product'}</div>
              <button class="home-button" @click=${this.handleGoHome}>🏠</button>
            </div>
          </div>
        </div>
      `;
    }

    const title = this.currentView === 'cart' ? 'Winkelmandje' :
                  this.currentView === 'scan' ? 'Bon Scannen' :
                  this.currentView === 'shoppinglists' ? 'Boodschappenlijsten' :
                  this.currentView === 'listdetail' ? (this.currentList?.name || 'Lijst') :
                  this.currentView === 'allproducts' ? 'Alle Producten' :
                  'Zoek een product';

    
    const showBackButton = this.currentView !== 'home' && this.currentView !== 'cart' && this.currentView !== 'scan' && this.currentView !== 'shoppinglists';
    const showHomeButton = this.currentView !== 'home';

    return html`
      <div class="header">
        <div class="header-content">
          ${showBackButton ? html`
            <div class="header-with-back">
              <button class="back-button" @click=${this.handleBack}>←</button>
              <div class="header-title">${title}</div>
              ${showHomeButton ? html`<button class="home-button" @click=${this.handleGoHome}>🏠</button>` : ''}
            </div>
          ` : html`
            <div class="header-with-back">
              <div class="header-title">${title}</div>
              ${showHomeButton ? html`<button class="home-button" @click=${this.handleGoHome}>🏠</button>` : ''}
            </div>
          `}
          ${this.currentView !== 'cart' && this.currentView !== 'scan' && this.currentView !== 'shoppinglists' && this.currentView !== 'listdetail' ? html`
            <div class="search-container">
              <span class="search-icon">🔍</span>
              <input 
                type="text" 
                class="search-box" 
                placeholder="Zoek naar uw product"
                @input=${this.handleSearch}
                .value=${this.searchQuery}
              />
              <button class="filter-button">☰</button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  renderContent() {
    if (this.currentView === 'cart') return this.renderCart();
    if (this.currentView === 'scan') return this.renderScan();
    if (this.currentView === 'shoppinglists') return this.renderShoppingLists();
    if (this.currentView === 'listdetail') return this.renderListDetail();
    if (this.currentView === 'product') return this.renderProductDetail();
    if (this.currentView === 'search' || this.currentView === 'allproducts') return this.renderSearchResults();
    return this.renderHome();
  }

  renderPrivacyInfo() {
    return html`
      <div class="privacy-banner" @click=${() => this.showPrivacyDialog = true}>
        <span>🔒 Al je data wordt lokaal opgeslagen</span>
        <button>ℹ️</button>
      </div>
    `;
  }

  renderPrivacyDialog() {
    return html`
      <div class="dialog-overlay" @click=${(e) => { if (e.target.classList.contains('dialog-overlay')) this.showPrivacyDialog = false; }}>
        <div class="dialog">
          <div class="dialog-title">🔒 Privacy & Data</div>
          <div style="margin-bottom: 16px; color: #666; font-size: 14px; line-height: 1.6;">
            <p><strong>Wat slaan we op?</strong></p>
            <ul style="margin-left: 20px; margin-top: 8px;">
              <li>Je boodschappenlijsten</li>
              <li>Je winkelmandje</li>
              <li>Je zoekgeschiedenis (lokaal)</li>
            </ul>
            <p style="margin-top: 12px;"><strong>Waar wordt dit opgeslagen?</strong></p>
            <p>Al je data blijft in jouw browser (LocalStorage). We delen NIETS met derden.</p>
            
            <p style="margin-top: 12px; font-size: 12px; font-style: italic; color: #999;">
              Deze app is gebouwd met respect voor jouw privacy - geen tracking, geen advertenties.
            </p>
          </div>
          <button class="dialog-btn primary" @click=${() => this.showPrivacyDialog = false}>Begrepen!</button>
        </div>
      </div>
    `;
  }

  renderUserStory() {
    const totalSavings = this.calculateTotalSavings();
    const favoriteMarket = this.getMostUsedSupermarket();
    const totalLists = this.shoppingLists.length;
    const totalListItems = this.shoppingLists.reduce((sum, list) => sum + list.items.length, 0);
    
    // Toon alleen als er activiteit is
    if (totalLists === 0 && this.cart.length === 0) {
      return html``;
    }
    
    return html`
      <div class="user-story-card">
        <h3>📈 Jouw Activiteit</h3>
        <div class="stat-grid">
          <div class="stat-item">
            <div class="stat-value">${totalLists}</div>
            <div class="stat-label">Boodschappenlijsten</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${totalListItems}</div>
            <div class="stat-label">Items in lijsten</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${this.cart.length}</div>
            <div class="stat-label">Items in mandje</div>
          </div>
        </div>
        ${totalSavings > 0 ? html`
          <p class="story-text">
            💡 <strong>Je bespaart:</strong> Door prijzen te vergelijken, bespaar je 
            <strong>€${totalSavings.toFixed(2)}</strong> op je lijsten!
            ${favoriteMarket ? html`<br>Je koopt het vaakst bij <strong>${favoriteMarket}</strong>.` : ''}
          </p>
        ` : ''}
      </div>
    `;
  }


  calculateTotalSavings() {
    return this.shoppingLists.reduce((total, list) => {
      const bestDeal = this.getBestDeal(list);
      const worstDeal = this.getWorstDeal(list);
      if (bestDeal && worstDeal && bestDeal.hasAll && worstDeal.hasAll) {
        return total + (worstDeal.total - bestDeal.total);
      }
      return total;
    }, 0);
  }

  getMostUsedSupermarket() {
    const counts = {};
    this.shoppingLists.forEach(list => {
      if (list.selectedSupermarket) {
        counts[list.selectedSupermarket] = (counts[list.selectedSupermarket] || 0) + 1;
      }
    });
    return Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
  }



  renderHome() {
    return html`
      <div class="main-content">
        ${this.renderPrivacyInfo()}
        ${this.renderDataInfo()}
        
        <div class="section-header">
          <div class="section-title">Per categorie</div>
        </div>
        <div class="categories-grid">
          ${this.categories.map(cat => html`
            <div class="category-card" @click=${() => this.handleCategoryClick(cat)}>
              <div class="category-image">${cat.icon}</div>
              <div class="category-name">${cat.name}</div>
            </div>
          `)}
        </div>
      </div>
    `;
  }


  // In supermarkt-app.js - voeg toe aan render()
  renderDataInfo() {
    return html`
      <div class="data-info-card">
        <h3>📊 Over deze prijzen</h3>
        <div class="data-details">
          <p><strong>Supermarkten:</strong> Jumbo, Albert Heijn, Plus, Dirk</p>
          <p><strong>Laatste update:</strong> ${new Date().toLocaleDateString('nl-NL')}</p>
          <p><strong>Aantal producten:</strong> ${this.products.length}</p>
          <p class="data-disclaimer">
            ⚠️ Prijzen kunnen afwijken van de actuele prijzen in de winkel. 
            Gebruik deze app als richtlijn voor prijsvergelijking.
          </p>
        </div>
      </div>
    `;
  }

  renderAlgorithmFAQ() {
    return html`
      <details class="algorithm-faq">
        <summary>❓ Veelgestelde vragen over prijsvergelijking</summary>
        <div class="faq-content">
          <div class="faq-item">
            <strong>Q: Hoe berekent de app welke supermarkt goedkoopst is?</strong>
            <p>
              We tellen alle prijzen van producten in je lijst bij elkaar op, per supermarkt. 
              De supermarkt met het <strong>laagste totaal</strong> staat bovenaan.
            </p>
            <p style="margin-top: 6px; font-size: 12px; color: #999;">
              💡 <strong>Simpel voorbeeld:</strong> Als je appels (€2 bij Jumbo, €1,50 bij AH) 
              en melk (€1 bij Jumbo, €1,20 bij AH) op je lijst hebt, dan is AH goedkoopst 
              (€2,70 totaal vs €3 bij Jumbo).
            </p>
          </div>
          
          <div class="faq-item">
            <strong>Q: Zijn dit de échte prijzen in de winkel?</strong>
            <p>De prijzen zijn gebaseerd op onze dataset, maar kunnen afwijken. Check altijd de actuele prijs in de winkel.</p>
          </div>
          
          <div class="faq-item">
            <strong>Q: Waarom staat mijn favoriete supermarkt niet op 1?</strong>
            <p>We sorteren op laagste totaalprijs. Klik op de supermarkt om details te zien, en kies wat voor jou het beste werkt!</p>
          </div>
          
          <div class="faq-item">
            <strong>Q: Houdt de app mijn boodschappen bij?</strong>
            <p>Nee! Alles blijft lokaal in je browser. We sturen niets naar servers.</p>
          </div>
        </div>
      </details>
    `;
  }



  renderShoppingLists() {
    return html`
      <div class="main-content">
        ${this.renderUserStory()}
        ${this.renderAlgorithmFAQ()}
        <div class="shopping-lists-header">
          <div class="section-title">🛒 Beste Deals Vandaag:</div>
          <button class="add-list-btn" @click=${this.createNewList}>+</button>
        </div>

        ${this.shoppingLists.length === 0 ? html`
          <div class="cart-empty">
            <div class="cart-empty-icon">📝</div>
            <h3>Geen boodschappenlijsten</h3>
            <p>Maak een nieuwe lijst om te beginnen!</p>
          </div>
        ` : html`
          ${this.shoppingLists.map(list => {
            const bestDeal = this.getBestDeal(list);
            const worstDeal = this.getWorstDeal(list);

            return html`
              <div class="list-card">
                <div class="list-card-header">
                  <div class="list-name">${list.name}</div>
                  <button class="delete-list-btn" @click=${(e) => this.confirmDeleteList(list, e)}>
                    🗑️ Verwijder
                  </button>
                </div>

                ${list.items.length > 0 ? html`
                  <div class="list-items">
${list.items.slice(0, 5).map(item => item.name).join('\n')}${list.items.length > 5 ? '\n...' : ''}
                  </div>

                  ${bestDeal ? html`
                    ${!bestDeal.hasAll ? html`
                      <div class="availability-warning">
                        ⚠️ ${bestDeal.supermarkt} heeft niet alle producten (${bestDeal.available}/${bestDeal.totalItems})
                      </div>
                    ` : ''}

                    <div class="best-deal" @click=${() => this.viewListDetail(list)}>
                      <div class="best-deal-row">
                        <div class="best-deal-supermarket">${bestDeal.supermarkt}</div>
                        <div class="best-deal-price">€${bestDeal.total.toFixed(2)}</div>
                      </div>
                      ${worstDeal && worstDeal.total > bestDeal.total ? html`
                        <div class="best-deal-row">
                          <div></div>
                          <div class="original-price">€${worstDeal.total.toFixed(2)}</div>
                        </div>
                      ` : ''}
                    </div>

                    <div style="display: flex; gap: 8px; margin-top: 8px;">
                      <button class="view-more-btn" @click=${() => this.viewListDetail(list)} style="flex: 1;">
                        Details →
                      </button>
                      ${bestDeal.hasAll ? html`
                        <button class="add-to-cart-from-list-btn" @click=${(e) => this.addListToCartFromOverview(list, e)} style="flex: 1;">
                          🛒 Lijst toevoegen aan winkelmandje
                        </button>
                      ` : ''}
                    </div>
                  ` : html`
                    
                    <div class="best-deal neutral">
                      <div class="best-deal-row">
                        <div class="best-deal-supermarket">Geen producten</div>
                        <div class="best-deal-price">€0.00</div>
                      </div>
                    </div>
                  `}
                ` : html`
                  <p style="color: #666; font-size: 14px; margin-bottom: 12px;">
                    Nog geen producten toegevoegd
                  </p>
                  <button class="add-products-btn" @click=${() => {
                    this.currentList = list;
                    this.startAddingProducts();
                  }}>
                    Producten Toevoegen
                  </button>
                `}
              </div>
            `;
          })}
        `}
        ${this.renderDataControl()}
      </div>
    `;
  }

  renderDataControl() {
    return html`
      <div class="data-control-section">
        <details>
          <summary>🔧 Databeheer</summary>
          <div style="padding: 12px 0;">
            <p style="font-size: 13px; color: #666; margin-bottom: 12px; line-height: 1.6;">
              Al je data wordt lokaal opgeslagen in je browser. 
              Je kunt alles verwijderen wanneer je wilt.
            </p>
            <button 
              class="reset-data-btn" 
              @click=${this.confirmResetAllData}
            >
              🗑️ Verwijder alle data
            </button>
          </div>
        </details>
      </div>
    `;
  }

  confirmResetAllData() {
    if (confirm('Weet je zeker dat je alle lijsten en winkelmandje wilt verwijderen? Dit kan niet ongedaan worden gemaakt.')) {
      this.resetAllData();
    }
  }

  resetAllData() {
    localStorage.removeItem('shopping-cart');
    localStorage.removeItem('shopping-lists');
    this.cart = [];
    this.shoppingLists = [];
    this.currentList = null;
    this.showNotification('✅ Alle data verwijderd!');
    this.requestUpdate();
  }


  renderListDetail() {
    if (!this.currentList) return html``;

    const totals = this.calculateSupermarketTotals(this.currentList);

    return html`
      <div class="main-content">
        
        ${this.selectedSupermarket ? html`
          <div class="selected-market-indicator">
            ✓ Geselecteerd: ${this.selectedSupermarket}
          </div>
        ` : ''}

        <div class="list-detail-products">
          <h3 style="margin-bottom: 16px; font-size: 16px; color: #333;">Producten in lijst</h3>

          ${this.currentList.items.length === 0 ? html`
            <p style="text-align: center; color: #666; padding: 20px;">
              Nog geen producten in deze lijst
            </p>
          ` : html`
            ${this.currentList.items.map((item, index) => html`
              <div class="list-product-item">
                <img 
                  src="${item.image}" 
                  alt="${item.name}"
                  class="list-product-image"
                  loading="lazy"
                  @error=${(e) => e.target.style.display = 'none'}
                />
                <div class="list-product-info">
                  <div class="list-product-name">${item.name}</div>
                  <div class="list-product-price">
                    ${this.selectedSupermarket ? 
                      (item.prices.find(p => p.supermarkt === this.selectedSupermarket) ? 
                        `€${item.prices.find(p => p.supermarkt === this.selectedSupermarket).prijs.toFixed(2)}` : 
                        'Niet beschikbaar') :
                      `Vanaf €${item.prices[0]?.prijs.toFixed(2) || '0.00'}`
                    }
                  </div>
                </div>
                <button class="remove-from-list-btn" @click=${() => this.removeFromList(index)}>
                  ×
                </button>
              </div>
            `)}
          `}
        </div>

        ${totals.length > 0 ? html`
          <div class="supermarket-comparison">
            <div class="comparison-header">
              <div class="comparison-title">Kies je supermarkt</div>
          

            <button class="info-btn" @click=${() => this.showSortExplanation = !this.showSortExplanation}>
              ℹ️ Waarom deze volgorde?
            </button>
          </div>
          
          ${this.showSortExplanation ? html`
            <div class="sort-explanation">
              <p><strong>Hoe sorteren we?</strong></p>
              <p>We tonen eerst de <strong>goedkoopste</strong> supermarkt die <strong>alle producten</strong> heeft.</p>
              <p>💡 <strong>Let op:</strong> Dit houdt geen rekening met:</p>
              <ul>
                <li>📍 Afstand tot de winkel</li>
                <li>♿ Bereikbaarheid voor mensen met beperking</li>
                <li>🌱 Duurzaamheid van producten</li>
                <li>🏪 Voorkeur voor lokale winkels</li>
              </ul>
              <p style="font-size: 12px; color: #666; margin-top: 12px;">
                Kies de supermarkt die het beste bij <strong>jouw situatie</strong> past!
              </p>
            </div>
          ` : ''}
            
            ${totals.map((item, index) => {
              const details = this.getSupermarketDetails(this.currentList, item.supermarkt);
              const isExpanded = this.expandedListComparison === item.supermarkt;
              const isSelected = this.selectedSupermarket === item.supermarkt;

              return html`
                <div>
                  <div class="comparison-item ${index === 0 && item.hasAll ? 'best' : ''} ${!item.hasAll ? 'unavailable' : ''} ${isSelected ? 'selected' : ''}"
                       @click=${() => {
                         this.expandedListComparison = isExpanded ? false : item.supermarkt;
                         this.requestUpdate();
                       }}>
                    <div class="comparison-left">
                      <div class="comparison-supermarket">
                        ${item.supermarkt}
                        ${index === 0 && item.hasAll ? html`<span>⭐</span>` : ''}
                        ${!item.hasAll ? html`<span class="unavailable-badge">${item.available}/${item.totalItems}</span>` : ''}
                      </div>
                      <div class="comparison-price">
                        €${item.total.toFixed(2)}
                        ${isExpanded ? ' ▲' : ' ▼'}
                      </div>
                    </div>
                    ${item.hasAll ? html`
                      <button class="choose-btn" @click=${(e) => {
                        e.stopPropagation();
                        this.selectSupermarket(item.supermarkt);
                      }}>
                        ${isSelected ? '✓ Gekozen' : 'Kies'}
                      </button>
                    ` : ''}
                  </div>

                  ${isExpanded ? html`
                    <div class="comparison-details">
                      ${details.map(detail => html`
                        <div class="comparison-product-line">
                          <span>${detail.name}</span>
                          <span style="color: ${detail.price ? '#2E8B57' : '#e74c3c'}; font-weight: 600;">
                            ${detail.price ? `€${detail.price.toFixed(2)}` : 'Niet beschikbaar'}
                          </span>
                        </div>
                      `)}
                    </div>
                  ` : ''}
                </div>
              `;
            })}
          </div>
        ` : ''}

        ${this.selectedSupermarket ? html`
          <button class="add-to-cart-list-btn" @click=${this.addListToCart}>
            🛒 Hele lijst toevoegen aan winkelmandje
          </button>
        ` : ''}

        <button class="add-products-btn" @click=${this.startAddingProducts}>
          + Meer Producten Toevoegen
        </button>
      </div>
    `;
  }

  renderSearchResults() {
    if (this.displayedProducts.length === 0) {
      return html`
        <div class="main-content">
          <div class="no-results">
            <p>Geen producten gevonden</p>
          </div>
        </div>
      `;
    }

    return html`
      <div class="main-content">
        ${this.isAddingToList ? html`
          <div class="adding-mode-indicator">
            <span>➕ Producten toevoegen aan: ${this.currentList?.name}</span>
            <button class="done-adding-btn" @click=${this.doneAddingProducts}>
              Klaar
            </button>
          </div>
        ` : ''}

        ${this.currentView !== 'search' ? html`
          <div class="sort-controls">
            <button class="sort-button ${this.sortBy === 'alphabetical' ? 'active' : ''}" 
                    @click=${() => this.setSortBy('alphabetical')}>
              A-Z
            </button>
            <button class="sort-button ${this.sortBy === 'price-asc' ? 'active' : ''}" 
                    @click=${() => this.setSortBy('price-asc')}>
              Prijs ↑
            </button>
            <button class="sort-button ${this.sortBy === 'price-desc' ? 'active' : ''}" 
                    @click=${() => this.setSortBy('price-desc')}>
              Prijs ↓
            </button>
          </div>
        ` : ''}

        <div class="results-header">
          ${this.displayedProducts.length} resultaten${this.isAddingToList ? ' (alleen producten in alle supermarkten)' : ''}
        </div>
        <div class="product-grid-container">
          <div class="product-grid">
            ${this.displayedProducts.map((product, index) => html`
              <div class="product-card" @click=${() => this.handleProductClick(product, index)}>
                ${this.isAddingToList ? html`
                  <button class="add-to-list-btn" @click=${(e) => this.addToList(product, e)}>+</button>
                ` : html`
                  <button class="add-to-cart-btn" @click=${(e) => this.addToCart(product, e)}>+</button>
                `}
                <img 
                  src="${product.image || ''}" 
                  alt="${product.name}"
                  class="product-image-small"
                  loading="lazy"
                  @error=${(e) => e.target.style.display = 'none'}
                />
                <div class="product-name">${product.name}</div>
                <div class="product-price-from">Vanaf:</div>
                <div class="best-price">⭐ €${product.prices[0]?.prijs.toFixed(2) || '0.00'}</div>              </div>
            `)}
          </div>
        </div>
      </div>
    `;
  }

  
  renderProductDetail() {
    if (!this.selectedProduct) return html``;

    const alternatives = this.products
      .filter(p => p.category === this.selectedProduct.category && p.name !== this.selectedProduct.name)
      .slice(0, 4);

    return html`
      <div class="main-content">
        <div class="product-detail">
          <div class="product-detail-header">
            <div class="product-detail-name">${this.selectedProduct.name}</div>
          </div>

          
          <div class="product-detail-actions">
            ${this.isAddingToList ? html`
              <button class="product-action-btn list" @click=${() => {
                this.addToList(this.selectedProduct, { stopPropagation: () => {} });
              }}>
                ➕ Toevoegen aan lijst
              </button>
            ` : html`
              <button class="product-action-btn cart" @click=${() => {
                this.addToCart(this.selectedProduct, { stopPropagation: () => {} });
              }}>
                🛒 Toevoegen aan mandje
              </button>
            `}
          </div>

          <img 
            src="${this.selectedProduct.image || ''}" 
            alt="${this.selectedProduct.name}"
            class="product-image-large"
            loading="lazy"
            @error=${(e) => e.target.style.display = 'none'}
          />
          <div class="price-list">
            ${this.selectedProduct.prices.map((price) => html`
              <div class="price-item ${price.isCheapest ? 'best' : ''}">
                <div class="price-rank">${price.rank}</div>
                <div class="price-info">
                  <span class="supermarket-name">${price.supermarkt}</span>
                  ${price.isCheapest ? html`<span class="star-icon">⭐</span>` : ''}
                </div>
                <div class="price-value">€${price.prijs.toFixed(2)}</div>
              </div>
            `)}
          </div>
        </div>

        <div class="map-container">
          <img 
            src="/map-image.jpg" 
            alt="Kaart met supermarkt locaties"
            class="map-image"
            @error=${(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">📍 Kaart niet gevonden</div>';
            }}
          />
        </div>

        ${alternatives.length > 0 ? html`
          <div class="alternatives">
            <div class="alternatives-title">Alternatieve opties</div>
            <div class="alternatives-grid">
              ${alternatives.map((alt, index) => html`
                <div class="alternative-item" @click=${() => this.handleProductClick(alt, index)}>
                  <img 
                    src="${alt.image || ''}" 
                    alt="${alt.name}"
                    class="alternative-image"
                    loading="lazy"
                    @error=${(e) => e.target.style.display = 'none'}
                  />
                  <div class="alternative-name">${alt.name}</div>
                </div>
              `)}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  renderCart() {
    if (this.cart.length === 0) {
      return html`
        <div class="main-content">
          <div class="cart-empty">
            <div class="cart-empty-icon">🛒</div>
            <h3>Je winkelmandje is leeg</h3>
            <p>Voeg producten toe om te beginnen!</p>
          </div>
        </div>
      `;
    }

    return html`
      <div class="main-content">
        ${this.cart.map((item, index) => html`
          <div class="cart-item">
            <img src="${item.image}" class="cart-item-image" loading="lazy" @error=${(e) => e.target.style.display = 'none'} />
            <div class="cart-item-details">
              <div class="cart-item-name">${item.name}</div>
              <div style="font-size: 13px; color: #666; margin: 4px 0;">${item.supermarket}</div>
              <div class="cart-item-price">€${item.price.toFixed(2)}</div>
            </div>
            <button class="remove-btn" @click=${() => this.removeFromCart(index)}>×</button>
          </div>
        `)}

        <div class="cart-total">
          <div class="cart-total-label">Totaal</div>
          <div class="cart-total-amount">€${this.getCartTotal().toFixed(2)}</div>
        </div>
      </div>
    `;
  }

  renderScan() {
    return html`
      <div class="main-content">
        <div style="text-align: center; padding: 60px 20px;">
          <div style="font-size: 80px; margin-bottom: 20px;">📷</div>
          <h2>Bon Scannen</h2>
          <p style="color: #666; margin-top: 12px;">
            Scan je kassabon om automatisch producten te vergelijken
          </p>
          <button style="margin-top: 32px; padding: 16px 32px; background: #2E8B57; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 700; cursor: pointer;">
            Camera Openen
          </button>
        </div>
      </div>
    `;
  }

  renderNewListDialog() {
    return html`
      <div class="dialog-overlay" @click=${(e) => {
        if (e.target.classList.contains('dialog-overlay')) {
          this.closeDialog();
        }
      }}>
        <div class="dialog">
          <div class="dialog-title">Nieuwe Boodschappenlijst</div>
          <form @submit=${this.handleCreateList}>
            <input 
              type="text" 
              id="list-name-input"
              class="dialog-input" 
              placeholder="Naam van de lijst..."
              autofocus
            />
            <div class="dialog-buttons">
              <button type="button" class="dialog-btn secondary" @click=${this.closeDialog}>
                Annuleren
              </button>
              <button type="submit" class="dialog-btn primary">
                Aanmaken
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  
  renderDeleteListDialog() {
    return html`
      <div class="dialog-overlay" @click=${(e) => {
        if (e.target.classList.contains('dialog-overlay')) {
          this.closeDialog();
        }
      }}>
        <div class="dialog">
          <div class="dialog-title">Lijst verwijderen?</div>
          <p style="margin-bottom: 20px; color: #666;">
            Weet je zeker dat je "${this.listToDelete?.name}" wilt verwijderen? 
            Dit kan niet ongedaan worden gemaakt.
          </p>
          <div class="dialog-buttons">
            <button type="button" class="dialog-btn secondary" @click=${this.closeDialog}>
              Nee, behouden
            </button>
            <button type="button" class="dialog-btn danger" @click=${this.deleteList}>
              Ja, verwijderen
            </button>
          </div>
        </div>
      </div>
    `;
  }

  
  renderBottomNav() {
    return html`
      <div class="bottom-nav">
        <button class="nav-item ${this.currentView === 'home' || this.currentView === 'allproducts' || this.currentView === 'search' ? 'active' : ''}" 
                @click=${this.showAllProducts}>
          <div class="nav-icon">🏪</div>
          <div class="nav-label">Producten</div>
        </button>

        <button class="nav-item ${this.currentView === 'shoppinglists' || this.currentView === 'listdetail' ? 'active' : ''}" 
                @click=${this.showShoppingLists}>
          <div class="nav-icon">📝</div>
          <div class="nav-label">Lijsten</div>
        </button>

        <button class="nav-item ${this.currentView === 'cart' ? 'active' : ''}" 
                @click=${this.showCart}>
          <div class="nav-icon">
            🛒
            ${this.cart.length > 0 ? html`<span class="cart-badge">${this.cart.length}</span>` : ''}
          </div>
          <div class="nav-label">Mandje</div>
        </button>

        <button class="nav-item ${this.currentView === 'scan' ? 'active' : ''}" 
                @click=${this.showScan}>
          <div class="nav-icon">📷</div>
          <div class="nav-label">Scannen</div>
        </button>
      </div>
    `;
  }
}

customElements.define('supermarkt-app', SupermarktApp);
