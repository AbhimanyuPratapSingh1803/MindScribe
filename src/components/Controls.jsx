import React from "react";
import AddButton from "./AddButton";
import colors from "../assets/colors.json";
import Color from "./Color";

const Controls = () => {
    return (
        <div className="w-screen h-auto flex justify-center">
            <div className="controls flex gap-4 items-center fixed  bottom-4 bg-[#35363e] px-4 py-4 rounded-[40px] shadow-gray-600 z-[10000]">
                <AddButton />
                {colors.map((color) => (
                    <Color key={color.id} color={color} />
                ))}
            </div>
        </div>
    );
};

export default Controls;
