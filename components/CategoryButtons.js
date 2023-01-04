const CategoryButtons = ({setButton, button}) => {
    let styleClickedButton = 'rounded-full bg-info text-white'
    let styleNot = 'bg-white text-black'
    let styleButton = 'border-2 border-gray-300 p-10 cursor-pointer'
    return (
        <div className=' mx-10 text-center mb-5 grid grid-cols-6'>
            <div className={`${styleButton} ${button === 'all' ? styleClickedButton : styleNot}`}>dada</div>
            <div className={`${styleButton} ${button === '1' ? styleClickedButton : styleNot}`}>dada</div>
            <div className={`${styleButton} ${button === '2' ? styleClickedButton : styleNot}`}>dada</div>
            <div className={`${styleButton} ${button === '3' ? styleClickedButton : styleNot}`}>dada</div>
            <div className={`${styleButton} ${button === '4' ? styleClickedButton : styleNot}`}>dada</div>
            <div className={`${styleButton} ${button === '5' ? styleClickedButton : styleNot}`}>dada</div>
        </div>
    )
}

export default CategoryButtons;