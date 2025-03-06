import React from "react";

interface MaxDownPaymentProps {
  maxDownPaymentInputUse: string;
  setMaxPaymentInputUse: (value: string) => void;
}

const MaxDownPayment: React.FC<MaxDownPaymentProps> = ({
  maxDownPaymentInputUse,
  setMaxPaymentInputUse,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(rawValue))) {
      setMaxPaymentInputUse(rawValue);
    }
  };

  return (
    <input
      type="text"
      value={Number(maxDownPaymentInputUse).toLocaleString()}
      onChange={handleInputChange}
      placeholder="Max Down Payment"
      className="w-full rounded-md px-2 py-1 border-2 border-black"
    />
  );
};

export default MaxDownPayment;
