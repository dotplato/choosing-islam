export interface ContentfulAsset {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

export interface ContentfulCategory {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
    description?: string;
    catimage?: ContentfulAsset;
  };
}

export interface ContentfulArticle {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    thumbnail?: ContentfulAsset;
    bodyContent: any; // Rich text document
    category: ContentfulCategory[];
    publishDate: string;
    author?: string;
    featuredOnHomepage?: boolean;
    showInQuranDropdown?: boolean;
  };
}
