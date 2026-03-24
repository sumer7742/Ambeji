import { useState } from "react";
import { Eye, EyeOff, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  balance: number;
  uniqueCode: string;
  cvv?: string;
  expMonth?: string;
  expYear?: string;
  name?: string;
}

/* mask card number */
const mask = (code: string, show: boolean) => {
  if (!code) return "**** **** **** ****";
  if (show) return code;
  return "**** **** **** " + code.slice(-4);
};

/* mask cvv */
const maskCVV = (cvv?: string, show?: boolean) => {
  if (!cvv) return "***";
  return show ? cvv : "***";
};

const EliteCoinCard = ({
  balance,
  uniqueCode,
  cvv,
  expMonth,
  expYear,
  name,
}: Props) => {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleView = () => {
    setShow(!show);
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(uniqueCode);
      setCopied(true);
      toast.success("Wallet code copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copy failed");
    }
  };

  const gold = {
    color: "#F6E27A",
    textShadow: "0 1px 0 #fff3, 0 2px 3px rgba(0,0,0,0.35)",
    fontWeight: 700,
  };

  const goldSoft = {
    color: "#C9A227",
    textShadow: "0 1px 0 #fff3, 0 1px 2px rgba(0,0,0,0.25)",
    fontWeight: 600,
  };

  return (
    <div
      className="
      relative overflow-hidden 
      rounded-[clamp(14px,2vw,28px)]
      w-full aspect-[1.9/1] min-w-0
      shadow-2xl border flex flex-col justify-between
      p-[clamp(12px,2.2vw,28px)]
      "
      style={{
        background: "#456453",
        borderColor: "rgba(120,120,120,0.6)",
      }}
    >
      {/* metallic shine */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          background:
            "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.7) 50%, transparent 75%)",
        }}
      />

      {/* HEADER */}
      <div className="flex justify-between items-start relative z-10 gap-2 min-w-0">
        <p
          className="truncate min-w-0 tracking-[0.35em] text-[clamp(9px,1.1vw,13px)]"
          style={goldSoft}
        >
          ELITE COIN CARD
        </p>

        <img
          src="https://unibcompoldecom.s3.ap-south-1.amazonaws.com/1770274546546/1770274546546_ChatGPT%20Image%20Feb%205%2C%202026%2C%2012_18_04%20PM%20%281%29.png"
          alt="Elite Logo"
          className="h-[clamp(28px,5vw,64px)] w-auto object-contain drop-shadow-md shrink-0"
        />
      </div>

      {/* NUMBER */}
      <div className="flex items-center justify-between gap-3 relative z-10 min-w-0">
        <p
          className="font-mono whitespace-nowrap overflow-hidden text-ellipsis"
          style={{
            ...gold,
            fontSize: "clamp(12px,2.2vw,20px)",
            letterSpacing: show ? "0.12em" : "0.25em",
            maxWidth: "65%",
          }}
        >
          {mask(uniqueCode, show)}
        </p>

        <div className="flex items-center gap-2">
          {show && (
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg hover:bg-white/20 transition"
              style={{ color: "#A88917" }}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          )}

          <button
            onClick={toggleView}
            className="p-2 rounded-lg hover:bg-white/20 transition"
            style={{ color: "#A88917" }}
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* CARD HOLDER */}
      <div className="relative z-10">
        <p className="tracking-widest text-[clamp(8px,1vw,11px)]" style={goldSoft}>
          CARD HOLDER
        </p>
        <p
          className="font-semibold uppercase tracking-wider text-[clamp(12px,1.8vw,18px)]"
          style={gold}
        >
          {name || "ELITE MEMBER"}
        </p>
      </div>

      {/* CARD DETAILS */}
      <div className="flex justify-between items-end relative z-10">
        <div>
          <p className="tracking-widest text-[clamp(8px,1vw,11px)]" style={goldSoft}>
            VALID THRU
          </p>
          <p className="font-mono text-[clamp(11px,1.6vw,16px)]" style={gold}>
            {expMonth || "00"}/{expYear || "00"}
          </p>
        </div>

        <div className="text-right">
          <p className="tracking-widest text-[clamp(8px,1vw,11px)]" style={goldSoft}>
            CVV
          </p>
          <p className="font-mono text-[clamp(11px,1.6vw,16px)]" style={gold}>
            {maskCVV(cvv, show)}
          </p>
        </div>
      </div>

      {/* BALANCE */}
      <div className="relative z-10">
        <p className="text-[clamp(10px,1.2vw,14px)]" style={goldSoft}>
          Available Coins
        </p>
        <p className="tracking-wide text-[clamp(18px,3.5vw,34px)]" style={gold}>
          {balance}
        </p>
      </div>
    </div>
  );
};

export default EliteCoinCard;
