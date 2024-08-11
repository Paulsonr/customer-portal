import React, { useEffect, useState } from "react";
import axios from "axios";
import { Customer } from "../utils/types";
import { Skeleton } from "@mui/material";
import "./styles/CustomerDetails.css";

const CustomerDetails: React.FC<{ customer: Customer }> = ({ customer }) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPhotos = () => {
    const minPage = 1;
    const maxPage = 10;
    const page = Math.floor(Math.random() * (maxPage - minPage + 1)) + minPage;
    setLoading(true);

    axios
      .get(`https://picsum.photos/v2/list?page=${page}&limit=9`)
      .then((response) => {
        const newPhotos = response.data.map(
          (photo: any) => `https://picsum.photos/id/${photo.id}/250/150`
        );
        setPhotos(newPhotos);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPhotos();
    const intervalId = setInterval(fetchPhotos, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="customer-details">
      <h2>{customer.name}</h2>
      <p>{customer.title}</p>
      <p>{customer.address}</p>
      <div className="photo-grid">
        {loading
          ? Array.from(new Array(9)).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width="100%"
                height={150}
                animation="wave"
                sx={{ bgcolor: "grey.300", borderRadius: "8px" }}
              />
            ))
          : photos.map((photo, index) => (
              <div className="grid-item">
                <img
                  key={index}
                  src={photo}
                  alt={`Customer ${index + 1}`}
                  className="photo"
                  loading="lazy"
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default CustomerDetails;
