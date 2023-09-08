import { doCmd } from "../util/doCmd"

const GetPoliciesCounter = async ( contactId )=>{
    // Filters
    const holderFilter = `holderId = ${ contactId }`,
          insuredFilter= `id IN ( SELECT lifePolicyId FROM Insured WHERE contactId=${ contactId } )`,
          beneFilter   = `id in ( SELECT lifePolicyId FROM Beneficiary WHERE contactId=${ contactId })`;

    const { outData: { Total: totalHolderPol  }} = (await doCmd({cmd:'LoadEntity', data:{ entity:'LifePolicy', filter: holderFilter,  fields:'COUNT(1) as Total'}}));
    const { outData: { Total: totalInsuredPol }} = (await doCmd({cmd:'LoadEntity', data:{ entity:'LifePolicy', filter: insuredFilter, fields:'COUNT(1) as Total'}}));
    const { outData: { Total: totalBenePol    }} = (await doCmd({cmd:'LoadEntity', data:{ entity:'LifePolicy', filter: beneFilter,    fields:'COUNT(1) as Total'}}));
    
    return {
        Total: totalHolderPol + totalInsuredPol + totalBenePol,
        totalHolderPol,
        totalInsuredPol,
        totalBenePol
    }
    
}


export const Dashboard = async ( contactId )=>{
    


}