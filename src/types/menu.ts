// Type definitions for the restaurant menu app

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  isFeatured: boolean;
  tags: string[];
  imageUrl: string;
  ingredients?: string[];
  fullDescription?: string;
}

export interface MenuSection {
  id: string;
  title: string;
  icon?: string;
  items: MenuItem[];
}

export interface MenuData {
  restaurantName: string;
  logoUrl?: string;
  currency: string;
  locale?: string;
  sections: MenuSection[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}
