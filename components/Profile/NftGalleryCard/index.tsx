import { FC, useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import { HiEyeOff } from "react-icons/hi";
import { BsCardImage } from "react-icons/bs";

type Props = {
  details: any;
  onTokenDetailsFetched?: (props: any) => unknown;
};

export const NftCard: FC<Props> = ({
  details,
  onTokenDetailsFetched = () => {},
}) => {
  const [fallbackImage, setFallbackImage] = useState(false);
  const { name, uri } = details?.data ?? {};

  const { data, error } = useSWR(
    // uri || url ? getMetaUrl(details) : null,
    uri,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  // console.log("data", data);

  useEffect(() => {
    if (!error && !!data) {
      onTokenDetailsFetched(data);
    }
  }, [data, error]);

  const onImageError = () => setFallbackImage(true);
  const { image } = data ?? {};

  return (
    <figure className="animation-pulse-color w-full h-full flex items-center justify-center">
      {fallbackImage || error ? (
          <div className="">
            <BsCardImage className="w-full h-full"/>
          </div>
      ) : (
        // Fallback when preview isn't available
        // This could be broken image, video, or audio
        <img
          src={image}
          onError={onImageError}
          className="object-cover w-full h-full"
        />
      )}
    </figure>
  );
};