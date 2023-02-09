
const SassTest = (data) => {

  return (

    <div className='c1'>
      <div className='icon'>
        {data.icon}
      </div>
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <a href='google.com'>Learn more</a>
    </div>

  );
};

export default SassTest;
