import React, {useState, useEffect} from "react"

const Banner1 = "/SD-Home.webp"

const Banner2 = "/SD-Calendar.webp"

const BannerArray = [Banner1, Banner2];

const Platform = () => {
    const [count, setCount] = useState(0);

    // Save timer ref and return cleanup function to clear it
    useEffect(() => {
        const timerId = setInterval(() => {
        // Use a functional state update to correctly increment the count
        setCount(count => count + 1);
        }, 3000);

        return () => clearInterval(timerId);
    }, []);

    // `image` is derived state from the image array and current count
    // Take the count mod array length to get the correct computed index
    const image = BannerArray[count % BannerArray.length];

    return(
        <>
            <div className="w-full md:w-3/4 mx-auto">
                <img className="w-full" src={image} alt="SDrops Platform" />
            </div>
            <div className="flex justify-center">
                <p className="text-sm italic">Platform screenshots are not final and are subject to change.</p>
            </div>
        </>
    )
}

export default Platform