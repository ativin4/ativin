# Building Accessible and High-Performance Frontend Components: A Comprehensive Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Essential Component Patterns](#essential-component-patterns)
3. [Accessibility Deep Dive](#accessibility-deep-dive)
4. [Performance Optimization](#performance-optimization)
5. [Advanced Component Architectures](#advanced-component-architectures)
6. [Security Considerations](#security-considerations)
7. [Real-World Case Studies](#real-world-case-studies)
8. [Testing and Quality Assurance](#testing-and-quality-assurance)
9. [Production Deployment Strategies](#production-deployment-strategies)
10. [Monitoring and Maintenance](#monitoring-and-maintenance)
11. [Tools and Resources](#tools-and-resources)

---

## Introduction

Modern frontend development requires balancing user experience, accessibility, performance, and maintainability. This comprehensive guide covers every aspect of building production-ready components that work for all users across all devices and browsers.

**What you'll learn:**
- Battle-tested component patterns
- Accessibility implementation strategies
- Performance optimization techniques
- Security best practices
- Real-world problem solving
- Testing and deployment strategies

---

## Essential Component Patterns

### Button Components

The foundation of interactive interfaces. Every button must handle multiple interaction methods and states.

```html
<!-- Basic semantic button -->
<button type="button" class="btn btn-primary" onclick="handleClick()">
  Save Changes
</button>

<!-- Button with loading state -->
<button type="button" class="btn btn-primary" disabled aria-describedby="loading-text">
  <span class="spinner" aria-hidden="true"></span>
  <span id="loading-text">Saving...</span>
</button>

<!-- Icon button -->
<button type="button" class="btn btn-icon" aria-label="Close dialog">
  <svg aria-hidden="true" class="icon">
    <use href="#close-icon"></use>
  </svg>
</button>
```

**Implementation considerations:**
- Use `<button>` for actions, `<a>` for navigation
- Provide clear labels and feedback
- Handle disabled states appropriately
- Support keyboard activation (Enter/Space)

### Form Components

Forms are the primary way users input data. They must be accessible, validatable, and user-friendly.

```html
<form novalidate>
  <!-- Text input with validation -->
  <div class="form-group">
    <label for="email">Email Address</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      required 
      aria-describedby="email-error"
      class="form-control"
    >
    <div id="email-error" class="error-message" role="alert" aria-live="polite"></div>
  </div>

  <!-- Select dropdown -->
  <div class="form-group">
    <label for="country">Country</label>
    <select id="country" name="country" required>
      <option value="">Select a country</option>
      <option value="US">United States</option>
      <option value="UK">United Kingdom</option>
      <option value="CA">Canada</option>
    </select>
  </div>

  <!-- Checkbox with description -->
  <div class="form-group">
    <input type="checkbox" id="newsletter" name="newsletter">
    <label for="newsletter">
      Subscribe to newsletter
      <span class="description">Get weekly updates about new features</span>
    </label>
  </div>
</form>
```

### Modal Dialogs

Modals interrupt the user's workflow and must be implemented carefully to maintain accessibility and user experience.

```html
<div class="modal-backdrop" onclick="closeModal()">
  <div 
    class="modal-dialog" 
    role="dialog" 
    aria-modal="true" 
    aria-labelledby="modal-title"
    onclick="event.stopPropagation()"
  >
    <div class="modal-header">
      <h2 id="modal-title">Confirm Action</h2>
      <button type="button" class="close-button" onclick="closeModal()" aria-label="Close">
        ×
      </button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete this item?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
      <button type="button" class="btn btn-danger" onclick="confirmDelete()">Delete</button>
    </div>
  </div>
</div>
```

**Modal implementation:**
```javascript
class ModalManager {
  constructor() {
    this.previousFocus = null;
    this.isOpen = false;
  }

  open(modalId) {
    this.previousFocus = document.activeElement;
    const modal = document.getElementById(modalId);
    
    // Show modal
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
    
    // Focus first focusable element
    const firstFocusable = modal.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
      firstFocusable.focus();
    }
    
    // Trap focus
    this.trapFocus(modal);
    this.isOpen = true;
    
    // Listen for escape key
    document.addEventListener('keydown', this.handleEscape.bind(this));
  }

  close() {
    if (!this.isOpen) return;
    
    document.body.classList.remove('modal-open');
    document.querySelector('.modal-backdrop').style.display = 'none';
    
    // Return focus
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
    
    this.isOpen = false;
    document.removeEventListener('keydown', this.handleEscape.bind(this));
  }

  trapFocus(modal) {
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }

  handleEscape(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }
}
```

### Data Tables

Tables display structured data and must be accessible to screen readers while performant for large datasets.

```html
<table class="data-table" role="table">
  <caption>Employee Sales Report - Q1 2024</caption>
  <thead>
    <tr>
      <th scope="col" class="sortable" tabindex="0" 
          aria-sort="ascending" 
          onclick="sortTable(0)">
        Employee Name
        <span class="sort-indicator" aria-hidden="true">↑</span>
      </th>
      <th scope="col" class="sortable" tabindex="0" 
          aria-sort="none" 
          onclick="sortTable(1)">
        Department
      </th>
      <th scope="col" class="sortable numeric" tabindex="0" 
          aria-sort="none" 
          onclick="sortTable(2)">
        Sales ($)
      </th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">John Smith</th>
      <td>Sales</td>
      <td class="numeric">$45,320</td>
      <td>
        <button type="button" class="btn btn-sm" aria-label="Edit John Smith">Edit</button>
        <button type="button" class="btn btn-sm" aria-label="Delete John Smith">Delete</button>
      </td>
    </tr>
    <!-- More rows... -->
  </tbody>
</table>
```

### Navigation Components

Navigation must be accessible via keyboard and screen readers while providing clear visual hierarchy.

```html
<nav role="navigation" aria-label="Main navigation">
  <ul class="nav-list">
    <li class="nav-item">
      <a href="/" class="nav-link" aria-current="page">Home</a>
    </li>
    <li class="nav-item dropdown">
      <button 
        class="nav-link dropdown-toggle" 
        type="button" 
        aria-expanded="false"
        aria-haspopup="true"
        onclick="toggleDropdown(this)"
      >
        Products
      </button>
      <ul class="dropdown-menu" role="menu">
        <li role="menuitem">
          <a href="/products/web" class="dropdown-link">Web Development</a>
        </li>
        <li role="menuitem">
          <a href="/products/mobile" class="dropdown-link">Mobile Apps</a>
        </li>
        <li role="menuitem">
          <a href="/products/consulting" class="dropdown-link">Consulting</a>
        </li>
      </ul>
    </li>
  </ul>
</nav>
```

### Loading States and Feedback

Users need immediate feedback for all interactions. Loading states prevent confusion and improve perceived performance.

```html
<!-- Skeleton loading -->
<div class="card skeleton" aria-label="Loading content">
  <div class="skeleton-header"></div>
  <div class="skeleton-body">
    <div class="skeleton-line"></div>
    <div class="skeleton-line"></div>
    <div class="skeleton-line short"></div>
  </div>
</div>

<!-- Progress indicators -->
<div class="progress-container">
  <div class="progress-bar" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-fill" style="width: 65%"></div>
  </div>
  <span class="progress-text">65% complete</span>
</div>

<!-- Status messages -->
<div class="toast toast-success" role="alert" aria-live="polite">
  <div class="toast-content">
    <span class="toast-icon" aria-hidden="true">✓</span>
    <span class="toast-message">Changes saved successfully</span>
  </div>
  <button type="button" class="toast-close" aria-label="Close notification">×</button>
</div>
```

---

## Accessibility Deep Dive

### WCAG 2.2 Compliance Strategy

Web Content Accessibility Guidelines provide the foundation for accessible components. Focus on the four principles: **Perceivable**, **Operable**, **Understandable**, and **Robust**.

#### Perceivable
- **Text alternatives**: Every image, icon, and non-text content needs alternative text
- **Captions and transcripts**: For audio and video content
- **Color contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Responsive design**: Content adapts to different screen sizes and zoom levels

```html
<!-- Image with proper alt text -->
<img src="chart.png" alt="Sales increased 25% from Q3 to Q4 2024">

<!-- Decorative image -->
<img src="decoration.png" alt="" role="presentation">

<!-- Complex chart with detailed description -->
<div class="chart-container">
  <img src="sales-chart.png" alt="Sales Chart" aria-describedby="chart-desc">
  <div id="chart-desc" class="sr-only">
    Detailed description: Sales data showing quarterly growth...
  </div>
</div>
```

#### Operable
- **Keyboard navigation**: All functionality available via keyboard
- **No seizures**: Avoid rapidly flashing content
- **Sufficient time**: Users can extend time limits
- **Navigation aids**: Skip links, headings, landmarks

```html
<!-- Skip navigation -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Keyboard navigation for custom components -->
<div class="custom-slider" role="slider" 
     aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"
     tabindex="0" onkeydown="handleSliderKeys(event)">
  <div class="slider-track">
    <div class="slider-thumb" style="left: 50%"></div>
  </div>
</div>
```

#### Understandable
- **Clear language**: Use plain language and define technical terms
- **Predictable navigation**: Consistent interface patterns
- **Input assistance**: Clear labels, instructions, and error messages
- **Error prevention**: Validate inputs and provide confirmation for destructive actions

```html
<!-- Clear form with help text -->
<div class="form-group">
  <label for="password">Password</label>
  <input type="password" id="password" name="password" 
         aria-describedby="password-help password-error" required>
  <div id="password-help" class="help-text">
    Must be at least 8 characters with uppercase, lowercase, and numbers
  </div>
  <div id="password-error" class="error-message" role="alert"></div>
</div>
```

#### Robust
- **Valid HTML**: Use semantic markup and validate code
- **Compatibility**: Works with assistive technologies
- **Future-proof**: Uses standard web technologies

### Screen Reader Optimization

Screen readers navigate content differently than visual users. Optimize for these patterns:

```html
<!-- Heading structure -->
<h1>Main Page Title</h1>
  <h2>Section Title</h2>
    <h3>Subsection</h3>
  <h2>Another Section</h2>

<!-- Landmark roles -->
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">...</nav>
</header>
<main role="main">
  <article role="article">...</article>
  <aside role="complementary">...</aside>
</main>
<footer role="contentinfo">...</footer>

<!-- Live regions for dynamic content -->
<div aria-live="polite" aria-atomic="true" class="status-message"></div>
<div aria-live="assertive" class="error-message"></div>
```

### Advanced ARIA Patterns

#### Combobox (Searchable Dropdown)
```html
<div class="combobox-container">
  <label for="country-input">Country</label>
  <input type="text" id="country-input" 
         role="combobox" 
         aria-expanded="false"
         aria-haspopup="listbox"
         aria-owns="country-list"
         aria-autocomplete="list"
         placeholder="Type to search countries...">
  <ul id="country-list" role="listbox" aria-label="Countries" hidden>
    <li role="option" aria-selected="false">United States</li>
    <li role="option" aria-selected="false">United Kingdom</li>
    <li role="option" aria-selected="false">Canada</li>
  </ul>
</div>
```

#### Tabs Interface
```html
<div class="tabs-container">
  <div role="tablist" aria-label="Settings">
    <button role="tab" aria-selected="true" aria-controls="general-panel" id="general-tab">
      General
    </button>
    <button role="tab" aria-selected="false" aria-controls="security-panel" id="security-tab">
      Security
    </button>
    <button role="tab" aria-selected="false" aria-controls="privacy-panel" id="privacy-tab">
      Privacy
    </button>
  </div>
  
  <div role="tabpanel" id="general-panel" aria-labelledby="general-tab">
    <h2>General Settings</h2>
    <!-- Panel content -->
  </div>
  
  <div role="tabpanel" id="security-panel" aria-labelledby="security-tab" hidden>
    <h2>Security Settings</h2>
    <!-- Panel content -->
  </div>
  
  <div role="tabpanel" id="privacy-panel" aria-labelledby="privacy-tab" hidden>
    <h2>Privacy Settings</h2>
    <!-- Panel content -->
  </div>
</div>
```

---

## Performance Optimization

### Measuring Performance

Before optimizing, establish baselines using browser tools and real-world metrics.

```javascript
// Core Web Vitals monitoring
function measureWebVitals() {
  // Largest Contentful Paint
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  }).observe({ type: 'largest-contentful-paint', buffered: true });

  // First Input Delay
  new PerformanceObserver((entryList) => {
    const firstInput = entryList.getEntries()[0];
    console.log('FID:', firstInput.processingStart - firstInput.startTime);
  }).observe({ type: 'first-input', buffered: true });

  // Cumulative Layout Shift
  new PerformanceObserver((entryList) => {
    let cumulativeScore = 0;
    for (const entry of entryList.getEntries()) {
      cumulativeScore += entry.value;
    }
    console.log('CLS:', cumulativeScore);
  }).observe({ type: 'layout-shift', buffered: true });
}
```

### DOM Performance Optimization

#### Efficient DOM Manipulation
```javascript
// ❌ Poor performance - multiple DOM queries and updates
function updateItemsBad(items) {
  items.forEach(item => {
    const element = document.getElementById(item.id);
    element.textContent = item.text;
    element.style.color = item.color;
  });
}

// ✅ Optimized - batch operations and minimize DOM access
function updateItemsGood(items) {
  const fragment = document.createDocumentFragment();
  const updates = [];
  
  items.forEach(item => {
    const element = document.getElementById(item.id);
    if (element) {
      updates.push(() => {
        element.textContent = item.text;
        element.style.color = item.color;
      });
    }
  });
  
  // Batch DOM updates
  requestAnimationFrame(() => {
    updates.forEach(update => update());
  });
}
```

#### Virtual Scrolling for Large Lists
```javascript
class VirtualList {
  constructor(container, items, itemHeight) {
    this.container = container;
    this.items = items;
    this.itemHeight = itemHeight;
    this.visibleStart = 0;
    this.visibleEnd = 0;
    this.scrollTop = 0;
    
    this.init();
  }
  
  init() {
    this.container.style.height = `${this.items.length * this.itemHeight}px`;
    this.container.style.position = 'relative';
    this.container.style.overflow = 'auto';
    
    this.container.addEventListener('scroll', () => {
      this.scrollTop = this.container.scrollTop;
      this.updateVisibleItems();
    });
    
    this.updateVisibleItems();
  }
  
  updateVisibleItems() {
    const containerHeight = this.container.clientHeight;
    const visibleStart = Math.floor(this.scrollTop / this.itemHeight);
    const visibleEnd = Math.min(
      visibleStart + Math.ceil(containerHeight / this.itemHeight) + 1,
      this.items.length
    );
    
    if (visibleStart !== this.visibleStart || visibleEnd !== this.visibleEnd) {
      this.visibleStart = visibleStart;
      this.visibleEnd = visibleEnd;
      this.renderVisibleItems();
    }
  }
  
  renderVisibleItems() {
    const fragment = document.createDocumentFragment();
    
    for (let i = this.visibleStart; i < this.visibleEnd; i++) {
      const item = this.items[i];
      const element = document.createElement('div');
      element.textContent = item.text;
      element.style.position = 'absolute';
      element.style.top = `${i * this.itemHeight}px`;
      element.style.height = `${this.itemHeight}px`;
      fragment.appendChild(element);
    }
    
    this.container.innerHTML = '';
    this.container.appendChild(fragment);
  }
}
```

### Memory Management

#### Preventing Memory Leaks
```javascript
class ComponentManager {
  constructor() {
    this.components = new Map();
    this.eventListeners = new WeakMap();
    this.observers = new Set();
  }
  
  createComponent(element, config) {
    const component = {
      element,
      config,
      cleanup: () => {
        // Remove event listeners
        const listeners = this.eventListeners.get(element);
        if (listeners) {
          listeners.forEach(({ event, handler }) => {
            element.removeEventListener(event, handler);
          });
        }
        
        // Disconnect observers
        this.observers.forEach(observer => {
          if (observer.disconnect) {
            observer.disconnect();
          }
        });
        
        // Clear references
        this.components.delete(element);
        this.eventListeners.delete(element);
      }
    };
    
    this.components.set(element, component);
    return component;
  }
  
  addEventListener(element, event, handler) {
    if (!this.eventListeners.has(element)) {
      this.eventListeners.set(element, []);
    }
    
    this.eventListeners.get(element).push({ event, handler });
    element.addEventListener(event, handler);
  }
  
  addObserver(observer) {
    this.observers.add(observer);
  }
  
  cleanup() {
    this.components.forEach(component => component.cleanup());
    this.components.clear();
    this.observers.clear();
  }
}
```

### Algorithm Optimization

#### Avoiding O(n²) Complexity
```javascript
// ❌ Quadratic complexity
function groupItemsBad(items) {
  return items.reduce((groups, item) => {
    return {
      ...groups,  // Creates new object each iteration
      [item.category]: [...(groups[item.category] || []), item]
    };
  }, {});
}

// ✅ Linear complexity
function groupItemsGood(items) {
  const groups = {};
  items.forEach(item => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
  });
  return groups;
}

// ✅ Using lodash for complex operations
import _ from 'lodash';

function groupItemsLodash(items) {
  return _.groupBy(items, 'category');
}
```

#### Efficient Search and Filtering
```javascript
class SearchableList {
  constructor(items) {
    this.items = items;
    this.searchIndex = this.buildSearchIndex(items);
  }
  
  buildSearchIndex(items) {
    const index = new Map();
    
    items.forEach((item, i) => {
      const words = item.title.toLowerCase().split(/\s+/);
      words.forEach(word => {
        if (!index.has(word)) {
          index.set(word, new Set());
        }
        index.get(word).add(i);
      });
    });
    
    return index;
  }
  
  search(query) {
    if (!query) return this.items;
    
    const words = query.toLowerCase().split(/\s+/);
    const matchingSets = words.map(word => 
      this.searchIndex.get(word) || new Set()
    );
    
    // Find intersection of all sets
    const intersection = matchingSets.reduce((acc, set) => {
      return new Set([...acc].filter(x => set.has(x)));
    });
    
    return [...intersection].map(i => this.items[i]);
  }
}
```

---

## Advanced Component Architectures

### Component Composition Patterns

#### Higher-Order Components
```javascript
// Accessibility wrapper
function withAccessibility(Component) {
  return function AccessibleComponent(props) {
    const [announcements, setAnnouncements] = useState([]);
    
    const announce = (message) => {
      setAnnouncements(prev => [...prev, { id: Date.now(), message }]);
      setTimeout(() => {
        setAnnouncements(prev => prev.filter(a => a.id !== id));
      }, 1000);
    };
    
    return (
      <div>
        <Component {...props} announce={announce} />
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {announcements.map(a => (
            <div key={a.id}>{a.message}</div>
          ))}
        </div>
      </div>
    );
  };
}

// Performance monitoring wrapper
function withPerformanceMonitoring(Component) {
  return function MonitoredComponent(props) {
    useEffect(() => {
      performance.mark('component-start');
      
      return () => {
        performance.mark('component-end');
        performance.measure('component-lifecycle', 'component-start', 'component-end');
      };
    }, []);
    
    return <Component {...props} />;
  };
}
```

#### Compound Components
```javascript
// Flexible card component system
const Card = ({ children, ...props }) => {
  return <div className="card" {...props}>{children}</div>;
};

const CardHeader = ({ children, ...props }) => {
  return <div className="card-header" {...props}>{children}</div>;
};

const CardBody = ({ children, ...props }) => {
  return <div className="card-body" {...props}>{children}</div>;
};

const CardFooter = ({ children, ...props }) => {
  return <div className="card-footer" {...props}>{children}</div>;
};

// Usage
<Card>
  <CardHeader>
    <h3>Product Title</h3>
  </CardHeader>
  <CardBody>
    <p>Product description...</p>
  </CardBody>
  <CardFooter>
    <button>Add to Cart</button>
  </CardFooter>
</Card>
```

### State Management Patterns

#### Reducer Pattern for Complex State
```javascript
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value
        },
        errors: {
          ...state.errors,
          [action.field]: null
        }
      };
      
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error
        }
      };
      
    case 'SUBMIT_START':
      return {
        ...state,
        isSubmitting: true,
        submitError: null
      };
      
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        isSubmitting: false,
        submitError: null,
        isSubmitted: true
      };
      
    case 'SUBMIT_ERROR':
      return {
        ...state,
        isSubmitting: false,
        submitError: action.error
      };
      
    default:
      return state;
  }
}

function useForm(initialValues = {}) {
  const [state, dispatch] = useReducer(formReducer, {
    values: initialValues,
    errors: {},
    isSubmitting: false,
    isSubmitted: false,
    submitError: null
  });
  
  const setField = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };
  
  const setError = (field, error) => {
    dispatch({ type: 'SET_ERROR', field, error });
  };
  
  const submit = async (submitFn) => {
    dispatch({ type: 'SUBMIT_START' });
    try {
      await submitFn(state.values);
      dispatch({ type: 'SUBMIT_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'SUBMIT_ERROR', error: error.message });
    }
  };
  
  return { state, setField, setError, submit };
}
```

---

## Security Considerations

### Input Validation and Sanitization

#### Client-Side Validation
```javascript
class InputValidator {
  static patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?[\d\s\-\(\)]+$/,
    url: /^https?:\/\/.+/,
    alphanumeric: /^[a-zA-Z0-9]+$/
  };
  
  static validate(value, rules) {
    const errors = [];
    
    if (rules.required && (!value || value.trim() === '')) {
      errors.push('This field is required');
    }
    
    if (value && rules.minLength && value.length < rules.minLength) {
      errors.push(`Must be at least ${rules.minLength} characters`);
    }
    
    if (value && rules.maxLength && value.length > rules.maxLength) {
      errors.push(`Must be no more than ${rules.maxLength} characters`);
    }
    
    if (value && rules.pattern && !this.patterns[rules.pattern].test(value)) {
      errors.push('Invalid format');
    }
    
    if (rules.custom) {
      const customError = rules.custom(value);
      if (customError) {
        errors.push(customError);
      }
    }
    
    return errors;
  }
}
```

#### HTML Sanitization
```javascript
import DOMPurify from 'dompurify';

class ContentSanitizer {
  static sanitizeHTML(html, options = {}) {
    const config = {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
      FORBID_SCRIPTS: true,
      FORBID_TAGS: ['script', 'style', 'object', 'embed'],
      KEEP_CONTENT: true,
      ...options
    };
    
    return DOMPurify.sanitize(html, config);
  }
  
  static sanitizeText(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  static sanitizeAttribute(value) {
    return value.replace(/[<>"']/g, (char) => {
      const escapes = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };
      return escapes[char];
    });
  }
}
```

### Content Security Policy (CSP)

#### CSP Implementation
```javascript
// CSP header configuration
const cspDirectives = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'strict-dynamic'", "'nonce-{{nonce}}'"],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", "data:", "https:"],
  'connect-src': ["'self'", "https://api.yourapp.com"],
  'font-src': ["'self'", "https://fonts.gstatic.com"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'block-all-mixed-content': true,
  'upgrade-insecure-requests': true
};

function generateCSPHeader(directives) {
  return Object.entries(directives)
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        return value ? key : '';
      }
      return `${key} ${Array.isArray(value) ? value.join(' ') : value}`;
    })
    .filter(Boolean)
    .join('; ');
}

// Nonce generation for inline scripts
function generateNonce() {
  return crypto.randomBytes(16).toString('base64');
}
```

### Secure Code Execution

#### Sandboxed JavaScript Execution
```javascript
class SecureCodeRunner {
  constructor(sandboxOrigin) {
    this.sandboxOrigin = sandboxOrigin;
    this.iframe = null;
    this.pendingRequests = new Map();
    this.messageHandler = this.handleMessage.bind(this);
  }
  
  async initialize() {
    return new Promise((resolve, reject) => {
      this.iframe = document.createElement('iframe');
      this.iframe.setAttribute('sandbox', 'allow-scripts');
      this.iframe.src = `${this.sandboxOrigin}/sandbox.html`;
      
      this.iframe.onload = () => {
        window.addEventListener('message', this.messageHandler);
        resolve();
      };
      
      this.iframe.onerror = reject;
      document.body.appendChild(this.iframe);
    });
  }
  
  async executeCode(code, input, timeout = 5000) {
    if (!this.iframe) {
      throw new Error('Sandbox not initialized');
    }
    
    const requestId = crypto.randomUUID();
    
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        this.pendingRequests.delete(requestId);
        reject(new Error('Code execution timeout'));
      }, timeout);
      
      this.pendingRequests.set(requestId, {
        resolve: (result) => {
          clearTimeout(timeoutId);
          resolve(result);
        },
        reject: (error) => {
          clearTimeout(timeoutId);
          reject(error);
        }
      });
      
      this.iframe.contentWindow.postMessage({
        id: requestId,
        code,
        input
      }, this.sandboxOrigin);
    });
  }
  
  handleMessage(event) {
    if (event.origin !== this.sandboxOrigin) {
      return;
    }
    
    const { id, result, error } = event.data;
    const request = this.pendingRequests.get(id);
    
    if (request) {
      this.pendingRequests.delete(id);
      if (error) {
        request.reject(new Error(result));
      } else {
        request.resolve(result);
      }
    }
  }
  
  destroy() {
    if (this.iframe) {
      document.body.removeChild(this.iframe);
      this.iframe = null;
    }
    window.removeEventListener('message', this.messageHandler);
    this.pendingRequests.clear();
  }
}
```

---

## Real-World Case Studies

### Case Study 1: Advanced Data Grid Component

**Problem**: Build a data grid that handles 10,000+ rows with sorting, filtering, and inline editing while maintaining accessibility.

**Solution Architecture**:
```javascript
class DataGrid {
  constructor(container, options) {
    this.container = container;
    this.options = {
      rowHeight: 40,
      headerHeight: 50,
      bufferSize: 10,
      ...options
    };
    
    this.data = [];
    this.filteredData = [];
    this.sortColumn = null;
    this.sortDirection = 'asc';
    this.scrollTop = 0;
    this.virtualStart = 0;
    this.virtualEnd = 0;
    
    this.init();
  }
  
  init() {
    this.createStructure();
    this.bindEvents();
    this.setupAccessibility();
  }
  
  createStructure() {
    this.container.innerHTML = `
      <div class="data-grid" role="grid" aria-label="${this.options.label}">
        <div class="grid-header" role="row">
          ${this.options.columns.map((col, index) => `
            <div class="grid-cell header-cell" 
                 role="columnheader" 
                 aria-sort="none"
                 tabindex="0"
                 data-column="${index}">
              ${col.title}
              <span class="sort-indicator" aria-hidden="true"></span>
            </div>
          `).join('')}
        </div>
        <div class="grid-body" role="rowgroup">
          <div class="virtual-spacer-top"></div>
          <div class="visible-rows"></div>
          <div class="virtual-spacer-bottom"></div>
        </div>
      </div>
    `;
    
    this.headerRow = this.container.querySelector('.grid-header');
    this.bodyContainer = this.container.querySelector('.grid-body');
    this.visibleRows = this.container.querySelector('.visible-rows');
    this.topSpacer = this.container.querySelector('.virtual-spacer-top');
    this.bottomSpacer = this.container.querySelector('.virtual-spacer-bottom');
  }
  
  bindEvents() {
    // Header click for sorting
    this.headerRow.addEventListener('click', (e) => {
      const cell = e.target.closest('.header-cell');
      if (cell) {
        this.handleSort(parseInt(cell.dataset.column));
      }
    });
    
    // Keyboard navigation
    this.headerRow.addEventListener('keydown', this.handleHeaderKeydown.bind(this));
    this.bodyContainer.addEventListener('keydown', this.handleBodyKeydown.bind(this));
    
    // Scrolling for virtual rendering
    this.bodyContainer.addEventListener('scroll', this.handleScroll.bind(this));
    
    // Inline editing
    this.visibleRows.addEventListener('dblclick', this.handleInlineEdit.bind(this));
  }
  
  setupAccessibility() {
    // Add ARIA labels and descriptions
    this.container.setAttribute('aria-describedby', 'grid-instructions');
    
    const instructions = document.createElement('div');
    instructions.id = 'grid-instructions';
    instructions.className = 'sr-only';
    instructions.textContent = 'Use arrow keys to navigate, Enter to sort columns, F2 to edit cells';
    this.container.appendChild(instructions);
  }
  
  handleSort(columnIndex) {
    const column = this.options.columns[columnIndex];
    if (!column.sortable) return;
    
    if (this.sortColumn === columnIndex) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = columnIndex;
      this.sortDirection = 'asc';
    }
    
    this.applySort();
    this.updateSortIndicators();
    this.render();
    
    // Announce sort change
    this.announceToScreenReader(
      `Table sorted by ${column.title} ${this.sortDirection}ending`
    );
  }
  
  applySort() {
    const column = this.options.columns[this.sortColumn];
    this.filteredData.sort((a, b) => {
      const aVal = a[column.key];
      const bVal = b[column.key];
      
      let comparison = 0;
      if (aVal < bVal) comparison = -1;
      else if (aVal > bVal) comparison = 1;
      
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }
  
  handleScroll() {
    this.scrollTop = this.bodyContainer.scrollTop;
    this.updateVirtualWindow();
    this.render();
  }
  
  updateVirtualWindow() {
    const containerHeight = this.bodyContainer.clientHeight;
    const totalHeight = this.filteredData.length * this.options.rowHeight;
    
    this.virtualStart = Math.floor(this.scrollTop / this.options.rowHeight);
    this.virtualEnd = Math.min(
      this.virtualStart + Math.ceil(containerHeight / this.options.rowHeight) + this.options.bufferSize,
      this.filteredData.length
    );
    
    // Update spacers
    this.topSpacer.style.height = `${this.virtualStart * this.options.rowHeight}px`;
    this.bottomSpacer.style.height = `${(this.filteredData.length - this.virtualEnd) * this.options.rowHeight}px`;
  }
  
  render() {
    const fragment = document.createDocumentFragment();
    
    for (let i = this.virtualStart; i < this.virtualEnd; i++) {
      const row = this.filteredData[i];
      const rowElement = this.createRowElement(row, i);
      fragment.appendChild(rowElement);
    }
    
    this.visibleRows.innerHTML = '';
    this.visibleRows.appendChild(fragment);
  }
  
  createRowElement(row, index) {
    const rowElement = document.createElement('div');
    rowElement.className = 'grid-row';
    rowElement.setAttribute('role', 'row');
    rowElement.setAttribute('aria-rowindex', index + 1);
    
    this.options.columns.forEach((column, colIndex) => {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      cell.setAttribute('role', 'gridcell');
      cell.setAttribute('aria-describedby', `col-${colIndex}-header`);
      
      if (column.editable) {
        cell.setAttribute('tabindex', '0');
        cell.setAttribute('aria-readonly', 'false');
      }
      
      cell.textContent = row[column.key] || '';
      rowElement.appendChild(cell);
    });
    
    return rowElement;
  }
  
  announceToScreenReader(message) {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    setTimeout(() => document.body.removeChild(announcer), 1000);
  }
}
```

### Case Study 2: Complex Form Wizard

**Problem**: Multi-step form with validation, progress indication, and accessibility support.

**Solution**:
```javascript
class FormWizard {
  constructor(container, steps) {
    this.container = container;
    this.steps = steps;
    this.currentStep = 0;
    this.formData = {};
    this.validators = new Map();
    
    this.init();
  }
  
  init() {
    this.createStructure();
    this.setupValidation();
    this.bindEvents();
    this.updateProgress();
  }
  
  createStructure() {
    this.container.innerHTML = `
      <div class="form-wizard" role="region" aria-label="Multi-step form">
        <div class="wizard-progress" role="progressbar" 
             aria-valuenow="1" 
             aria-valuemin="1" 
             aria-valuemax="${this.steps.length}">
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <div class="progress-text">
            Step <span class="current-step">1</span> of ${this.steps.length}
          </div>
        </div>
        
        <div class="wizard-steps">
          ${this.steps.map((step, index) => `
            <div class="wizard-step" 
                 data-step="${index}"
                 aria-hidden="${index !== 0}">
              <h2>${step.title}</h2>
              <form class="step-form" novalidate>
                ${this.renderStepContent(step)}
              </form>
            </div>
          `).join('')}
        </div>
        
        <div class="wizard-navigation">
          <button type="button" class="btn btn-secondary" 
                  id="prev-btn" disabled>
            Previous
          </button>
          <button type="button" class="btn btn-primary" 
                  id="next-btn">
            Next
          </button>
        </div>
        
        <div class="wizard-summary" aria-live="polite" aria-atomic="true">
        </div>
      </div>
    `;
    
    this.progressBar = this.container.querySelector('.wizard-progress');
    this.stepElements = this.container.querySelectorAll('.wizard-step');
    this.prevBtn = this.container.querySelector('#prev-btn');
    this.nextBtn = this.container.querySelector('#next-btn');
    this.summary = this.container.querySelector('.wizard-summary');
  }
  
  renderStepContent(step) {
    return step.fields.map(field => {
      switch (field.type) {
        case 'text':
        case 'email':
        case 'tel':
          return `
            <div class="form-group">
              <label for="${field.id}">${field.label}</label>
              <input type="${field.type}" 
                     id="${field.id}" 
                     name="${field.name}"
                     required="${field.required || false}"
                     aria-describedby="${field.id}-error">
              <div id="${field.id}-error" class="error-message" role="alert"></div>
            </div>
          `;
        case 'select':
          return `
            <div class="form-group">
              <label for="${field.id}">${field.label}</label>
              <select id="${field.id}" 
                      name="${field.name}"
                      required="${field.required || false}"
                      aria-describedby="${field.id}-error">
                <option value="">Select an option</option>
                ${field.options.map(option => 
                  `<option value="${option.value}">${option.label}</option>`
                ).join('')}
              </select>
              <div id="${field.id}-error" class="error-message" role="alert"></div>
            </div>
          `;
        case 'checkbox':
          return `
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" 
                       id="${field.id}" 
                       name="${field.name}"
                       required="${field.required || false}"
                       aria-describedby="${field.id}-error">
                ${field.label}
              </label>
              <div id="${field.id}-error" class="error-message" role="alert"></div>
            </div>
          `;
        default:
          return '';
      }
    }).join('');
  }
  
  setupValidation() {
    this.steps.forEach((step, stepIndex) => {
      step.fields.forEach(field => {
        this.validators.set(field.name, {
          required: field.required,
          type: field.type,
          validate: field.validate
        });
      });
    });
  }
  
  bindEvents() {
    this.prevBtn.addEventListener('click', () => this.previousStep());
    this.nextBtn.addEventListener('click', () => this.nextStep());
    
    // Form validation on input
    this.container.addEventListener('input', (e) => {
      if (e.target.matches('input, select, textarea')) {
        this.validateField(e.target);
      }
    });
    
    // Keyboard navigation
    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.matches('button')) {
        e.target.click();
      }
    });
  }
  
  validateField(field) {
    const validator = this.validators.get(field.name);
    if (!validator) return true;
    
    const errors = [];
    const value = field.value.trim();
    
    if (validator.required && !value) {
      errors.push('This field is required');
    }
    
    if (value && validator.type === 'email' && !this.isValidEmail(value)) {
      errors.push('Please enter a valid email address');
    }
    
    if (value && validator.validate) {
      const customError = validator.validate(value);
      if (customError) {
        errors.push(customError);
      }
    }
    
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errors.length > 0) {
      errorElement.textContent = errors[0];
      field.setAttribute('aria-invalid', 'true');
      return false;
    } else {
      errorElement.textContent = '';
      field.removeAttribute('aria-invalid');
      return true;
    }
  }
  
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  validateCurrentStep() {
    const currentStepElement = this.stepElements[this.currentStep];
    const fields = currentStepElement.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  collectStepData() {
    const currentStepElement = this.stepElements[this.currentStep];
    const fields = currentStepElement.querySelectorAll('input, select, textarea');
    
    fields.forEach(field => {
      if (field.type === 'checkbox') {
        this.formData[field.name] = field.checked;
      } else {
        this.formData[field.name] = field.value;
      }
    });
  }
  
  nextStep() {
    if (!this.validateCurrentStep()) {
      this.announceError('Please correct the errors before proceeding');
      return;
    }
    
    this.collectStepData();
    
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.updateStep();
    } else {
      this.submitForm();
    }
  }
  
  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.updateStep();
    }
  }
  
  updateStep() {
    // Hide all steps
    this.stepElements.forEach((step, index) => {
      step.style.display = index === this.currentStep ? 'block' : 'none';
      step.setAttribute('aria-hidden', index !== this.currentStep);
    });
    
    // Update navigation buttons
    this.prevBtn.disabled = this.currentStep === 0;
    this.nextBtn.textContent = this.currentStep === this.steps.length - 1 ? 'Submit' : 'Next';
    
    // Update progress
    this.updateProgress();
    
    // Focus first field of new step
    const firstField = this.stepElements[this.currentStep].querySelector('input, select, textarea');
    if (firstField) {
      firstField.focus();
    }
    
    // Announce step change
    this.announceStepChange();
  }
  
  updateProgress() {
    const progress = ((this.currentStep + 1) / this.steps.length) * 100;
    
    this.progressBar.setAttribute('aria-valuenow', this.currentStep + 1);
    this.progressBar.querySelector('.progress-fill').style.width = `${progress}%`;
    this.progressBar.querySelector('.current-step').textContent = this.currentStep + 1;
  }
  
  announceStepChange() {
    const stepTitle = this.steps[this.currentStep].title;
    this.summary.textContent = `Step ${this.currentStep + 1}: ${stepTitle}`;
  }
  
  announceError(message) {
    this.summary.textContent = message;
    this.summary.setAttribute('aria-live', 'assertive');
    
    setTimeout(() => {
      this.summary.setAttribute('aria-live', 'polite');
    }, 1000);
  }
  
  async submitForm() {
    try {
      this.nextBtn.disabled = true;
      this.nextBtn.textContent = 'Submitting...';
      
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.formData)
      });
      
      if (response.ok) {
        this.showSuccessMessage();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      this.announceError('Submission failed. Please try again.');
      this.nextBtn.disabled = false;
      this.nextBtn.textContent = 'Submit';
    }
  }
  
  showSuccessMessage() {
    this.container.innerHTML = `
      <div class="success-message" role="alert" aria-live="polite">
        <h2>Form Submitted Successfully!</h2>
        <p>Thank you for your submission. We'll get back to you soon.</p>
      </div>
    `;
  }
}
```

---



### Case Study 3: State Reset Pitfalls in React and Other Frameworks

**Problem**: Developers often define a constant object or array outside the component to use as a "default" or "initial state" value. However, if this constant is mutated (directly or indirectly), subsequent resets or re-initializations may reference mutated or stale data, leading to subtle bugs.

**Example:**
```javascript
// ❌ Anti-pattern: Defining default state outside the component/file scope
const DEFAULT_STATE = { name: '', age: 0, roles: [] };

function UserForm() {
  const [form, setForm] = useState(DEFAULT_STATE);

  function resetForm() {
    setForm(DEFAULT_STATE); // May not work as intended if DEFAULT_STATE was mutated!
  }

  function handleRoleAdd(role) {
    // This mutates the array inside DEFAULT_STATE for all users of it!
    form.roles.push(role);
    setForm({ ...form, roles: form.roles });
  }

  // ...
}
```

**What goes wrong?**
- If `handleRoleAdd` or any mutation function directly changes `roles`, it actually mutates the array referenced by `DEFAULT_STATE`.
- Resetting by `setForm(DEFAULT_STATE)` doesn't restore a pristine object; it gives you the (now mutated) reference.
- This can also happen with arrays, nested objects, or any shared data.

**This bug can happen in:**
- `useState` in React (`useState(DEFAULT_STATE)`)
- Class constructors (`this.state = DEFAULT_STATE`)
- Redux reducers or any state library that uses "initial state" constants

**Best Practice:**
- **Never use a shared object/array as a state reset value. Always create a fresh copy when resetting.**
- Use functions or object spread/cloning to ensure a new reference.

```javascript
// ✅ Correct: Use a function to get a fresh default state
const getDefaultState = () => ({ name: '', age: 0, roles: [] });

function UserForm() {
  const [form, setForm] = useState(getDefaultState);

  function resetForm() {
    setForm(getDefaultState());
  }

  function handleRoleAdd(role) {
    setForm(prev => ({ ...prev, roles: [...prev.roles, role] }));
  }
}
```

**General Rule:**  
Avoid using shared objects or arrays as a source of truth for state resets. Always generate a new instance to avoid reference bugs.

**Summary Table:**

| Pattern                    | Risk of Bug | Safe?                 |
|----------------------------|:-----------:|:---------------------:|
| `useState(DEFAULT_OBJ)`    |    High     | ❌                    |
| `useState(() => ({...}))`  |    Low      | ✅                    |
| `this.state = DEFAULT_OBJ` |    High     | ❌                    |
| Clone default each time    |    Low      | ✅                    |

---

## Testing and Quality Assurance

### Automated Accessibility Testing

```javascript
// Jest + Testing Library + axe-core
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';

expect.extend(toHaveNoViolations);

describe('Button Component', () => {
  test('should be accessible', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('should handle keyboard navigation', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    
    // Test keyboard activation
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    fireEvent.keyDown(button, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
  
  test('should announce state changes', async () => {
    const { rerender } = render(<Button loading={false}>Save</Button>);
    
    rerender(<Button loading={true}>Save</Button>);
    
    expect(screen.getByText(/saving/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });
});
```

### Performance Testing

```javascript
// Performance monitoring in tests
class PerformanceMonitor {
  constructor() {
    this.measurements = [];
  }
  
  startMeasure(name) {
    performance.mark(`${name}-start`);
  }
  
  endMeasure(name) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    
    const entry = performance.getEntriesByName(name)[0];
    this.measurements.push({
      name,
      duration: entry.duration,
      timestamp: Date.now()
    });
  }
  
  getAverageDuration(name) {
    const measures = this.measurements.filter(m => m.name === name);
    if (measures.length === 0) return 0;
    
    const total = measures.reduce((sum, m) => sum + m.duration, 0);
    return total / measures.length;
  }
  
  assertPerformance(name, maxDuration) {
    const average = this.getAverageDuration(name);
    if (average > maxDuration) {
      throw new Error(`Performance assertion failed: ${name} took ${average}ms, expected < ${maxDuration}ms`);
    }
  }
}

// Usage in tests
describe('DataGrid Performance', () => {
  let monitor;
  
  beforeEach(() => {
    monitor = new PerformanceMonitor();
  });
  
  test('should render 1000 rows within 100ms', () => {
    const data = generateMockData(1000);
    
    monitor.startMeasure('render-1000-rows');
    render(<DataGrid data={data} />);
    monitor.endMeasure('render-1000-rows');
    
    monitor.assertPerformance('render-1000-rows', 100);
  });
  
  test('should handle scroll performance', () => {
    const data = generateMockData(10000);
    const { container } = render(<DataGrid data={data} />);
    const scrollContainer = container.querySelector('.grid-body');
    
    monitor.startMeasure('scroll-performance');
    
    // Simulate rapid scrolling
    for (let i = 0; i < 100; i++) {
      fireEvent.scroll(scrollContainer, { target: { scrollTop: i * 40 } });
    }
    
    monitor.endMeasure('scroll-performance');
    monitor.assertPerformance('scroll-performance', 50);
  });
});
```

### End-to-End Testing

```javascript
// Playwright E2E tests
import { test, expect } from '@playwright/test';

test.describe('Form Wizard', () => {
  test('should complete multi-step form with keyboard only', async ({ page }) => {
    await page.goto('/form-wizard');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab'); // Focus first field
    await page.keyboard.type('John Doe');
    
    await page.keyboard.press('Tab'); // Next field
    await page.keyboard.type('john@example.com');
    
    await page.keyboard.press('Tab'); // Next button
    await page.keyboard.press('Enter'); // Activate next button
    
    // Verify step progression
    await expect(page.locator('.current-step')).toContainText('2');
    
    // Complete remaining steps
    await page.keyboard.press('Tab'); // Focus first field of step 2
    await page.keyboard.type('555-1234');
    
    await page.keyboard.press('Tab'); // Next button
    await page.keyboard.press('Enter');
    
    // Final step
    await page.keyboard.press('Tab'); // Focus checkbox
    await page.keyboard.press('Space'); // Check checkbox
    
    await page.keyboard.press('Tab'); // Submit button
    await page.keyboard.press('Enter');
    
    // Verify success
    await expect(page.locator('.success-message')).toBeVisible();
  });
  
  test('should handle validation errors accessibly', async ({ page }) => {
    await page.goto('/form-wizard');
    
    // Try to proceed without filling required fields
    await page.click('#next-btn');
    
    // Verify error messages are announced
    const errorMessage = page.locator('[role="alert"]').first();
    await expect(errorMessage).toBeVisible();
    
    // Verify field has aria-invalid
    const field = page.locator('input[aria-invalid="true"]');
    await expect(field).toBeVisible();
  });
});
```

---

## Production Deployment Strategies

### Build Optimization

```javascript
// Webpack configuration for production
module.exports = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          minChunks: 2,
          chunks: 'all',
          name: 'common',
          enforce: true,
        },
      },
    },
    usedExports: true,
    sideEffects: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: '> 0.25%, not dead',
                useBuiltIns: 'usage',
                corejs: 3,
              }],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8,
    }),
  ],
};
```

### CDN and Caching Strategy

```javascript
// Service Worker for caching
const CACHE_NAME = 'component-library-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/components.js',
  '/scripts/polyfills.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});
```

---

## Monitoring and Maintenance

### Real User Monitoring

```javascript
// RUM implementation
class RealUserMonitoring {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
    this.metrics = {
      performance: [],
      accessibility: [],
      errors: []
    };
    
    this.init();
  }
  
  init() {
    this.observePerformance();
    this.observeAccessibility();
    this.observeErrors();
    this.setupReporting();
  }
  
  observePerformance() {
    // Web Vitals
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.metrics.performance.push({
          name: entry.name,
          value: entry.startTime,
          timestamp: Date.now(),
          url: window.location.href
        });
      }
    }).observe({type: 'largest-contentful-paint', buffered: true});
    // Add more observers as needed...
  }
  
  observeAccessibility() {
    // Custom logic or integrate with tools like axe-core in production for reporting
  }

  observeErrors() {
    window.addEventListener('error', (event) => {
      this.metrics.errors.push({
        message: event.message,
        stack: event.error ? event.error.stack : null,
        url: event.filename,
        timestamp: Date.now(),
      });
    });
    window.addEventListener('unhandledrejection', (event) => {
      this.metrics.errors.push({
        message: event.reason ? event.reason.message : 'Unhandled promise rejection',
        stack: event.reason ? event.reason.stack : null,
        url: window.location.href,
        timestamp: Date.now(),
      });
    });
  }

  setupReporting() {
    setInterval(() => {
      // Send metrics to API endpoint
      if (this.metrics.performance.length > 0 || this.metrics.errors.length > 0) {
        fetch(this.apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.metrics),
        });
        this.metrics.performance = [];
        this.metrics.errors = [];
      }
    }, 60000); // Send every minute
  }
}
```

---

## Tools and Resources

- [axe-core](https://github.com/dequelabs/axe-core): Automated accessibility testing
- [Lighthouse](https://developers.google.com/web/tools/lighthouse): Performance, accessibility audits
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y): Linting for accessibility
- [react-aria](https://react-spectrum.adobe.com/react-aria/)
- [Playwright](https://playwright.dev/): End-to-end testing
- [Testing Library](https://testing-library.com/): UI testing
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [MDN Accessibility Docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

---

**Remember:**  
- Accessibility is not a feature—it's a foundation.
- Performance is a user experience issue.
- Never use shared reference objects/arrays for resetting state.
- Test early, test often, and automate what you can.