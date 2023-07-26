export interface ArticleFormValues {
  title: string;
  content: string;
  anonymous: boolean;
  images: ArticleImage[];
}

export interface ArticleImage {
  imagePath: string;
  imageUrl: string;
}
