
const StatDisplay = (props) => {



    return(
        <div className="stats shadow">

            {
                props.statData != null ?
                    Object.entries(props.statData).map(([key, value], index) => (
                        <div className="stat" key={index}>
                            <div className={"stat-title " + value.color}>{value.name}</div>
                            <div className="stat-value">{value.value} 명</div>
                        </div>
                    ))
                    : <></>
            }
        </div>
    )
}

export default StatDisplay;