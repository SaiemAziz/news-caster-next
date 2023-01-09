const CategoryButtons = ({setButton, button}) => {
    let styleClickedButton = 'text-black'
    let styleNot = 'text-gray-400'
    let styleButton = 'py-3 cursor-pointer font-bold duration-300 ease-out border-y-4 hover:border-info border-white bg-white'
    return (
        <div className='text-center mb-5 grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2'>
            <div className={`${styleButton} ${button === 'All' ? styleClickedButton : styleNot}`} onClick={()=>setButton('All')}>All</div>
            <div className={`${styleButton} ${button === 'Sports' ? styleClickedButton : styleNot}`} onClick={()=>setButton('Sports')}>Sports</div>
            <div className={`${styleButton} ${button === 'Entertainment' ? styleClickedButton : styleNot}`} onClick={()=>setButton('Entertainment')}>Entertainment</div>
            <div className={`${styleButton} ${button === 'Politics' ? styleClickedButton : styleNot}`} onClick={()=>setButton('Politics')}>Politics</div>
            <div className={`${styleButton} ${button === 'Technologies' ? styleClickedButton : styleNot}`} onClick={()=>setButton('Technologies')}>Technologies</div>
            <div className={`${styleButton} ${button === 'Finance' ? styleClickedButton : styleNot}`} onClick={()=>setButton('Finance')}>Finance</div>
        </div>
    )
}

export default CategoryButtons;