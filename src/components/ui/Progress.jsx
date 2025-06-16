
const Progress = (props) => {

    const data = props.data;


    return(
        <>
            <div className='inline-block mx-10 bg-stone-200 p-5 rounded-xl my-2'>
                <div style={{"--value": data.value}}
                     className={`radial-progress mx-auto color ${data.color}`}
                     aria-valuenow={data.value} role="progressbar">
                    {data.value} %
                </div>
                <p className='text-center'>
                    {data.name}
                </p>
                <p className='text-center'>
                    {data.subContent}
                </p>
            </div>
        </>
    )
}

export default Progress;