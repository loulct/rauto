import Cards from "./cards";
import Menu from "./menu";

export default function MenuWrapper(
    { state, stateFunc }:
        {
            state: string,
            stateFunc: (state: string) => void
        }
) {
    return (
        <div className="">
            <Menu state={state} stateFunc={stateFunc} />
            <Cards state={state} />
        </div>
    );
}