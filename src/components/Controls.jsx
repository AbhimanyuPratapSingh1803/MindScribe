import React from "react";
import AddButton from "./AddButton";
import colors from "../assets/colors.json";
import Color from "./Color";

const Controls = () => {
    return (
        <div className="controls flex flex-col gap-4 items-center fixed left-4 top-1/2 -translate-y-1/2 bg-[#35363e] px-4 py-4 rounded-[40px] shadow-gray-600 z-[10000]">
            <AddButton />
            {colors.map((color) => (
                <Color key={color.id} color={color} />
            ))}
        </div>
    );
};

export default Controls;
