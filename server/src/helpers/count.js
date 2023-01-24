let counter = 0;
export const count = () => {
    const countUp = () => {
        counter++;
        return counter;
    }
    return { countUp }
}