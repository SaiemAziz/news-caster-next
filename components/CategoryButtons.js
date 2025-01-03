export let categoriesList = [
    'All', 'Sports', 'Science', 'Politics', 'Health', 'Entertainment', 'Business', 'Others'
]
const CategoryButtons = ({ setButton, button, setLoad, setCat }) => {
    let styleClickedButton = 'text-black '
    let styleNot = 'text-gray-400'
    let styleButton = 'py-3 px-5 cursor-pointer font-bold duration-300 ease-out border-b-4 hover:border-info border-white bg-white flex-1'

    return (
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
        </div>
    )
}

export default CategoryButtons;