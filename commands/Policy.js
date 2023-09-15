import { doCmd } from '../util/doCmd';

export const GetPolicies = async ( page = 0, size, filter ) =>{
    const response  = await doCmd({ cmd:'RepoLifePolicy', data:{ operation:'GET',page, size, filter, noTracking: true,include:['Insureds', 'Coverages'] }});
    return response.outData;
}