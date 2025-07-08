import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const baseApiClient = axios.create({
  baseURL: "http://192.168.1.162:8080/api",
});

export const useGetQueens = (): UseQueryResult<QueenSummary[], Error> => {
  return useQuery({
    queryKey: ["getQueens"],
    queryFn: async () => {
      const { data } = await baseApiClient({
        url: "queens",
        method: "GET",
      });

      return data;
    },
  });
};

export const useGetQueen = () => {
  const [data, setData] = useState<Queen>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueen = async () => {
      setLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const queenData = {
        id: "1",
        name: "Bebe Zahara Benet",
        birthday: "1981-03-20",
        looks: [
          {
            show: "Rupaul's Drag Race",
            season: 1,
            imageURL:
              "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/22/BebePromoHD.png/revision/latest/scale-to-width-down/1000?cb=20220430163623",
            name: "Promo Look (Best Drag)",
          },
          {
            show: "Rupaul's Drag Race",
            season: 1,
            imageURL:
              "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/0d/RPDR1PhotoshootBebe.png/revision/latest?cb=20180111102536",
            name: "Entrance Look",
          },
          {
            show: "Rupaul's Drag Race",
            season: 1,
            imageURL:
              "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/1/13/BebeZaharaConfessionalLook.png/revision/latest?cb=20190729022913",
            name: "Confessional Look",
          },
          {
            show: "Rupaul's Drag Race",
            season: 1,
            imageURL:
              "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/e7/BebeEP2.png/revision/latest?cb=20180817105104",
            name: "Girl Group Look",
          },
        ],
      };

      setData(queenData);
      setLoading(false);
    };

    fetchQueen();
  }, []);

  return { data, loading };
};

export type QueenSummary = {
  id: string;
  name: string;
  profileImageUrl: string;
};

export type Queen = {
  id: string;
  name: string;
  birthday: string; // YYYY-MM-DD
  looks: Look[];
};

export type Look = {
  show: string;
  season: number;
  imageURL: string;
  name: string;
};
