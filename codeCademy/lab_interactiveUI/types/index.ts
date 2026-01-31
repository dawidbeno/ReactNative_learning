export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  onSale: boolean;
}

export interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

export interface FilterSwitchProps {
  showOnlySale: boolean;
  setShowOnlySale: (show: boolean) => void;
}

export interface ProductCardProps {
  product: Product;
  isLoading: boolean;
  isAdded: boolean;
  onAddToCart: (id: number) => void;
}

export interface CartSummaryProps {
  items: Product[]
  onClose: () => void
  onClear: () => void
}