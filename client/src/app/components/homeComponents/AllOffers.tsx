import React from "react";
import { Suspense } from "react";
import axios from "axios";
import OffersMapHome from "./OffersMapHome";
import LoadingOffers from "./LaodingOffers";

type Offer = {
  id: string;
  developer_name: string;
  areas: string;
  bath: string | null;
  bed: string | null;
  cat: string;
  date: string;
  developer_id: string;
  down_payment: string;
  furniture: string | null;
  image_offer: string;
  installment: string;
  location: string;
  status: boolean;
  types: string;
  title: string;
};

const AllOffers = async () => {
  try {
    // تحديد النوع باستخدام generic لـ axios
    const res = await axios.get<{ data: Offer[] }>(
      `${process.env.local}/offer`
    );

    // استرجاع العروض
    const offers = res.data.data || [];

    return (
      <div className="w-11/12 bg-white bg-opacity-40 rounded-md p-4 flex justify-start flex-wrap mt-10">
        <Suspense
          fallback={
            <>
              <LoadingOffers />
              <LoadingOffers />
              <LoadingOffers />
              <LoadingOffers />
            </>
          }
        >
          <OffersMapHome offers={offers} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.log(error);

    return <div>AllOffers</div>;
  }
};

export default AllOffers;
