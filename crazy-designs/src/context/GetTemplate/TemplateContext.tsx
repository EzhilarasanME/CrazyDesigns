import React, { useEffect, useState } from "react";
import { defaultTemplateContextValue } from "./Constant.ts";
import { getTemplateList } from "Backend/GetRequest/GetTemplateList.ts";
import { BundleList, TemplateContenxtType, TemplateData } from "./types.ts";
import { templateJosn } from "model/templateJson.ts";

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
        // const tempdata: BundleList[] = templateJosn;

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
