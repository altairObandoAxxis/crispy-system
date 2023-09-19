import { doCmd } from '../util/doCmd';

export const GetPolicies = async ( page = 0, size, filter ) =>{
    const response  = await doCmd({ cmd:'RepoLifePolicy', data:{ operation:'GET',page, size, filter, noTracking: true,include:['Insureds', 'Holder'] }});
    return response.outData;
}

export const GetCoverages = async policyId =>{
    const response = await doCmd({ cmd:'LoadEntities', data:{ entity:'LifeCoverage', filter:`lifePolicyId=${ policyId }`}});
    return response.outData;
}
export const GetRequirements = async policyId=>{
    const response = await doCmd({ cmd:'LoadEntities', data:{ entity:'LifeRequirement', filter:`lifePolicyId=${ policyId }`}});
    return response.outData;
}

export const GetIncomePayments = async policyId=>{
    const response = await doCmd({ cmd:'LoadEntities', data:{ entity:'PayPlan', filter:`lifePolicyId=${ policyId }`}});
    return response.outData;
}

export const GetDocuments = async policyId=>{
    const response = await doCmd({ cmd:'LoadEntities', data:{ entity:'PayPlan', filter:`lifePolicyId=${ policyId }`}});
    return response.outData;
}