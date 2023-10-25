const SassTest = (data) => {
  return (
    <div className="relative  p-8 flex flex-col items-center text-center rounded-t-full bg-[#cfe9ff] border-4 border-cyan-600 mt-10 pt-14">
      <div className="text-white p-7 rounded-full bg-cyan-600 absolute -top-14 ">
        {data.icon}
      </div>
      <h3 className="font-bold my-3 text-xl">{data.title}</h3>
      <p className="">{data.description}</p>
      {/* <a href="google.com">Learn more</a> */}
    </div>
  );
};

export default SassTest;
