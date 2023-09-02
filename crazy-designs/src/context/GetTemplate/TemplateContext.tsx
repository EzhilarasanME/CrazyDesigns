import React, { useState } from "react";
import { defaultTemplateContextValue } from "./Constant.ts";
import queryPosts from "Backend/GetTemplateList.ts";

const TemplateContext = React.createContext<TemplateContenxtType>(
  defaultTemplateContextValue
);

export const useTemplateContext = () => {
  return React.useContext(TemplateContext);
};

interface TemplateProviderProps {
  children: React.ReactNode;
}
export const TemplateProvider = ({
  children,
}: TemplateProviderProps) => {
  const jsondata: TemplateData = {
    bundleList: [
      {
        id: 11,
        title: "Digital menu template horizontal",
        imageLinks: {
          vertical: [],
          horizontal: [
            "https://i.ibb.co/20zbhcy/Slide1.png",
            "https://i.ibb.co/JcdYwF2/Slide2.png",
            "https://i.ibb.co/QbkJH80/Slide3.png",
            "https://i.ibb.co/N3cngjp/Slide4.png",
            "https://i.ibb.co/jyc0W9J/Slide5.png",
          ],
        },
        amount: "1.00",
        videoLink: "https://www.youtube.com/embed/AEzNmGJ7zWU",
      },
      {
        id: 2,
        title: "Ice Cream menu template Vertical",
        imageLinks: {
          vertical: [
            "https://i.ibb.co/9WwR4KL/Slide1.png",
            "https://i.ibb.co/8KfbmFT/Slide2.png",
            "https://i.ibb.co/0cjLnrs/Slide3.png",
            "https://i.ibb.co/q1W293k/Slide4.png",
            "https://i.ibb.co/8MfNj4x/Slide5.png",
            "https://i.ibb.co/cT27rvZ/Slide6.png",
            "https://i.ibb.co/G7vxWVW/Slide7.png",
            "https://i.ibb.co/cLHt5SC/Slide8.png",
            "https://i.ibb.co/7rpNgfQ/Slide9.png",
            "https://i.ibb.co/fx96ttW/Slide10.png",
          ],
          horizontal: [
            "https://i.ibb.co/vLTzDXk/Slide2.png",
            "https://i.ibb.co/J5337S5/Slide1.png",
            "https://i.ibb.co/TT8kCz5/Slide3.png",
            "https://i.ibb.co/SPVgFZB/Slide4.png",
            "https://i.ibb.co/YhTMM9Q/Slide5.png",
            "https://i.ibb.co/HDtmTk8/Slide6.png",
            "https://i.ibb.co/3449ygr/Slide8.png",
            "https://i.ibb.co/0MXLYmK/Slide7.png",
            "https://i.ibb.co/59kknQF/Slide9.png",
            "https://i.ibb.co/hmhBbXn/Slide10.png",
          ],
        },
        amount: "7.00",
        videoLink: "https://www.youtube.com/embed/AEzNmGJ7zWU",
      },
    ],
  };

  const tempData: BundleList = null;

  const [viewDetailInput, setViewDetailInput] = useState({viewDetailData : tempData,
showViewDetailModel : false});

const setViewDetailData = (value: BundleList) => {
    setViewDetailInput((current) => ({
      ...current,
      viewDetailData: value,
    }))
  }

  const setShowViewDetailModel = (value: boolean) => {
    setViewDetailInput((current) => ({
      ...current,
      showViewDetailModel: value,
    }))
  }

  const value: TemplateContenxtType = {
    viewDetailInput,
    setViewDetailData,
    setShowViewDetailModel,
    templateData: jsondata,
  };
  
  const data = queryPosts();

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};
