import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const ResponsiveDialog = (props) => {

    const agree = () => {
        if(props.agreeFunc != null){
            props.agreeFunc();
        }
        props.open.setOpen(false)
    }

    const disagree = () => {
        if(props.disagreeFunc != null){
            props.disagreeFunc();
        }

        props.open.setOpen(false)
    }

    return(
        <>
            <Dialog
                open={props.open.value}
                onClose={() => props.open.setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.contents.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            props.contents.content == null ? <></>
                                                           : <>{props.contents.content}</>
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => disagree()}>
                        {
                            props.contents.disagree == null ? <>아니오</>
                                                            : <>{props.contents.disagree}</>
                        }

                    </Button>
                    <Button onClick={() => agree()} autoFocus>
                        {
                            props.contents.agree == null ? <>예</>
                                                         : <>{props.contents.agree}</>
                        }
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ResponsiveDialog;