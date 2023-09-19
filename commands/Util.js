import { doCmd } from "../util/doCmd"

export const GetDocument = async (fileName)=>{
    const response = await doCmd({cmd:'GetFile', data:{ fileName }});
    return response;
}