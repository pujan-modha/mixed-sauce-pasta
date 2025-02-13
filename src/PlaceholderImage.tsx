import React, { useState, useEffect, useCallback } from "react";
import { createApi } from "unsplash-js";
import { useUnsplashContext } from "./UnsplashProvider";
import { Random } from "unsplash-js/dist/methods/photos/types";

interface PlaceholderImageProps {
  query?: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  query = "random",
  width = 400,
  height = 300,
  alt = "Placeholder image",
  className = "",
}) => {
  const { accessKey } = useUnsplashContext();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const unsplash = createApi({ accessKey });

  const fetchImage = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await unsplash.photos.getRandom({
        query,
        orientation: "landscape",
      });

      if (result.type === "success") {
        const { urls } = result.response as Random;
        setImageUrl(`${urls.raw}&w=${width}&h=${height}`);
      } else {
        setError("Failed to fetch image");
      }
    } catch (err) {
      setError("An error occurred while fetching the image");
    } finally {
      setLoading(false);
    }
  }, [unsplash, query, width, height]);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  if (loading) {
    return (
      <div
        className={`placeholder-loading ${className}`}
        style={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`placeholder-error ${className}`}
        style={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0",
          color: "red",
        }}
      >
        Error: {error}
      </div>
    );
  }

  return imageUrl ? (
    <img
      src={imageUrl}
      width={width}
      height={height}
      alt={alt}
      className={`placeholder-image ${className}`}
      style={{ objectFit: "cover" }}
    />
  ) : null;
};

export default PlaceholderImage;
