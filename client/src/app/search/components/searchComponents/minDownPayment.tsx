import React from "react";

interface MinDownPaymentProps {
  minDownPaymentInputUse: string;
  setMinPaymentInputUse: (value: string) => void;
}

const MinDownPayment: React.FC<MinDownPaymentProps> = ({
  minDownPaymentInputUse,
  setMinPaymentInputUse,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(rawValue))) {
      setMinPaymentInputUse(rawValue);
    }
  };

  return (
    <input
      type="text"
      value={Number(minDownPaymentInputUse).toLocaleString()}
      onChange={handleInputChange}
      placeholder="Min Down Payment"
      className="w-full rounded-md px-2 py-1 border-2 border-black mb-2"
    />
  );
};

export default MinDownPayment;
