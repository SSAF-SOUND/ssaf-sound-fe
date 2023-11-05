export interface ArticleFormValues {
  title: string;
  content: string;
  anonymous: boolean;
  images: ArticleImage[];
  category: number;
}

export interface ArticleImage {
  imageUrl: string;
  imagePath: string;
}
