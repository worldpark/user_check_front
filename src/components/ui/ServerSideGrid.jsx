import {useEffect, useState} from "react";

const ServerSideGrid = (props) => {

    const changeFunction = props.changePage;
    const [contents, setContents] = useState([]);

    useEffect(() => {

        if(props.gridData.contents != null){
            const datas = props.gridData.contents.map((data) => {
                const content = {};
                props.gridData.headers.forEach((headerData) => {
                    content[headerData.value] = data[headerData.value];
                });

                return content;
            });

            setContents(datas);
        }

    }, [props.gridData]);

    const [selectPage, setSelectPage] = useState(0);

    const changePage = (e) => {
        let pageNumber = Number(e.target.value);

        setSelectPage(pageNumber);
        changeFunction(pageNumber);
    };

    const pages = Array.from({ length: props.gridData.totalPages}, (_, index) => (
        <input key={index} className="join-item btn btn-square" type="radio" name="options" aria-label={String(index + 1)}
               value={index} onChange={changePage} checked={selectPage == index}
        />
    ));

    return (
        <div className='flex flex-col'>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table text-xs table-fixed text-center lg:text-sm">

                    <thead>
                    <tr>
                        <th className='w-[3%]'></th>
                        {
                            props.gridData.headers.map((header, index) => (
                                <th className={'w-[' + header.height + ']'} key={index}>
                                    {header.name}
                                </th>
                            ))
                        }
                    </tr>
                    </thead>

                    <tbody>
                    {
                        contents.length > 0 ?
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
                        )) : <tr className='text-center'>
                                <th colSpan={props.gridData.headers.length + 1}>
                                    데이터가 존재하지 않습니다.
                                </th>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>

            <div className="join mx-auto mt-5">
                {pages}
            </div>
        </div>
    )
}

export default ServerSideGrid;