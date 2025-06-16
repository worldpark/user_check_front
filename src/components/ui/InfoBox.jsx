import {Grid} from "@mui/material";

const InfoBox = (props) => {

    return(
        <>
            <Grid container spacing={1}
                  className='bg-cyan-100 rounded-xl border-1 border-solid border-cyan-500 py-2 mt-2'>
                {
                    props.info != null ?
                    Object.entries(props.info).map(([key, value], index) => (
                        key != null && value != null ?
                            <>
                                <Grid size={4}>
                                    <p>{key}</p>
                                </Grid>
                                <Grid size={8}>
                                    <p>{value}</p>
                                </Grid>
                            </> :
                            <></>
                    )) : <p>현재 출석 정보가 존재 하지 않습니다.</p>
                }
            </Grid>
        </>
    )
}

export default InfoBox;