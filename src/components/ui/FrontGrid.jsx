
const FrontGrid = (props) => {
    const gridData = props.gridData.contents;
    const headers = props.gridData.headers;

    const contents = gridData.map((data) => {
        const content = {};
        headers.forEach((headerData) => {

            if(headerData.value === 'delete'){
                content[headerData.value] = (
                    <div className='flex'>
                        <button className="btn bg-red-500 text-white mx-auto">
                            삭제
                        </button>
                    </div>
                );
            }else if(headerData.value === 'check'){

                content[headerData.value] = (
                    <label>
                        <input type="checkbox" className="checkbox" />
                    </label>
                );

            }else{
                content[headerData.value] = data[headerData.value];
            }
        });

        return content;
    });

    return (
        <div className='flex flex-col'>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table text-xs lg:text-sm text-center">
                    <thead>
                    <tr>
                        <th></th>
                        {
                            headers.map((header, index) => (
                                <th key={index}>
                                    {header.name}
                                </th>
                            ))
                        }
                    </tr>
                    </thead>

                    <tbody>
                    {
                        contents.map((content, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                {
                                    Object.values(content).map((value, contentIndex) => (
                                        <td key={contentIndex}>
                                            {value}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FrontGrid;