import { useState } from "react";
interface ModeltypeInterface {
    isAddress?: boolean;
    isRating?: boolean;
    isSort?:boolean;
    isFilter?:boolean;
}
const useModal = () => {
    const [isModalOpen, setIsOpen] = useState<ModeltypeInterface>({});
    const [isImageModelOpen, setisImageModelOpen] = useState<boolean>(false);
    const [data, setData] = useState<any>()
    const openModal = (type: ModeltypeInterface, data?: Record<string, any>) => {
        setIsOpen(type);
        setData(data);
    };
    const closeModal = (e: ModeltypeInterface) => {
        console.log(e)
        setIsOpen(e);
        setisImageModelOpen(false);
    };
    return {
        isModalOpen,
        openModal,
        closeModal,
        data,
        isImageModelOpen,
    };
};

export default useModal;
