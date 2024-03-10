import React, { useEffect, useState } from 'react';
//@ts-ignore
import ToastAlert from "@/core/_component/notice/ToastAlert";
import Stack from '@mui/material/Stack';

const GlobalAlert = (props: { items: any; }) => {
    const { items } = props;
    const [list, setList] = useState(items);
    useEffect(() => {
        setList(items);
    }, [items, list]);

    return (
        <>
            {<div key={"3645"} className={"toast-wrapper"}>
                <Stack sx={{ maxWidth: '100%', minWidth: '20%', position: 'absolute', top: 0, right: 0}}>
                    {(list && Object.keys(list).length > 0) && Object.values(list).map((item: any) => {
                        const { noticeId, status, text, delay }: { noticeId: number, status: string, text: string, delay: number } = item;
                        return (
                            <ToastAlert key={noticeId} noticeId={noticeId} bg={status} message={text} delay={delay} />
                        )
                    })}
                </Stack>
            </div>}
        </>
    )
}

export default GlobalAlert;