import { doCmd } from '../util/doCmd';
import { lightColors } from '@rneui/themed';

export const formatNumber = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  };

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

const GetPendingPremiums = async (contactId)=>{
    // Filters
    const holderFilter = `payed = 0 
    AND cancellationDate IS NULL 
    AND dueDate <= GETDATE() 
    AND lifePolicyId IN ( SELECT pol.id FROM LifePolicy pol WHERE pol.holderId=${ contactId } AND pol.inactiveDate IS NULL AND pol.activeDate IS NOT NULL AND pol.active=1)`;

    const response = await doCmd({cmd:'LoadEntity', data:{ entity:'PayPlan', filter: holderFilter, fields:'SUM(minimum) pendingPremium' }});
    const { outData:{ pendingPremium }} = response;
    return pendingPremium;
}

const GetOpenClaims = async (contactId)=>{
    const response = await doCmd({ cmd:'LoadEntity', data:{ entity:'Claim', filter:`contactId=${ contactId } AND closed=0`, fields:'COUNT(1) as openClaims'}});
    const { outData: { openClaims }} = response;
    return openClaims;
}


export const GetDashboarData = async ( contactId, navigation )=>{
    const polData = await GetPoliciesCounter(contactId),
          pendingPremium = await GetPendingPremiums(contactId),
          openClaims = await GetOpenClaims( contactId );
    return [
        { 
            title:'Policies', 
            color: lightColors.primary, 
            price: formatNumber(Number(polData.Total)), 
            info: [`${formatNumber(Number(polData.totalHolderPol))} as Holder`, `${formatNumber(Number(polData.totalInsuredPol))} as Insured`,`${ formatNumber(Number(polData.totalBenePol))} as Beneficiary`] ,
            onButtonPress: ()=> navigation.navigate('Policies'),
            button: { title:'Check', icon: 'shield' }
        },
        { 
            title:'Payments', 
            color: lightColors.secondary, 
            price: `$ ${ formatNumber(Number(pendingPremium)) }`, 
            info: ['Pending premiums on active policies'],
            onButtonPress: ()=> navigation.navigate('Payments'),
            button: { title:'Check', icon: 'credit-card' }
        },
        { 
            title:'Claims', 
            color: lightColors.warning, 
            price: openClaims, 
            info: [`${openClaims} Claims`, `Claims pending to close`] ,
            onButtonPress: ()=> navigation.navigate('Claims'),
            button: { title:'Check', icon: 'warning' }
        }

    ] 
}