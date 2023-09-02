interface TemplateContenxtType {
  viewDetailInput: viewDetailInputType
  setShowViewDetailModel: (newValue: boolean) => void;
  setViewDetailData: (newValue: BundleList) => void;
  templateData: TemplateData;
}

interface viewDetailInputType{
  viewDetailData: BundleList,
  showViewDetailModel:boolean
}

interface TemplateData {
  bundleList: BundleList[];
}

interface BundleList {
  id: number;
  title: string;
  imageLinks: ImageLinks;
  amount: string;
  videoLink: string;
}

interface ImageLinks {
  vertical: string[];
  horizontal: string[];
}
