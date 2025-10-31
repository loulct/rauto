import React from "react";

interface LoaderProps {
    size?: number;
    color?: string;
}

const sizeDefault : number = 120;

const Loader: React.FC<LoaderProps> = ({ size = sizeDefault }) => {
    return (
        <div className="loader-overlay">
            <div
                className="loader"
                style={{ width: size, height: size }}
            ></div>
        </div>
    );
};

export default Loader;
