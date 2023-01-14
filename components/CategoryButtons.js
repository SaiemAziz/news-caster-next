const CategoryButtons = ({setButton, button}) => {
    let styleClickedButton = 'text-black '
    let styleNot = 'text-gray-400'
    let styleButton = 'py-3 cursor-pointer font-bold duration-300 ease-out border-b-4 hover:border-info border-white bg-white'
    return (
        <div className='text-center mb-5 grid lg:grid-cols-7 w-full mx-auto md:grid-cols-5 sm:grid-cols-4 grid-cols-2 '>
            <div className={`${styleButton} ${button === 'All' ? styleClickedButton : styleNot}`} onClick={()=>setButton('All')}>All</div>
            <div className={`${styleButton} ${button === 'Sports' ? styleClickedButton : styleNot}`} onClick={()=>setButton('Sports')}>Sports</div>
            <div className={`${styleButton} ${button === 'Travel' ? styleClickedButton : styleNot}`} onClick={()=>setButton('Travel')}>Travel</div>
            <div className={`${styleButton} ${button === 'Politics' ? styleClickedButton : styleNot}`} onClick={()=>setButton('Politics')}>Politics</div>
            <div className={`${styleButton} ${button === 'Food' ? styleClickedButton : styleNot}`} onClick={()=>setButton('Food')}>Food</div>
            <div className={`${styleButton} ${button === 'Weather' ? styleClickedButton : styleNot}`} onClick={()=>setButton('Weather')}>Weather</div>
            <div className={`${styleButton} ${button === 'Local' ? styleClickedButton : styleNot}`} onClick={()=>setButton('Local')}>Local</div>
        </div>
    )
}

export default CategoryButtons;