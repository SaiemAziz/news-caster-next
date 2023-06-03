export let categoriesList = [
    'All', 'Sports', 'Science', 'Politics', 'Health', 'Entertainment', 'Business', 'Others'
]
const CategoryButtons = ({ setButton, button, setLoad, setCat }) => {
    let styleClickedButton = 'text-black '
    let styleNot = 'text-gray-400'
    let styleButton = 'py-3 px-5 cursor-pointer font-bold duration-300 ease-out border-b-4 hover:border-info border-white bg-white flex-1'

    return (
        // <div className='text-center mb-5 grid lg:grid-cols-7 w-full mx-auto md:grid-cols-5 sm:grid-cols-4 grid-cols-2 '>
        <div className='text-center mb-5 flex flex-wrap justify-center w-full mx-auto  '>
            {
                categoriesList.map(item => (
                    <div key={item} className={`${styleButton} ${button === item ? styleClickedButton : styleNot}`} onClick={() => {
                        setButton(item);
                        setCat(item);
                        setLoad(true)
                    }
                    }>{item}</div>
                ))
            }
            {/* <div className={`${styleButton} ${button === 'All' ? styleClickedButton : styleNot}`} onClick={()=>{setButton('All'); setLoad(true)}}>All</div>
            <div className={`${styleButton} ${button === 'Sports' ? styleClickedButton : styleNot}`} onClick={()=>{setButton('Sports'); setLoad(true)}}>Sports</div>
            <div className={`${styleButton} ${button === 'Travel' ? styleClickedButton : styleNot}`} onClick={()=>{setButton('Travel'); setLoad(true)}}>Travel</div>
            <div className={`${styleButton} ${button === 'Politics' ? styleClickedButton : styleNot}`} onClick={()=>{setButton('Politics'); setLoad(true)}}>Politics</div>
            <div className={`${styleButton} ${button === 'Food' ? styleClickedButton : styleNot}`} onClick={()=>{setButton('Food'); setLoad(true)}}>Food</div>
            <div className={`${styleButton} ${button === 'Weather' ? styleClickedButton : styleNot}`} onClick={()=>{setButton('Weather'); setLoad(true)}}>Weather</div>
            <div className={`${styleButton} ${button === 'Local' ? styleClickedButton : styleNot}`} onClick={()=>{setButton('Local'); setLoad(true)}}>Local</div> */}
        </div>
    )
}

export default CategoryButtons;