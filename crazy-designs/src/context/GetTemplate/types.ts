export interface TemplateContenxtType {
  viewDetailInput: viewDetailInputType
  setShowViewDetailModel: (newValue: boolean) => void;
  setViewDetailData: (newValue: BundleList) => void;
  templateData: TemplateData;
  isLoading:boolean
}

export interface viewDetailInputType{
  viewDetailData: BundleList,
  showViewDetailModel:boolean
}

export interface TemplateData {
  bundleList: BundleList[];
}

export interface BundleList {
  id: number;
  title: string;
  imageLinks: ImageLinks;
  amount: string;
  videoLink: string;
}

export interface ImageLinks {
  vertical: string[];
  horizontal: string[];
}
