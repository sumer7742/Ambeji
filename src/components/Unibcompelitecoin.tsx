import { useState } from "react";
import EliteCoinCard from "../components/coin/EliteCoinCard";
import BuyCoinCard from "../components/coin/BuyCoinCard";
import BuyCoinModal from "../components/coin/BuyCoinModal";

import {
    useAddEliteCoins,
    useEliteCoins,
    useEliteCoinHistory,
} from "../hooks/useCoin";
import EliteCoinHistory from "./coin/CouponList";

const UnibcompEliteCoin = () => {
    const { data, isLoading, isError } = useEliteCoins();
    const { data: history } = useEliteCoinHistory();
    const addEliteCoinMutation = useAddEliteCoins();

    const [openBuyModal, setOpenBuyModal] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState(0);

    const balance = data?.elite_coins ?? 0;
    const uniqueCode = data?.unique_code ?? "—";
    const cvv: string | undefined = data?.cvv;
const expMonth: string | undefined = data?.exp_month;
const expYear: string | undefined = data?.exp_year;
const name: string | undefined = data?.fullName ?? "ELITE MEMBER";

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-5 sm:py-6 md:py-8 space-y-5 sm:space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">
                UniBcomp's Elite Coins
            </h1>

            {isLoading && (
                <p className="text-sm text-gray-500">
                    Loading elite coins...
                </p>
            )}

            {isError && (
                <p className="text-sm text-red-500">
                    Failed to load coin balance.
                </p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-stretch w-full [&>*]:min-w-0">
                <EliteCoinCard
    balance={balance}
    uniqueCode={uniqueCode}
    cvv={cvv}
    expMonth={expMonth}
    expYear={expYear}
    name={name}
/>

                <BuyCoinCard
                    onSelectAmount={(amount) => {
                        setSelectedAmount(amount);
                        setOpenBuyModal(true);
                    }}
                />




            </div>

            <div className="-mx-3 sm:-mx-5 lg:-mx-8">
    <EliteCoinHistory
        transactions={history?.results ?? []}
    />
</div>

            <BuyCoinModal
                open={openBuyModal}
                amount={selectedAmount}
                loading={addEliteCoinMutation.isPending}
                onClose={() => setOpenBuyModal(false)}
                onSubmit={(payload) =>
                    addEliteCoinMutation.mutate(payload, {
                        onSuccess: (res) => {
                            setOpenBuyModal(false);

                            setTimeout(() => {
                                if (res?.url) window.location.href = res.url;
                            }, 400);
                        },

                    })
                }
            />
        </div>
    );
};

export default UnibcompEliteCoin;
