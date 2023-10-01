import React, { useEffect, useState } from "react";
import { defaultTemplateContextValue } from "./Constant.ts";
import { getTemplateList } from "Backend/GetRequest/GetTemplateList.ts";
import { BundleList, TemplateContenxtType, TemplateData } from "./types.ts";

const TemplateContext = React.createContext<TemplateContenxtType>(
  defaultTemplateContextValue
);

export const useTemplateContext = () => {
  return React.useContext(TemplateContext);
};

interface TemplateProviderProps {
  children: React.ReactNode;
}
export const TemplateProvider = ({ children }: TemplateProviderProps) => {
  const [templateData, setTemplateData] = useState<TemplateData>({
    bundleList: [],
  });

  // Set an initial loading state
  const [isLoading, setIsLoading] = useState(true);

  const [viewDetailInput, setViewDetailInput] = useState<{
    viewDetailData: BundleList | null;
    showViewDetailModel: boolean;
  }>({
    viewDetailData: null,
    showViewDetailModel: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTemplateList();

        const tempdata: BundleList[] = [];

        if (data) {
          data.forEach((item) => {
            const existingBundle = tempdata?.find(
              (bundle) => bundle.id === item.id
            );

            if (existingBundle) {
              if (item.size_type === "horizontal") {
                existingBundle.imageLinks.horizontal.push(item.image_link);
              } else {
                existingBundle.imageLinks.vertical.push(item.image_link);
              }
            } else {
              const newBundle: BundleList = {
                id: item.id,
                title: item.template_name,
                imageLinks: {
                  vertical:
                    item.size_type === "vertical" ? [item.image_link] : [],
                  horizontal:
                    item.size_type === "horizontal" ? [item.image_link] : [],
                },
                amount: item.amount,
                videoLink: item.video_link,
              };
              tempdata.push(newBundle);
            }
            // return tempdata;
          });

          setTemplateData({ bundleList: tempdata });
          
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setIsLoading(false);
  }, []);

  let jsondata: TemplateData = {
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
        amount: "0.01",
        videoLink: "https://www.youtube.com/embed/AEzNmGJ7zWU",
      },
    ],
  };

  const setViewDetailData = (value: BundleList) => {
    setViewDetailInput((current) => ({
      ...current,
      viewDetailData: value,
    }));
  };

  const setShowViewDetailModel = (value: boolean) => {
    setViewDetailInput((current) => ({
      ...current,
      showViewDetailModel: value,
    }));
  };

  const value: TemplateContenxtType = {
    viewDetailInput,
    setViewDetailData,
    setShowViewDetailModel,
    templateData,
    isLoading,
  };

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};
