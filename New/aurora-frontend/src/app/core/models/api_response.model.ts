export interface ApiResponse<T> {
  isSuccess: boolean;
  message: string;
  data: T;
  errors: string[];
}

export interface PagedResponse<T> {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  items: T[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  price: number;
  discountPrice?: number;
  stockQuantity: number;
  sku: string;
  thumbnailUrl: string;
  categoryName: string;
  brandName: string;
  averageRating: number;
  reviewCount: number;
  discountPercentage: number;
  isFeatured?: boolean;
  isTrending?: boolean;
}

export interface Slider {
  id: number;
  title: string;
  subTitle: string;
  imageUrl: string;
  linkUrl: string;
  displayOrder: number;
  isActive: boolean;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  imageUrl?: string;
  description?: string;
  categoryName?: string;
}

export interface CategoryMenu {
  id: number;
  name: string;
  slug: string;
  subCategories: CategoryMenu[];
}
