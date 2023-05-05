import React from 'react'

const Carrossel = ({images}) => {
    let [index, setIndex] = React.useState(0);
    const next = (_e) => {
        const newIndex = index + 1;
        if(newIndex < images.length){
            setIndex(newIndex);
        } else {
            setIndex(0);
        }
    }

    const previous = (_e) => {
        const newIndex = index - 1;
        if(newIndex >= 0){
            setIndex(newIndex);
        } else {
            setIndex(images.length - 1);
        }
    }

    const image = images[index];

    return (
        <div className='Carrossel'>
            <button onClick={previous}>&lt;</button>
            <img src={image} alt=''/>
            <button onClick={next}>&gt;</button>
        </div>
    )
}

export default Carrossel;