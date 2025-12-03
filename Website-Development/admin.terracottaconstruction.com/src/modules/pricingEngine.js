// src/modules/pricingEngine.js
// Pricing engine for calculating quotes and estimates

// Service categories with base pricing
export const SERVICE_CATEGORIES = {
  landscaping: {
    name: 'Landscaping & Lawn Care',
    services: {
      lawn_mowing: { name: 'Lawn Mowing', unit: 'sq ft', basePrice: 0.05, minCharge: 50 },
      mulching: { name: 'Mulching', unit: 'cu yd', basePrice: 65, minCharge: 150 },
      tree_trimming: { name: 'Tree Trimming', unit: 'per tree', basePrice: 150, minCharge: 150 },
      hedge_trimming: { name: 'Hedge Trimming', unit: 'linear ft', basePrice: 5, minCharge: 100 },
      flower_bed: { name: 'Flower Bed Installation', unit: 'sq ft', basePrice: 15, minCharge: 200 },
      sod_installation: { name: 'Sod Installation', unit: 'sq ft', basePrice: 2.5, minCharge: 500 },
      irrigation_repair: { name: 'Irrigation Repair', unit: 'per hour', basePrice: 85, minCharge: 125 }
    }
  },
  fencing: {
    name: 'Fencing Installation & Repair',
    services: {
      wood_fence: { name: 'Wood Fence', unit: 'linear ft', basePrice: 35, minCharge: 500 },
      chain_link: { name: 'Chain Link Fence', unit: 'linear ft', basePrice: 25, minCharge: 400 },
      vinyl_fence: { name: 'Vinyl Fence', unit: 'linear ft', basePrice: 45, minCharge: 600 },
      fence_repair: { name: 'Fence Repair', unit: 'per hour', basePrice: 75, minCharge: 150 },
      gate_installation: { name: 'Gate Installation', unit: 'each', basePrice: 350, minCharge: 350 },
      post_replacement: { name: 'Post Replacement', unit: 'each', basePrice: 125, minCharge: 125 }
    }
  },
  handyman: {
    name: 'Handyman Services',
    services: {
      general_repair: { name: 'General Repair', unit: 'per hour', basePrice: 65, minCharge: 100 },
      drywall_repair: { name: 'Drywall Repair', unit: 'per patch', basePrice: 85, minCharge: 125 },
      painting: { name: 'Interior Painting', unit: 'sq ft', basePrice: 3.5, minCharge: 250 },
      pressure_washing: { name: 'Pressure Washing', unit: 'sq ft', basePrice: 0.35, minCharge: 150 },
      gutter_cleaning: { name: 'Gutter Cleaning', unit: 'linear ft', basePrice: 2, minCharge: 125 },
      door_installation: { name: 'Door Installation', unit: 'each', basePrice: 250, minCharge: 250 },
      fixture_installation: { name: 'Fixture Installation', unit: 'each', basePrice: 75, minCharge: 100 }
    }
  },
  metal_buildings: {
    name: 'Metal Buildings & Custom Projects',
    services: {
      metal_building: { name: 'Metal Building', unit: 'sq ft', basePrice: 25, minCharge: 5000 },
      concrete_slab: { name: 'Concrete Slab', unit: 'sq ft', basePrice: 8, minCharge: 2000 },
      carport: { name: 'Carport Installation', unit: 'each', basePrice: 3500, minCharge: 3500 },
      barn_door: { name: 'Barn Door Installation', unit: 'each', basePrice: 1200, minCharge: 1200 }
    }
  },
  emergency: {
    name: 'Emergency Services',
    services: {
      emergency_call: { name: 'Emergency Call Out', unit: 'flat rate', basePrice: 150, minCharge: 150 },
      water_damage: { name: 'Water Damage Repair', unit: 'per hour', basePrice: 95, minCharge: 200 },
      storm_damage: { name: 'Storm Damage Repair', unit: 'per hour', basePrice: 95, minCharge: 200 },
      board_up: { name: 'Board Up Service', unit: 'per opening', basePrice: 125, minCharge: 250 }
    }
  },
  apartment_turnover: {
    name: 'Apartment Turnovers',
    services: {
      full_turnover: { name: 'Full Unit Turnover', unit: 'per unit', basePrice: 1500, minCharge: 1500 },
      paint_turnover: { name: 'Paint Only', unit: 'per unit', basePrice: 600, minCharge: 600 },
      deep_clean: { name: 'Deep Clean', unit: 'per unit', basePrice: 350, minCharge: 350 },
      carpet_cleaning: { name: 'Carpet Cleaning', unit: 'per room', basePrice: 75, minCharge: 150 },
      appliance_clean: { name: 'Appliance Deep Clean', unit: 'each', basePrice: 50, minCharge: 50 }
    }
  }
};

// Labor rates
export const LABOR_RATES = {
  standard: 65,
  skilled: 85,
  specialist: 110,
  emergency: 125
};

// Material markup percentage
export const MATERIAL_MARKUP = 25; // 25% markup on materials

// Minimum margin threshold
export const MIN_MARGIN_THRESHOLD = 30; // 30%

// Calculate price for a service
export function calculateServicePrice(category, service, quantity, options = {}) {
  const serviceConfig = SERVICE_CATEGORIES[category]?.services[service];

  if (!serviceConfig) {
    throw new Error(`Unknown service: ${category}/${service}`);
  }

  let price = serviceConfig.basePrice * quantity;

  // Apply minimum charge
  if (price < serviceConfig.minCharge) {
    price = serviceConfig.minCharge;
  }

  // Apply difficulty multiplier
  if (options.difficulty) {
    const multipliers = { easy: 0.9, standard: 1, moderate: 1.15, difficult: 1.35 };
    price *= multipliers[options.difficulty] || 1;
  }

  // Apply urgency multiplier
  if (options.urgent) {
    price *= 1.25; // 25% rush fee
  }

  // Apply weekend/after-hours multiplier
  if (options.afterHours) {
    price *= 1.5; // 50% after-hours rate
  }

  return Math.round(price * 100) / 100;
}

// Calculate material cost with markup
export function calculateMaterialCost(baseCost, applyMarkup = true) {
  if (applyMarkup) {
    return Math.round(baseCost * (1 + MATERIAL_MARKUP / 100) * 100) / 100;
  }
  return baseCost;
}

// Calculate labor cost
export function calculateLaborCost(hours, rateType = 'standard') {
  const rate = LABOR_RATES[rateType] || LABOR_RATES.standard;
  return Math.round(hours * rate * 100) / 100;
}

// Generate quote estimate from services
export function generateEstimate(items) {
  let totalCost = 0;
  let totalPrice = 0;

  const lineItems = items.map(item => {
    const price = calculateServicePrice(
      item.category,
      item.service,
      item.quantity,
      item.options
    );

    const cost = price * 0.6; // Assume 40% margin on services
    totalCost += cost;
    totalPrice += price;

    return {
      description: SERVICE_CATEGORIES[item.category]?.services[item.service]?.name || item.description,
      quantity: item.quantity,
      unit: SERVICE_CATEGORIES[item.category]?.services[item.service]?.unit || 'each',
      cost: Math.round(cost * 100) / 100,
      price: Math.round(price * 100) / 100
    };
  });

  const margin = totalPrice > 0 ? ((totalPrice - totalCost) / totalPrice) * 100 : 0;

  return {
    lineItems,
    subtotal: Math.round(totalPrice * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    margin: Math.round(margin * 10) / 10,
    meetsMinMargin: margin >= MIN_MARGIN_THRESHOLD
  };
}

// Apply discount
export function applyDiscount(price, discountType, discountValue) {
  if (discountType === 'percentage') {
    return Math.round(price * (1 - discountValue / 100) * 100) / 100;
  } else if (discountType === 'fixed') {
    return Math.max(0, price - discountValue);
  }
  return price;
}

// Get all services as flat list
export function getAllServices() {
  const services = [];
  Object.entries(SERVICE_CATEGORIES).forEach(([categoryKey, category]) => {
    Object.entries(category.services).forEach(([serviceKey, service]) => {
      services.push({
        category: categoryKey,
        categoryName: category.name,
        service: serviceKey,
        ...service
      });
    });
  });
  return services;
}

// Format currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export default {
  SERVICE_CATEGORIES,
  LABOR_RATES,
  MATERIAL_MARKUP,
  MIN_MARGIN_THRESHOLD,
  calculateServicePrice,
  calculateMaterialCost,
  calculateLaborCost,
  generateEstimate,
  applyDiscount,
  getAllServices,
  formatCurrency
};
