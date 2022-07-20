import { FC, useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import { HiEyeOff } from "react-icons/hi";

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
    <div className="border border-dracula rounded-xl w-full shadow-sm">
      <figure className="animation-pulse-color">
        {fallbackImage || error ? (
          <div className="w-full h-full flex items-center justify-center">     
            <HiEyeOff className="h-full w-full" />
          </div>
        ) : (
          // Fallback when preview isn't available
          // This could be broken image, video, or audio
          <img
            src={image}
            onError={onImageError}
            className="rounded-t-xl object-contain w-full"
          />
        )}
      </figure>
      <div className="flex items-center justify-center my-2.5 text-center">
        <h2 className="font-semibold text-sm">{name ? name : "N/A"}</h2>
      </div>
    </div>
  );
};